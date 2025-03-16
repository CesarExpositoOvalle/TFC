<?php
// database.php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "mi_base"; // Asegúrate de que este sea el nombre correcto de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
