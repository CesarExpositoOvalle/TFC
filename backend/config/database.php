<?php

$servername = "db";
$username = "root";
$password = "root";
$dbname = "recetas_web"; 

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Manejar errores de conexión
if ($conn->connect_error) {
    // Devolver JSON y terminar script
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión a la base de datos: " . $conn->connect_error
    ]);
    exit();
}
?>
