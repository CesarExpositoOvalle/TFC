<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Cache-Control, Authorization");
header("Cache-Control: no-cache, must-revalidate"); // Deshabilitar caché
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Fecha en el pasado

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Stop further processing for OPTIONS
}

define('SPOONACULAR_API_KEY', '51b42182d1fa49919435b66da6eb1172');
$id = $_GET['id'] ?? null;

if ($id) {
    $url = "https://api.spoonacular.com/recipes/{$id}/information?apiKey=" . SPOONACULAR_API_KEY;
    $response = file_get_contents($url);

    if ($response) {
        $data = json_decode($response, true);
        echo json_encode($data);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al obtener la receta"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ID de receta no proporcionado"]);
}
?>