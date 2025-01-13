<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use App\Models\AgendasModel;
use App\Libraries\JWTHandler;
use App\Libraries\Utilities;

class AgendaController extends ResourceController
{
    use ResponseTrait;
    /**
     * Object dari AgendasModel
     * @var 
     */
    private $agendas_model;
    private $db;
    private $jwt;

    public function __construct(){
        $this->agendas_model = new AgendasModel();
        $this->db            = \Config\Database::connect();  
        $this->jwt           = new JWTHandler();   
    }

    // Get All Agenda
    public function index()
    {
        $limit           = $this->request->getGet("limit") ?: NULL;

        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();

        $datas = $this->db->table('agendas')
                ->join('users', 'users.user_id = agendas.user_id')
                ->where('deleted_at', NULL)
                ->where('agendas.user_id', $user_id)
                ->select("agenda_id, judul, meeting_time, lokasi, username, participants, deskripsi_rapat, status, kesimpulan_rapat, follow_up_actions")
                ->orderBy("created_at", "desc")
                ->limit($limit)
                ->get()
                ->getResultArray();

        $returned_array = $this->formatterGetAgenda($datas);

        return $this->respond($returned_array);
    }

    // Get Specific Agenda
    public function show($id = null)
    {
        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();

        $datas = $this->db->table('agendas')
                ->join('users', 'users.user_id = agendas.user_id')
                ->where('deleted_at', NULL)
                ->where('agendas.user_id', $user_id)
                ->where("agenda_id", $id)
                ->select("agenda_id, judul, meeting_time, lokasi, username, participants, deskripsi_rapat, status, kesimpulan_rapat, follow_up_actions")
                ->limit(1)
                ->get()
                ->getResultArray();

        if(count($datas) == 0){
            return $this->respond([
                "success" => false, 
                "message" => "agenda not found",
                "errors"  => []
            ], 404);
        }

        $returned_array = $this->formatterGetAgenda($datas);

        return $this->respond($returned_array, 200);
    }

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

        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();
        // var_dump($data);
        // die();

        $datas = [
            'agenda_id'         => $Utilities->generateId(),
            'user_id'           => $user_id,
            'judul'             => htmlspecialchars($data["judul"]),
            'meeting_time'      => htmlspecialchars(implode(" ", $data["meeting_time"])),
            'lokasi'            => htmlspecialchars($data["lokasi"]),
            'participants'      => htmlspecialchars($data["participants"]),
            'deskripsi_rapat'   => htmlspecialchars($data["deskripsi_rapat"]),
        ];

        $validation->setRules($Utilities->insertAgendaRules());

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

        $this->agendas_model->save($datas);

        return $this->respondCreated([
            "success" => true,
            "message" => "Agenda created",
            "data"    => []
        ], "Agenda created");

    }

    public function update($id = null)
    {
        $validation = service('validation');
        $json       = file_get_contents('php://input');
        $data       = json_decode($json, true);
        $method     = $this->request->getMethod();
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

        $datas      = [];
        if($method === "PUT"){
            $datas = [
                'agenda_id'         => $id,
                'judul'             => htmlspecialchars($data["judul"]),
                'meeting_time'      => htmlspecialchars(implode(" ", $data["meeting_time"])),
                'lokasi'            => htmlspecialchars($data["lokasi"]),
                'participants'      => htmlspecialchars($data["participants"]),
                'deskripsi_rapat'   => htmlspecialchars($data["deskripsi_rapat"]),
                'status'            => htmlspecialchars($data["status"]),
                'kesimpulan_rapat'  => htmlspecialchars($data["kesimpulan_rapat"]),
                'follow_up_actions' => htmlspecialchars($data["follow_up_actions"]),
            ];
            $validation->setRules($Utilities->updateAgendaRules());

        }else if($method === "PATCH"){
            $datas = [
                'agenda_id'         => $id,
                'kesimpulan_rapat'  => htmlspecialchars($data["kesimpulan_rapat"]),
                'follow_up_actions' => htmlspecialchars($data["follow_up_actions"]),
            ];
            $validation->setRules($Utilities->updateKesimpulanRules());
        }else{
            return $this->respond([
                "success" => false, 
                "message" => "request method invalid", 
                "errors"  => []
            ], 404);
        }

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

        $this->agendas_model->save($datas);

        return $this->respondUpdated([
            "success" => true,
            "message" => "Data agenda rapat berhasil diubah",
            "data"    => []
        ], "Agenda Edited");
        
    }

    public function delete($id = null)
    {
        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();

        $find_record = $this->agendas_model->where("agenda_id", $id)->where("user_id", $user_id)->findAll();

        if(count($find_record) > 0){
            $this->agendas_model->where("agenda_id", $id)->where("user_id", $user_id)->delete();
        }else{
            return $this->respond([
                "success" => false,
                "message" => "Data tidak ditemukan",
                "errors"  => []
            ], 404);
        }

        return $this->respondDeleted([
            "success" => true,
            "message" => "Data agenda rapat berhasil dihapus",
            "data"    => []            
        ]);
    }

    private function checkJWT(): string{
        // Ambil identitas user pada cookie JWT
        helper('cookie');
        $token    = get_cookie('access_token') ?: "";

        $payload = $this->jwt->validateToken($token);
        return count($payload) > 0 ? $payload["user_id"]: "";        
    }

    private function formatterGetAgenda(array $datas, array $returned_array = []): array{

        $returned_array["success"] = true;
        $returned_array["message"] = "Agenda Found";
        $returned_array["data"]    = [];

        foreach($datas as $data){
            [$date, $time] = explode(" ", $data["meeting_time"]);
            $participants  = explode(", ", $data["participants"]);
            array_push($returned_array["data"], [
                "agenda_id"         => $data["agenda_id"],
                "judul"             => $data["judul"],
                "meeting_time"      => ["tanggal" => $date, "jam" => $time],
                "lokasi"            => $data["lokasi"],
                "username"          => $data["username"],
                "participants"      => $participants,
                "deskripsi_rapat"   => $data["deskripsi_rapat"],
                "status"            => $data["status"],
                "kesimpulan_rapat"  => $data["kesimpulan_rapat"],
                "follow_up_actions" => $data["follow_up_actions"]
            ]);
        }
        
        return $returned_array;
    }
}
