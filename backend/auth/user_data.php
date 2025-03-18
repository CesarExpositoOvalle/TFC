<?php
include '../config/database.php'; 

$user_email = "demxo18@gmail.com"; 

$sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
$sql->bind_param("s", $user_email); 
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode($user); 
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$conn->close();
?>
