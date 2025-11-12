<?php

$servername = "db";
$username = "root";
$password = "root";
$dbname = "recetas_web"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión a la base de datos: " . $conn->connect_error
    ]);
    exit();
}
?>
