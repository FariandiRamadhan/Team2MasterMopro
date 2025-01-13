<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Libraries\Utilities;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $Utilities = new Utilities();
        
        $datas = [
            [
                'user_id'      => $Utilities->generateId(),
                'username'     => "admin",
                'password'     => password_hash("admin#1234", PASSWORD_DEFAULT),
            ],
            [
                'user_id'      => $Utilities->generateId(),
                'username'     => "admin2",
                'password'     => password_hash("admin2#1234", PASSWORD_DEFAULT),
            ]
        ];

        $this->db->table('users')->insertBatch($datas);
    }
}
