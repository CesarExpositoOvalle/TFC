<?php
// Permitir que React acceda sin problemas de CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Conectar con la base de datos usando database.php
require_once __DIR__ . '/../config/database.php';

// Seleccionamos el admin por ahora
$query = "SELECT * FROM usuarios WHERE nombre_usuario = 'admin'";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Mapear los campos EXACTAMENTE como están en la tabla
    $data = [
        "id" => (int)$row['id'],
        "nombre_usuario" => $row['nombre_usuario'],
        "correo" => $row['correo'],
        "contrasena" => "********", // no mostrar la contraseña real
        "edad" => (int)$row['edad'],
        "altura_cm" => (int)$row['altura_cm'],
        "peso_kg" => (float)$row['peso_kg'],
        "actividad" => $row['actividad'],
        "objetivo" => $row['objetivo'],
        "genero" => $row['genero'],
        "rol" => $row['rol'],
        "calorias_diarias" => $row['calorias_diarias'],
        "proteinas_diarias" => $row['proteinas_diarias'],
        "grasas_diarias" => $row['grasas_diarias'],
        "carbohidratos_diarias" => $row['carbohidratos_diarias'],
        "fecha_registro" => $row['fecha_registro']
    ];

    echo json_encode($data);
} else {
    echo json_encode(["error" => "No se encontró el usuario"]);
}
?>
