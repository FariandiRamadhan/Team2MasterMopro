<?php
namespace App\Libraries;

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class JWTHandler {
    private $key;
    private $algorithm;
    private $tokenExpiration;
    private $cookieName;

    public function __construct() {
        $this->key              = env('secret.key', "");
        $this->algorithm        = env('secret.algo', 'HS256');
        $this->tokenExpiration  = env('secret.expireTime', 0);
        $this->cookieName       = env('secret.cookieName', 'access_token');
        helper('cookie');
    }

    /**
     * Fungsi untuk mengenerate JWT token
     * @param array $userData ['id' => '', 'username' => '']data yang digunakan untuk membuat Token JWT
     * @return string JWT Token
     */
    public function generateToken(array $userData) : string{
        $issuedAt = time();
        $expire = $issuedAt + $this->tokenExpiration;

        $payload = [
            'iat'       => $issuedAt,
            'exp'       => $expire,
            'user_id'   => $userData['user_id'],
            'username'  => $userData['username']
        ];

        $token = JWT::encode($payload, $this->key, $this->algorithm);
        
        // Set HTTP-only cookie
        $this->setTokenCookie($token);
        
        return $token;
    }
    /**
     * Setting cookie untuk JWT
     * @param string $token JWT yang sudah di encode
     * @return void Cookie di set
     */
    public function setTokenCookie(string $token) {
        $cookie = [
            'name'     => $this->cookieName,
            'value'    => $token,
            'expire'   => $this->tokenExpiration,
            'domain'   => '',
            'path'     => '/',
            'prefix'   => '',
            'secure'   => true,
            'httponly' => true,
            'samesite' => 'Strict'
        ];

        set_cookie($cookie);
    }

    /**
     * Menhapus cookie yang berisi JWT
     * @return void Cookie dihapus
     */
    public function removeTokenCookie() {
        delete_cookie($this->cookieName);
    }

    /**
     * Validasi JWT 
     * @param string $token JWT
     * @return array Array dari decode yang berisi informasi dari token
     */
    public function validateToken(string $token): array {
        try {
            $decoded = JWT::decode($token, new Key($this->key, $this->algorithm));
            return (array) $decoded;
        } catch (\Exception $e) {
            return [];
        }
    }
}