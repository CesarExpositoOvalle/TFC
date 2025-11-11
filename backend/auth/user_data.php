<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "No hay sesión activa."]);
    exit;
}

$user_id = $_SESSION["user_id"];

$query = "SELECT * FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $data = [
        "id" => (int)$row['id'],
        "nombre_usuario" => $row['nombre_usuario'],
        "correo" => $row['correo'],
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
    echo json_encode(["error" => "Usuario no encontrado"]);
}
?>
