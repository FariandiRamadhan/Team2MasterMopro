<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Libraries\JWTHandler;
use Config\Services;

class JWTAuthFilter implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\HTTP\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return RequestInterface|ResponseInterface|string|void
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        $jwt      = new JWTHandler();
        helper('cookie');

        // Get Authorization Header (hanya berlaku jika menggunakan Authorization header)
        // $header = $request->getServer('HTTP_AUTHORIZATION');

        // Get token from cookie instead of header
        $token    = get_cookie('access_token');
        
        if (empty($token)) {
            return Services::response()->setJSON([
                "success" => false,
                'message' => 'Unauthorized request',
                'errors'  => ["reason" => "token is not found"],
                'token'   => $token
            ])->setStatusCode(401);
        }

        $payload = $jwt->validateToken($token);

        if (!$payload) {
            // Clear invalid cookie
            $jwt->removeTokenCookie();
            
            return Services::response()->setJSON([
                "success" => false,
                'message' => 'Unauthorized request',
                'errors'  => ["reason" => "token is invalid"]
            ])->setStatusCode(401);
        }

        return $request;
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return ResponseInterface|void
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
