<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

use App\Models\UsersModel;
use App\Libraries\JWTHandler;

class UserController extends ResourceController
{
    use ResponseTrait;
    
    private $users_model;
    private $jwt;

    public function __construct(){
        $this->users_model = new UsersModel();
        $this->jwt         = new JWTHandler();   
    }

    // Mendapatkan informasi user yang login saat ini
    public function index()
    {
        // Ambil identitas user pada cookie JWT
        $user_id          = $this->checkJWT();

        $datas            = $this->users_model->select("user_id, username")
                            ->where("user_id", $user_id)
                            ->findAll();

        if(count($datas) == 0){
            return $this->respond([
                "success" => false, 
                "message" => "user not found",
                "errors"  => [
                    "reason" => ["user_id" => $user_id]
                ]
            ], 404);
        }

        return $this->respond([
            "success" => true, 
            "message" => "user found",
            "data"    => [
                            "user_id"  => $datas[0]["user_id"], 
                            "username" => $datas[0]["username"]
                        ]
        ], 200);
    }

    // Method Login
    public function create()
    {
        $json             = file_get_contents('php://input');
        $data             = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->respond([
                "success" => false,
                "message" => "JSON structure error",
                "errors"  => [
                    "reason" => [
                        "error_name" => "JSON Error: " . json_last_error_msg(),
                        "json"       => (string) $json
                    ]
                ]
            ], 400);
        }

        $username     = htmlspecialchars($data["username"]);
        $password     = htmlspecialchars($data["password"]);
        $user_id      = "";

        $get_records  = $this->users_model
                        ->where("username", $username)
                        ->findAll();

        $is_logged_in = false;

        // Mengecek record dalam database apakah ada yang sama
        foreach($get_records as $get_record){
            if (password_verify($password, $get_record['password'])) {
                $user_id      = $get_record['user_id'];
                $is_logged_in = true; // Password cocok
                break;
            }
        }

        if(!$is_logged_in){
            return $this->respond([
                "success" => false,
                "message" => "Login gagal, tidak ada username dan password yang cocok",
                "errors"  => [
                    "reason" => [
                        "username" => $username,
                        "password" => $password
                    ]
                ]
            ], 404);
        }

        $token = $this->jwt->generateToken(['user_id' => $user_id, "username" => $username]);

        if(strlen($token) == 0 ){
            return $this->respond([
                "success" => false,
                "message" => "Token Error",
                "errors"  => [
                    "reason" => "can't generate token"
                ]
            ], 500);    
        }
        

        return $this->respond([
            "success" => true,
            "message" => "login successfuly",
            "data" => ["token" => $token]
        ], 200);
    }

    // Method logout User
    public function delete($id = null)
    {
        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();

        $find_record = $this->users_model->where("user_id", $user_id)->findAll();

        if(count($find_record) == 0){
            return $this->respond([
                "success" => false,
                "message" => "User tidak ditemukan",
                "errors"  => []
            ], 404);
        }

        $this->jwt->removeTokenCookie();

        return $this->respondDeleted([
            "success" => true,
            "message" => "User Logout",
            "data"    => []            
        ]);
    }

    /**
     * Fungsi untuk melakukan pengecekkan JWT
     * @return string User Id hasil dari decode JWT
     */
    private function checkJWT(): string{
        // Ambil identitas user pada cookie JWT
        helper('cookie');
        $token    = get_cookie(env('secret.cookieName', 'access_token')) ?: "";

        $payload = $this->jwt->validateToken($token);
        return count($payload) > 0 ? $payload["user_id"]: "";        
    }
}
