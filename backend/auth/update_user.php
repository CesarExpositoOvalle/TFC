<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "No hay sesión activa."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $_SESSION["user_id"];

// Declarar variables para bind_param
$nombre_usuario = $data["nombre_usuario"] ?? "";
$correo = $data["correo"] ?? "";
$edad = $data["edad"] ?? 0;
$altura_cm = $data["altura_cm"] ?? 0;
$peso_kg = $data["peso_kg"] ?? 0;
$actividad = $data["actividad"] ?? "";
$objetivo = $data["objetivo"] ?? "";
$genero = $data["genero"] ?? "";

try {
    $stmt = $conn->prepare("
        UPDATE usuarios SET 
            nombre_usuario = ?,
            correo = ?,
            edad = ?,
            altura_cm = ?,
            peso_kg = ?,
            actividad = ?,
            objetivo = ?,
            genero = ?
        WHERE id = ?
    ");

    $stmt->bind_param(
        "ssiissssi",
        $nombre_usuario,
        $correo,
        $edad,
        $altura_cm,
        $peso_kg,
        $actividad,
        $objetivo,
        $genero,
        $id
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Datos actualizados correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar: " . $stmt->error]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error del servidor: " . $e->getMessage()]);
}
?>
