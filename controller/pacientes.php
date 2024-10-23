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
}