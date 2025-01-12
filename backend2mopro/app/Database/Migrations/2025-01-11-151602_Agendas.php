<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use CodeIgniter\Database\RawSql;

class Agendas extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'agenda_id' => [
                'type'           => 'VARCHAR',
                'constraint'     => 25,
                'null'           => false
            ],
            'judul' => [
                'type'          => 'VARCHAR',
                'constraint'    => 100,
                'null'          => false
            ],
            'meeting_time' =>[
                'type'          => 'DATETIME',
                'null'          => false
            ],
            'lokasi' => [
                'type'          => 'VARCHAR',
                'constraint'    => 100,
                'null'          => false
            ],
            'participants' => [
                'type'          => 'TEXT',
                'null'          => false
            ],
            'deskripsi_rapat' => [
                'type'          => 'TEXT',
                'null'          => false,
            ],
            'status' => [
                'type'          => 'ENUM',
                'constraint'    => ['cancelled', 'pending', 'succeed'],
                'default'       => 'pending',
            ],
            'kesimpulan_rapat' => [
                'type'          => 'TEXT',
                'null'          => false,
                'default'       => ""
            ],
            'follow_up_actions' => [
                'type'          => 'TEXT',
                'null'          => false,
                'default'       => ""
            ],
            'created_at' =>[
                'type'          => 'datetime',
                'default'       => new RawSql('CURRENT_TIMESTAMP'),
                'null'          => false
            ],
            'updated_at' =>[
                'type'          => 'datetime',
                'default'       => new RawSql('CURRENT_TIMESTAMP'),
                'null'          => false
            ],
            'deleted_at' =>[
                'type'          => 'datetime',
                'null'          => true
            ]
        ]);
        $this->forge->addKey('agenda_id', true);
        $this->forge->createTable('agendas');
    }

    public function down()
    {
        $this->forge->dropTable('agendas');
    }
}
