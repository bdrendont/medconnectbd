<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        $bd = new Configdb();
        $conn = $bd->conexion();

        $sql = "SELECT `id_paciente`, `nombre_paciente`, `ubicacion`, `encargado_paciente`, `edad`, `observaciones`, `id_usuarioFK`, `estado` FROM `pacientes`";

        if (isset($_GET["id"])) {
            $sql .= " WHERE `id_paciente` = :id";
        } else {
            $sql .= " WHERE `estado` = 'ACTIVO'";
        }
        $sql .= " ORDER BY `nombre_paciente`";
        $stmt = $conn->prepare($sql);

        if (isset($_GET["id"])) {
            $stmt->bindValue(':id', trim($_GET["id"]), PDO::PARAM_INT);
        }

        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode(['code' => 200, 'data' => $result, 'msg' => "OK"]);
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['code' => 400, 'msg' => 'Error al procesar la solicitud']);
        }

        $stmt = null;
        $conn = null;
    } catch (PDOException $ex) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', 'error' => $ex->getMessage()]);
    }
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $bd = new Configdb();
        $conn = $bd->conexion();

        // Obtener los datos enviados por el formulario
        $post = json_decode(file_get_contents('php://input'), true);

        // Obtener los campos del paciente
        $nombre_paciente = trim($post["nombre_paciente"]);
        $ubicacion = trim($post["ubicacion"]);
        $datos_clinicos = trim($post["datos_clinicos"]);

        // Validación básica
        if (empty($nombre_paciente) || empty($ubicacion) || empty($datos_clinicos)) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['code' => 400, 'msg' => 'Por favor complete todos los campos']);
            exit;
        }

        // Insertar el nuevo paciente en la base de datos
        $sql = "INSERT INTO pacientes (nombre_paciente, ubicacion, observaciones) VALUES (:nombre_paciente, :ubicacion, :datos_clinicos)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':nombre_paciente', $nombre_paciente, PDO::PARAM_STR);
        $stmt->bindValue(':ubicacion', $ubicacion, PDO::PARAM_STR);
        $stmt->bindValue(':datos_clinicos', $datos_clinicos, PDO::PARAM_STR);

        if ($stmt->execute()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(['code' => 200, 'msg' => 'Paciente registrado exitosamente']);
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['code' => 500, 'msg' => 'Error al registrar el paciente']);
        }

        $stmt = null;
        $conn = null;
    } catch (PDOException $ex) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', 'error' => $ex->getMessage()]);
    }
}
