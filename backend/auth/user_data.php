<?php
// Incluir la conexión a la base de datos
include '../config/database.php'; // Asegúrate de que la ruta sea correcta

// Establecer el email que deseas buscar
$user_email = "demxo18@gmail.com"; // Cambia esto si lo necesitas dinámicamente

// Consulta para obtener todos los datos del usuario con ese email
$sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
$sql->bind_param("s", $user_email); // Vinculamos el email al parámetro
$sql->execute();
$result = $sql->get_result();

// Comprobar si se encontró el usuario
if ($result->num_rows > 0) {
    // Obtener los datos del usuario como un array asociativo
    $user = $result->fetch_assoc();
    echo json_encode($user); // Devolver los datos en formato JSON
} else {
    // Si no se encuentra el usuario, devolver un error
    echo json_encode(['error' => 'Usuario no encontrado']);
}

// Cerrar la conexión
$conn->close();
?>
