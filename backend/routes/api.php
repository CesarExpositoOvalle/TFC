<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../controllers/UserController.php';

$controller = new UserController();

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/register':
        $controller->register();
        break;
    case '/login':
        $controller->login();
        break;
    case '/updateProfile':
        $controller->updateProfile();
        break;
    default:
        http_response_code(404);
        echo json_encode(array("message" => "Endpoint not found."));
        break;
}
?>