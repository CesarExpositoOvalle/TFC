<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "mi_base"; 


$conn = new mysqli($servername, $username, $password, $dbname);
//hay que hacer cahth de errores

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
