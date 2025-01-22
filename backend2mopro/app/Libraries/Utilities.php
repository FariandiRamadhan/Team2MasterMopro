<?php
namespace App\Libraries;

class Utilities {

    /**
     * Fungsi untuk generate id untuk record dalam database
     * @return string
     */
    public function generateId(){
        helper('text');
        $id = (string) rand(1000,9999) . "-" . random_string("alnum", 20);
        return $id;
    }

    public function insertAgendaRules(){
        return [
            'user_id' => [
                'label'  => 'user_id',
                'rules'  => 'required|max_length[25]',
                'errors' => [
                    'required'      => 'User id tidak boleh kosong',
                    'max_length'    => "User id tidak boleh lebih dari {param} karakter",
                ],
            ],
            'judul' => [
                'label'  => 'judul',
                'rules'  => 'required|max_length[100]|alpha_numeric_space|is_unique[agendas.judul]',
                'errors' => [
                    'required'              => 'Judul meeting tidak boleh kosong',
                    'max_length'            => "Judul meeting tidak boleh lebih dari {param} karakter",
                    'alpha_numeric_space'   => "Judul meeting hanya boleh diisi huruf atau angka dan spasi",
                    'is_unique'             => "Judul meeting ini sudah pernah dibuat"
                ],
            ],
            'meeting_time' => [
                'label'  => 'meeting_time',
                'rules'  => 'required',
                'errors' => [
                    'required'      => 'Jadwal meeting tidak boleh kosong',
                ],
            ],
            'lokasi' => [
                'label'  => 'lokasi',
                'rules'  => 'required|max_length[100]',
                'errors' => [
                    'required'      => 'Lokasi meeting tidak boleh kosong',
                    'max_length'    => "Lokasi meeting tidak boleh lebih dari {param} karakter",
                ],
            ],
            'participants' => [
                'label'  => 'participants',
                'rules'  => 'required|regex_match[/^[a-zA-Z\s,]+$/]',
                'errors' => [
                    'required'      => 'Participants meeting tidak boleh kosong',
                    'regex_match'   => 'Input hanya boleh mengandung huruf, tanda koma, dan spasi'
                ],
            ],
            'deskripsi_rapat' => [
                'label'  => 'deskripsi_rapat',
                'rules'  => 'required|alpha_numeric_space',
                'errors' => [
                    'required'              => 'Deskripsi rapat meeting tidak boleh kosong',
                    'alpha_numeric_space'   => "Deskripsi rapat meeting hanya boleh diisi huruf atau angka dan spasi"
                ],
            ]
        ];
    }

    public function updateKesimpulanRules(){
        return [
            'kesimpulan_rapat' => [
                'label'  => 'kesimpulan_rapat',
                'rules'  => 'required',
                'errors' => [
                    'required'      => 'Kesimpulan meeting tidak dapat kosong'
                ],
            ],
            'follow_up_actions' => [
                'label'  => 'follow_up_actions',
                'rules'  => 'required',
                'errors' => [
                    'required'      => 'Follow up actions meeting tidak boleh kosong'
                ],
            ],
        ];
    }

    public function updateAgendaRules(){
        return [
            'judul' => [
                'label'  => 'judul',
                'rules'  => 'required|max_length[100]|alpha_numeric_space',
                'errors' => [
                    'required'              => 'judul meeting tidak boleh kosong',
                    'max_length'            => "judul meeting tidak boleh lebih dari {param} karakter",
                    'alpha_numeric_space'   => "judul meeting hanya boleh diisi huruf atau angka dan spasi"
                ],
            ],
            'meeting_time' => [
                'label'  => 'meeting_time',
                'rules'  => 'required',
                'errors' => [
                    'required'      => 'jadwal meeting tidak boleh kosong',
                ],
            ],
            'lokasi' => [
                'label'  => 'lokasi',
                'rules'  => 'required|max_length[100]',
                'errors' => [
                    'required'      => 'lokasi meeting tidak boleh kosong',
                    'max_length'    => "lokasi meeting tidak boleh lebih dari {param} karakter",
                ],
            ],
            'participants' => [
                'label'  => 'participants',
                'rules'  => 'required',
                'errors' => [
                    'required'      => 'participants meeting tidak boleh kosong',
                ],
            ],
            'deskripsi_rapat' => [
                'label'  => 'deskripsi_rapat',
                'rules'  => 'required|alpha_numeric_space',
                'errors' => [
                    'required'              => "deskripsi rapat meeting tidak boleh kosong",
                    'alpha_numeric_space'   => "deskripsi rapat meeting hanya boleh diisi huruf atau angka dan spasi"
                ],
            ],
            'status' => [
                'label'  => 'status',
                'rules'  => 'required|alpha|in_list[cancelled, pending, succeed]',
                'errors' => [
                    'required'              => "deskripsi rapat meeting tidak boleh kosong",
                    'alpha'                 => "deskripsi rapat meeting hanya boleh diisi huruf",
                    "in_list"               => "status meeting hanya bisa diisi cancelled / pending / succeed"
                ],
            ],
            'kesimpulan_rapat' => [
                'label'  => 'kesimpulan_rapat',
                'rules'  => 'permit_empty',
                'errors' => [
                    'permit_empty'      => 'Kesimpulan meeting dapat dikosongkan'
                ],
            ],
            'follow_up_actions' => [
                'label'  => 'follow_up_actions',
                'rules'  => 'permit_empty',
                'errors' => [
                    'permit_empty'      => 'Follow up actions meeting dapat dikosongkan'
                ],
            ]
        ];
    }
}