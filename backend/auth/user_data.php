<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
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

    $peso = floatval($row['peso_kg']);
    $altura = floatval($row['altura_cm']);
    $edad = intval($row['edad']);
    $genero = $row['genero'];
    $actividad = $row['actividad'];
    $objetivo = $row['objetivo'];

    // 1️⃣ Calcular BMR
    if ($genero === 'male') {
        $bmr = 10 * $peso + 6.25 * $altura - 5 * $edad + 5;
    } else {
        $bmr = 10 * $peso + 6.25 * $altura - 5 * $edad - 161;
    }

    // 2️⃣ Factor de actividad
    $activity_factors = [
        "sedentario" => 1.2,
        "ligero" => 1.375,
        "moderado" => 1.55,
        "intenso" => 1.725,
        "muy_intenso" => 1.9
    ];
    $tdee = $bmr * ($activity_factors[$actividad] ?? 1.2);

    // 3️⃣ Ajuste por objetivo
    if ($objetivo === "bajar_peso") $tdee *= 0.8;
    if ($objetivo === "ganar_musculo") $tdee *= 1.15;

    // 4️⃣ Macronutrientes
    $proteinas = $peso * 2; // g
    $grasas = ($tdee * 0.25) / 9; // g
    $carbohidratos = ($tdee - ($proteinas*4 + $grasas*9)) / 4;

    $data = [
        "id" => intval($row['id']),
        "nombre_usuario" => $row['nombre_usuario'],
        "correo" => $row['correo'],
        "edad" => $edad,
        "altura_cm" => $altura,
        "peso_kg" => $peso,
        "actividad" => $actividad,
        "objetivo" => $objetivo,
        "genero" => $genero,
        "tdee" => round($tdee),
        "proteinas_diarias" => round($proteinas),
        "grasas_diarias" => round($grasas),
        "carbohidratos_diarias" => round($carbohidratos)
    ];

    echo json_encode($data);

} else {
    echo json_encode(["error" => "Usuario no encontrado"]);
}
?>
