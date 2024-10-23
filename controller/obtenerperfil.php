<?php
require_once("configdb.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idtk = $_POST['idtk'];

    // Consulta para obtener los datos del usuario desde la base de datos
    $sql = "SELECT nombre_completo, correo_electronico, numero_celular, identificacion, perfil 
            FROM usuarios WHERE id_usuario = (SELECT id_usuario FROM tokens WHERE token = ?)";
    
    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $idtk);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();

        // Devolver los datos del usuario en formato JSON
        echo json_encode([
            "code" => 200,
            "data" => $usuario
        ]);
    } else {
        echo json_encode([
            "code" => 400,
            "message" => "Usuario no encontrado"
        ]);
    }
}