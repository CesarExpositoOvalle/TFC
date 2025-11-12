<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Cache-Control, Authorization");
header("Cache-Control: no-cache, must-revalidate"); 
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); 
}

define('SPOONACULAR_API_KEY', '51b42182d1fa49919435b66da6eb1172');
$query = $_GET['query'] ?? 'chicken';

error_log("Query recibida: " . $query);

$url = "https://api.spoonacular.com/recipes/complexSearch?query={$query}&apiKey=" . SPOONACULAR_API_KEY;
$response = file_get_contents($url);

if ($response) {
    $data = json_decode($response, true);
    echo json_encode(['results' => $data['results']]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al obtener recetas"]);
}
?>