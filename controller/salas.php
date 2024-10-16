<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        $bd = new Configdb();
        $conn = $bd->conexion();

        $sql = "SELECT `id_ubicacion`, `nombre_ubicacion`, `estados` FROM `ubicacion` ORDER BY `nombre_ubicacion`";

        if (isset($_GET["id"])) {
            $sql .= " WHERE id_ubicacion = :id";
        }

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
}else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}




if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $bd = new Configdb();
        $conn = $bd->conexion();

        // Obtener los datos enviados por el formulario
        $nombre_sala = trim($_POST["nombre_sala"]);
        $disponibilidad = trim($_POST["disponibilidad"]);

        // Validación básica
        if (empty($nombre_sala) || empty($disponibilidad)) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['code' => 400, 'msg' => 'Por favor complete todos los campos']);
            exit;
        }

        // Insertar la nueva ubicación en la base de datos
        $sql = "INSERT INTO ubicacion (nombre_ubicacion, estado) VALUES (:nombre_sala, :disponibilidad)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':nombre_sala', $nombre_sala, PDO::PARAM_STR);
        $stmt->bindValue(':disponibilidad', $disponibilidad, PDO::PARAM_INT);

        if ($stmt->execute()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(['code' => 200, 'msg' => 'Ubicación registrada exitosamente']);
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['code' => 500, 'msg' => 'Error al registrar la ubicación']);
        }

        $stmt = null;
        $conn = null;
    } catch (PDOException $ex) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => 'Error interno al procesar su petición', 'error' => $ex->getMessage()]);
    }
}
