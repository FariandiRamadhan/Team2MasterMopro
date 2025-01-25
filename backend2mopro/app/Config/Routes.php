<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->resource("agendas",['controller' => 'AgendaController']);
$routes->resource("users",['controller' => 'UserController']);
$routes->resource("user_management",['controller' => 'UserManagementController']);

/** 
 * Untuk menghandle method OPTIONS yang tidak dikelola secara otomatis oleh Codeigniter 4
 * Options Method digunakan pada preflight response
 * Dieksekusi terlebih dulu sebelum main request untuk melihat header request yang akan divalidasi
 * Jika ini dihapus maka akan menghasilkan CORS error pada browser
 * 
 * Mengganti filter CORS pada variable methods di Filters.php
*/
$routes->options('(:any)', function () {
    // Respons kosong untuk metode OPTIONS
    return '';
});