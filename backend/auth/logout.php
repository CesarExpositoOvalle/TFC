<?php
session_start();

// CORS (NO usar '*', usar la URL exacta de tu frontend)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Vaciar sesión
    $_SESSION = [];

    // Borrar cookie de sesión
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Destruir sesión
    session_destroy();

    // Respuesta JSON
    echo json_encode([
        "success" => true,
        "message" => "Sesión cerrada correctamente."
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al cerrar sesión: " . $e->getMessage()
    ]);
}
