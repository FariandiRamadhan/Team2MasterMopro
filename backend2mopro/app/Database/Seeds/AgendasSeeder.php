<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Libraries\Utilities;
use CodeIgniter\I18n\Time;
use App\Models\UsersModel;

class AgendasSeeder extends Seeder
{
    public function run()
    {
        $Utilities   = new Utilities();
        $Users_model = new UsersModel();
        $time_now    = Time::now();
        $tgl_satu    = $time_now->addDays(1);
        $tgl_dua     = $time_now->addDays(2);
        $tgl_tiga    = $time_now->addDays(3);
        
        $datas = [
            [
                'agenda_id'         => $Utilities->generateId(),
                'judul'             => "pertemuan 1",
                'meeting_time'      => $tgl_satu,
                'lokasi'            => "Jl. Raya Jakarta Bogor, cilodong",
                'user_id'           => $Users_model->where("username", "admin")->findColumn("user_id")[0],
                'participants'      => 'Fauzi, Nasywa',
                'deskripsi_rapat'   => "membahas front-end development",
                'status'            => "pending",
                "kesimpulan_rapat"  => "",
                "follow_up_actions" => ""
            ],
            [
                'agenda_id'         => $Utilities->generateId(),
                'judul'             => "pertemuan 2",
                'meeting_time'      => $tgl_dua,
                'lokasi'            => "Jl. Raya Jakarta Bogor, cilodong",
                'user_id'           => $Users_model->where("username", "admin")->findColumn("user_id")[0],
                'participants'      => 'Akbar, Anto',
                'deskripsi_rapat'   => "membahas Database development",
                'status'            => "succeed",
                "kesimpulan_rapat"  => "Kerjasama dilanjutkan",
                "follow_up_actions" => "Menambahkan staff yang dibutuhkan, memenuhi kebutuhan rapat"
            ],
            [
                'agenda_id'         => $Utilities->generateId(),
                'judul'             => "pertemuan 3",
                'meeting_time'      => $tgl_tiga,
                'lokasi'            => "Jl. Raya Jakarta Bogor, cilodong",
                'user_id'           => $Users_model->where("username", "admin")->findColumn("user_id")[0],
                'participants'      => 'Fariandi, Hafizh',
                'deskripsi_rapat'   => "membahas Project Management",
                'status'            => "cancelled",
                "kesimpulan_rapat"  => "",
                "follow_up_actions" => ""
            ],
            [
                'agenda_id'         => $Utilities->generateId(),
                'judul'             => "pertemuan 1",
                'meeting_time'      => $tgl_tiga,
                'lokasi'            => "Jl. Raya Jakarta Bogor, cilodong",
                'user_id'           => $Users_model->where("username", "admin2")->findColumn("user_id")[0],
                'participants'      => 'Fariandi, Hafizh',
                'deskripsi_rapat'   => "membahas Project Management",
                'status'            => "pending",
                "kesimpulan_rapat"  => "",
                "follow_up_actions" => ""
            ],
            [
                'agenda_id'         => $Utilities->generateId(),
                'judul'             => "pertemuan 2",
                'meeting_time'      => $tgl_tiga,
                'lokasi'            => "Jl. Raya Jakarta Bogor, cilodong",
                'user_id'           => $Users_model->where("username", "admin2")->findColumn("user_id")[0],
                'participants'      => 'Akbar, Anto',
                'deskripsi_rapat'   => "membahas Project Management",
                'status'            => "pending",
                "kesimpulan_rapat"  => "",
                "follow_up_actions" => ""
            ]
        ];

        $this->db->table('agendas')->insertBatch($datas);
    }
}
