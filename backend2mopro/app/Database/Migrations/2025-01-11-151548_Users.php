<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'user_id' => [
                'type'          => 'VARCHAR',
                'constraint'    => 25,
                'null'          => false,
            ],
            'username' => [
                'type'          => 'VARCHAR',
                'constraint'    => 100,
                'null'          => false
            ],
            'password' => [
                'type'          => 'VARCHAR',
                'constraint'    => 255,
                'null'          => false
            ]
        ]);
        $this->forge->addKey('user_id', true);
        $this->forge->createTable('users');
    }

    public function down()
    {
        $this->forge->dropTable('users');
    }
}
