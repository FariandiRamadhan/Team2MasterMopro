<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

use App\Models\UsersModel;
use App\Libraries\JWTHandler;
use App\Libraries\Utilities;

class UserManagementController extends ResourceController
{
    use ResponseTrait;

    private $users_model;
    private $jwt;

    public function __construct(){
        $this->users_model = new UsersModel();
        $this->jwt         = new JWTHandler();   
    }

    // Create User 
    public function create()
    {
        $validation = service('validation');
        $json       = file_get_contents('php://input');
        $data       = json_decode($json, true);
        $Utilities  = new Utilities();

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->respond([
                "success" => false,
                "message" => "JSON structure error",
                "errors"  => [
                    "reason" => [
                        "error_name" => "JSON Error: " . json_last_error_msg(),
                        "json"       => $json
                    ]
                ]
            ], 400);
        }

        $datas = [
            'user_id'         => $Utilities->generateId(),
            'username'        => htmlspecialchars($data["username"]),
            'password'        => password_hash(htmlspecialchars( $data["password"]), PASSWORD_DEFAULT)
        ];

        $validation->setRules($this->userRules());

        // Mengecek validasi, jika gagal maka akan mengembalikan error
        if (! $validation->run($datas)){ 
            return $this->respond([
                "success" => false,
                "message" => "Data yang dikirimkan tidak valid",
                "errors"  => [
                    "reason" => $validation->getErrors()
                ]
            ], 400);
        }

        $this->users_model->save($datas);

        return $this->respondCreated([
            "success" => true,
            "message" => "User created",
            "data"    => []
        ], "User created");
    }

    // Update User
    public function update($id = null)
    {

        $validation = service('validation');
        $json       = file_get_contents('php://input');
        $data       = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->respond([
                "success" => false,
                "message" => "JSON structure error",
                "errors"  => [
                    "reason" => [
                        "error_name" => "JSON Error: " . json_last_error_msg(),
                        "json"       => $json
                    ]
                ]
            ], 400);
        }

        $datas = [
            'user_id'         => $id,
            'username'        => htmlspecialchars($data["username"]),
            'password'        => password_hash(htmlspecialchars( $data["password"]), PASSWORD_DEFAULT)
        ];
            
        $validation->setRules($this->userRules());

        // Mengecek validasi, jika gagal maka akan mengembalikan error
        if (! $validation->run($datas)){ 
            return $this->respond([
                "success" => false,
                "message" => "Data yang dikirimkan tidak valid",
                "errors"  => [
                    "reason" => $validation->getErrors()
                ]
            ], 400);
        }

        $this->users_model->save($datas);

        return $this->respondUpdated([
            "success" => true,
            "message" => "Data User berhasil diubah",
            "data"    => []
        ], "User Edited");
        
    }

    // Menghapus Akun
    public function delete($id = null)
    {
        $find_record = $this->users_model->where("user_id", $id)->findAll();

        if(count($find_record) == 0){
            return $this->respond([
                "success" => false,
                "message" => "User tidak ditemukan",
                "errors"  => []
            ], 404);
        }

        if($this->users_model->delete($id)){
            return $this->respondDeleted([
                "success" => true,
                "message" => "User Deleted",
                "data"    => []            
            ]);    
        }

        $this->jwt->removeTokenCookie();

        return $this->respond([
            "success" => false,
            "message" => "User Tidak dapat dihapus",
            "errors"    => []            
        ], 500);
    }

    private function userRules(): array {
        return [
            'username' => [
                'label'  => 'username',
                'rules'  => 'required|max_length[100]|alpha_numeric|is_unique[users.username]',
                'errors' => [
                    'required'      => "username tidak boleh kosong",
                    'max_length'    => "username tidak boleh lebih dari {param} karakter",
                    'alpha_dash'    => "username hanya boleh terdiri dari huruf, angka, dash, dan underscore",
                    'is_unique'     => "username sudah dipakai"
                ],
            ],
            'password' => [
                'label'  => 'password',
                'rules'  => 'required|max_length[255]',
                'errors' => [
                    'required'              => "password tidak boleh kosong",
                    'max_length'            => "password tidak boleh lebih dari {param} karakter",
                ],
            ]
        ];
    }
}
