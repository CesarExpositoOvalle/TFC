<?php
// filepath: /C:/Users/demxo/Desktop/TFC/TFC/backend/api/recipes.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Definir la API Key de Spoonacular
define('SPOONACULAR_API_KEY', '51b42182d1fa49919435b66da6eb1172');  // Reemplaza con tu API Key

// Recibir parámetros de búsqueda (por ejemplo, "pasta")
$query = $_GET['query'] ?? 'chicken'; // Si no se proporciona, usa "chicken" como por defecto

// URL de la API de Spoonacular
$url = "https://api.spoonacular.com/recipes/complexSearch?query={$query}&apiKey=" . SPOONACULAR_API_KEY;

// Obtener los datos de la API
$response = file_get_contents($url);

// Comprobar si la respuesta es válida
if ($response) {
    $data = json_decode($response, true);
    echo json_encode(['results' => $data['results']]);  // Asegurarse de que la respuesta tenga un campo "results"
} else {
    echo json_encode(["status" => "error", "message" => "Error al obtener recetas"]);
}
?>