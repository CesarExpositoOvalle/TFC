<?php
der("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Mensaje de prueba para comprobar que el backend funciona
$response = [
    "status" => "success",
    "message" => "El backend en PHP está funcionando correctamente"
];

echo json_encode($response);
?>
