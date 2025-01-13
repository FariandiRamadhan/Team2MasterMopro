<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->resource("agendas",['controller' => 'AgendaController']);
$routes->resource("users",['controller' => 'UserController']);
$routes->resource("user_management",['controller' => 'UserManagementController']);
