<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\UsersModel;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $users_model = new UsersModel();
        
        $datas = [
            [
                'user_id'      => $users_model->generateId(),
                'username'     => "admin",
                'password'     => password_hash("admin#1234", PASSWORD_DEFAULT),
            ],
            [
                'user_id'      => $users_model->generateId(),
                'username'     => "admin2",
                'password'     => password_hash("admin2#1234", PASSWORD_DEFAULT),
            ]
        ];

        $this->db->table('users')->insertBatch($datas);
    }
}
