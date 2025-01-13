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
        $user_id         = $this->checkJWT();

        $datas = $this->users_model->select("user_id, username")->where("user_id", $user_id)->findAll();

        if(count($datas) == 0){
            return $this->respond([
                "success" => false, 
                "message" => "user not found",
                "errors"  => []
            ], 404);
        }

        return $this->respond(["user_id" => $datas[0]["user_id"], "username" => $datas[0]["username"]], 200);
    }

    // Method Login
    public function create()
    {
        $json         = file_get_contents('php://input');
        $data         = json_decode($json, true);
        $username     = htmlspecialchars($data["username"]);
        $password     = htmlspecialchars($data["password"]);
        $user_id      = "";

        $get_records  = $this->users_model->where("username", $username)->findAll();

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
                "message" => "Login failed, no record matched",
                "errors"  => []
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
            "data" => []
        ], 200);
    }

    // Method logout
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
     * @return string JWT
     */
    private function checkJWT(): string{
        // Ambil identitas user pada cookie JWT
        helper('cookie');
        $token    = get_cookie('access_token') ?: "";

        $payload = $this->jwt->validateToken($token);
        return count($payload) > 0 ? $payload["user_id"]: "";        
    }
}
