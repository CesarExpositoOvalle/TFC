<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "No hay sesión activa"]);
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

    $tdee = 0;
    $proteinas = 0;
    $grasas = 0;
    $carbohidratos = 0;

    $peso = (float)$row['peso_kg'];
    $altura = (float)$row['altura_cm'];
    $edad = (int)$row['edad'];
    $genero = $row['genero'];
    $actividad = $row['actividad'];
    $objetivo = $row['objetivo'];

    if ($peso && $altura && $edad && $genero) {
        
        $bmr = $genero === "male" 
            ? 10 * $peso + 6.25 * $altura - 5 * $edad + 5
            : 10 * $peso + 6.25 * $altura - 5 * $edad - 161;

        
        $actividad_factor = [
            "sedentario" => 1.2,
            "ligero" => 1.375,
            "moderado" => 1.55,
            "intenso" => 1.725,
            "muy_intenso" => 1.9
        ];
        $tdee = $bmr * ($actividad_factor[$actividad] ?? 1.2);

        
        if ($objetivo === "bajar_peso") $tdee -= 500;
        if ($objetivo === "ganar_musculo") $tdee += 300;

        
        $proteinas = round($peso * 2); 
        $grasas = round($tdee * 0.25 / 9); 
        $carbohidratos = round(($tdee - ($proteinas * 4 + $grasas * 9)) / 4);
    }

    echo json_encode(array_merge($row, [
        "tdee" => round($tdee),
        "proteinas_diarias" => $proteinas,
        "grasas_diarias" => $grasas,
        "carbohidratos_diarias" => $carbohidratos
    ]));
} else {
    echo json_encode(["error" => "Usuario no encontrado"]);
}
?>
