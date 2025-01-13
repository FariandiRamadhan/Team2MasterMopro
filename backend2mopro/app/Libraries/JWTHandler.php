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
        $this->tokenExpiration  = 3600; // 1 hour
        $this->cookieName       = 'access_token';
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

    public function setTokenCookie($token) {
        $cookie = [
            'name'     => $this->cookieName,
            'value'    => $token,
            'expire'   => $this->tokenExpiration,
            'domain'   => '',
            'path'     => '/',
            'prefix'   => '',
            'secure'   => false,
            'httponly' => true,
            'samesite' => 'Strict'
        ];

        set_cookie($cookie);
    }

    public function removeTokenCookie() {
        delete_cookie($this->cookieName);
    }

    public function validateToken(string $token): array {
        try {
            $decoded = JWT::decode($token, new Key($this->key, $this->algorithm));
            return (array) $decoded;
        } catch (\Exception $e) {
            return [];
        }
    }
}