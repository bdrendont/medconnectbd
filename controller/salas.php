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
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $bd = new Configdb();
        $conn = $bd->conexion();

        // Obtener los datos enviados por el formulario
        $post = json_decode(file_get_contents('php://input'),true);
        
        $nombre_sala = trim($post["nombre_sala"]);
        $disponibilidad = trim($post["disponibilidad"]);

        // Validación básica
        if (empty($nombre_sala) || empty($disponibilidad)) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['code' => 400, 'msg' => 'Por favor complete todos los campos']);
            exit;
        }

        // Insertar la nueva ubicación en la base de datos
        $sql = "INSERT INTO ubicacion (nombre_ubicacion, estados) VALUES (:nombre_sala, :disponibilidad)";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':nombre_sala', $nombre_sala, PDO::PARAM_STR);
        $stmt->bindValue(':disponibilidad', $disponibilidad, PDO::PARAM_STR);

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

} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    try {
        
        $bd = new Configdb();
        $conn = $bd->conexion();

        $post = json_decode(file_get_contents('php://input'), true);
        if (!empty($post["id_sala"])) {
            $sql = "DELETE FROM ubicacion WHERE id_ubicacion = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':id', $post["id_sala"], PDO::PARAM_INT);
            if ($stmt->execute()) {
                header("HTTP/1.1 200 OK");
                echo json_encode(['code' => 200, 'msg' => "Ubicación eliminada con éxito"]);
            } else {
                throw new Exception("Error al eliminar la ubicación");
            }
        } else {
            throw new Exception("ID de la ubicación requerida");
        }
    } catch (Exception $e) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => $e->getMessage()]);
    }
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    try {
        
        $bd = new Configdb();
        $conn = $bd->conexion();

        $post = json_decode(file_get_contents('php://input'), true);

        if (!empty($post["id_sala"]) && !empty($post["nombre_sala"]) && !empty($post["disponibilidad"])) {
            $sql = "UPDATE ubicacion 
                    SET nombre_ubicacion = :nombre_ubicacion, estados = :estados 
                    WHERE id_ubicacion = :id_ubicacion";

            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':id_ubicacion', $post["id_sala"], PDO::PARAM_INT);
            $stmt->bindValue(':nombre_ubicacion', $post["nombre_sala"], PDO::PARAM_STR);
            $stmt->bindValue(':estados', $post["disponibilidad"], PDO::PARAM_STR);

            if ($stmt->execute()) {
                header("HTTP/1.1 200 OK");
                echo json_encode(['code' => 200, 'msg' => "Ubicación actualizada con éxito"]);
            } else {
                header("HTTP/1.1 400 Bad Request");
                echo json_encode(['code' => 400, 'msg' => "Inconvenientes al gestionar la consulta"]);
            }

            $stmt = null;
            $conn = null;
        } else {
            throw new Exception("Datos incompletos para la actualización");
        }
    } catch (Exception $e) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(['code' => 500, 'msg' => $e->getMessage()]);
    }
} else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}
