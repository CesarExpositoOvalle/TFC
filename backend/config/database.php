<?php

$servername = "db";
$username = "root";
$password = "root";
$dbname = "recetas_web"; 


$conn = new mysqli($servername, $username, $password, $dbname);
//hay que hacer cahth de errores

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
