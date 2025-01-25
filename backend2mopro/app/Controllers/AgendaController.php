<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use App\Models\AgendasModel;
use App\Libraries\JWTHandler;
use App\Libraries\Utilities;
use CodeIgniter\I18n\Time;

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
        $status          = $this->request->getGet("status") ?: NULL;

        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();

        $builder = $this->db->table('agendas')
                ->join('users', 'users.user_id = agendas.user_id')
                ->where('deleted_at', NULL)
                ->where('agendas.user_id', $user_id)
                ->select("agenda_id, judul, meeting_time, lokasi, username, participants, deskripsi_rapat, status, kesimpulan_rapat, follow_up_actions")
                ->orderBy("created_at", "desc")
                ->limit($limit);

        if(!is_null($status)){
            $builder->where("status", $status);
        }

        $datas  = $builder->get()->getResultArray();

        $returned_array = $this->formatterGetAgenda($datas);

        return $this->respond($returned_array);
    }

    // Get Specific Agenda
    public function show($id = null)
    {
        // Ambil identitas user pada cookie JWT
        $user_id         = $this->checkJWT();
        $judul           = $this->request->getGet("judul") ?: NULL;
        $tanggal_mulai   = $this->request->getGet("tanggal_mulai") ?: NULL;
        $tanggal_selesai = $this->request->getGet("tanggal_selesai") ?: NULL;

        $builder    = $this->db->table('agendas')
                    ->join('users', 'users.user_id = agendas.user_id')
                    ->where('deleted_at', NULL)
                    ->where('agendas.user_id', $user_id)
                    ->select("agenda_id, judul, meeting_time, lokasi, username, participants, deskripsi_rapat, status, kesimpulan_rapat, follow_up_actions");
                    
        if(!is_null($judul)){
            $builder->like("judul", $judul);
        }else if(!is_null($tanggal_mulai) && !is_null($tanggal_selesai)){
            $builder->where('meeting_time >=', $tanggal_mulai)
                    ->where('meeting_time <=', $tanggal_selesai);
        }else{
            $builder->where("agenda_id", $id)
                    ->limit(1);
        }

        $datas      = $builder->get()->getResultArray();

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
            'judul'             => htmlspecialchars(isset($data["judul"])? $data["judul"] : ""),
            'meeting_time'      => htmlspecialchars(implode(" ", isset($data["meeting_time"])? $data["meeting_time"] : ["", ""])),
            'lokasi'            => htmlspecialchars(isset($data["lokasi"])? $data["lokasi"] : ""),
            'participants'      => htmlspecialchars(isset($data["participants"])? $data["participants"] : ""),
            'deskripsi_rapat'   => htmlspecialchars(isset($data["deskripsi_rapat"])? $data["deskripsi_rapat"] : ""),
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
            $kesimpulan_rapat  = "";
            $follow_up_actions = "";
            $status            = htmlspecialchars(isset($data["status"])? $data["status"] : "");
            if($status == "succeed"){
                $kesimpulan_rapat  = htmlspecialchars(isset($data["kesimpulan_rapat"])? $data["kesimpulan_rapat"] : "");
                $follow_up_actions = htmlspecialchars(isset($data["follow_up_actions"])? $data["follow_up_actions"] : "");
            }
            $datas = [
                'agenda_id'         => $id,
                'judul'             => htmlspecialchars(isset($data["judul"])? $data["judul"] : ""),
                'meeting_time'      => htmlspecialchars(implode(" ", isset($data["meeting_time"])? $data["meeting_time"] : ["",""])),
                'lokasi'            => htmlspecialchars(isset($data["lokasi"])? $data["lokasi"] : ""),
                'participants'      => htmlspecialchars(isset($data["participants"])? $data["participants"] : ""),
                'deskripsi_rapat'   => htmlspecialchars(isset($data["deskripsi_rapat"])? $data["deskripsi_rapat"] : ""),
                'status'            => $status,
                'kesimpulan_rapat'  => $kesimpulan_rapat,
                'follow_up_actions' => $follow_up_actions,
            ];
            $validation->setRules($Utilities->updateAgendaRules());

        }else if($method === "PATCH"){
            $datas = [
                'agenda_id'         => $id,
                'kesimpulan_rapat'  => htmlspecialchars(isset($data["kesimpulan_rapat"])? $data["kesimpulan_rapat"] : ""),
                'follow_up_actions' => htmlspecialchars(isset($data["follow_up_actions"])? $data["follow_up_actions"] : ""),
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
            $time_obj = Time::parse($data["meeting_time"]);
            $date = $time_obj->toLocalizedString('dd/MM/yyyy');
            $time = $time_obj->toLocalizedString('HH:mm');
            $exploded_participants  = explode(",", $data["participants"]);
            $participants = [];
            
            foreach($exploded_participants as $participant){
                array_push($participants, trim($participant," "));
            }

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
