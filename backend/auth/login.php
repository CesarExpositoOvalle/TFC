<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

require_once __DIR__ . '/../config/database.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");
$remember = $data["remember"] ?? false;

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Correo y contraseña requeridos."]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($password, $user["contrasena"])) {
    echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
    exit;
}

// Guardar sesión
$_SESSION["user_id"] = $user["id"];
$_SESSION["username"] = $user["nombre_usuario"];

// Cookie “recordarme” (para que React pueda leerla, httponly=false)
if ($remember) {
    setcookie("remember_email", $email, time() + (86400 * 30), "/", "", false, false);
}

echo json_encode([
    "success" => true,
    "message" => "Inicio de sesión exitoso",
    "user" => [
        "id" => $user["id"],
        "nombre_usuario" => $user["nombre_usuario"],
        "correo" => $user["correo"]
    ]
]);
?>
