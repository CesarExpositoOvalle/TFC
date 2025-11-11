<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();
require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "No hay sesión activa."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $_SESSION["user_id"];

try {
    $pdo = getDatabaseConnection();

    $stmt = $pdo->prepare("
        UPDATE usuarios SET 
            nombre_usuario = :nombre_usuario,
            correo = :correo,
            edad = :edad,
            altura_cm = :altura_cm,
            peso_kg = :peso_kg,
            actividad = :actividad,
            objetivo = :objetivo,
            genero = :genero
        WHERE id = :id
    ");

    $stmt->execute([
        ":nombre_usuario" => $data["nombre_usuario"] ?? null,
        ":correo" => $data["correo"] ?? null,
        ":edad" => $data["edad"] ?? null,
        ":altura_cm" => $data["altura_cm"] ?? null,
        ":peso_kg" => $data["peso_kg"] ?? null,
        ":actividad" => $data["actividad"] ?? null,
        ":objetivo" => $data["objetivo"] ?? null,
        ":genero" => $data["genero"] ?? null,
        ":id" => $id
    ]);

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
