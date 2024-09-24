<?php
require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="POST"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);
        
        if($post["user"]!="" && $post["pass"]!=""){
            //echo $post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "SELECT `id_usuario`, `nombre_completo`, `perfil` FROM `usuarios` WHERE `correo_electronico`= :user 	AND `contrasena`= MD5(:clave)";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":user",$post["user"],PDO::PARAM_STR);
            $stmt->bindParam(":clave",$post["pass"],PDO::PARAM_STR);
            if($stmt->execute()){
                $result = $stmt->fetchAll();
                if(count($result) > 0)
                {
                    $idtoken="";
                    $idtoken = $bd->obtenerToken($result[0]["id_usuario"], $result[0]["nombre_completo"]);
                    //var_dump($result);

                    header("HTTP/1.1 200 OK");
                    echo json_encode(['code'=>200,
                    'idUser'=>$result[0]["id_usuario"],
                    'Alias'=>$result[0]["perfil"],
                    'Usuario'=>$result[0]["nombre_completo"],
                    'idToken'=>$idtoken,
                    'msg' => "OK"]);
                }else{                    
                header("HTTP/1.1 203 OK");
                    echo json_encode(['code'=>203,'msg' => "Las credenciales no son validas"]);
                }
            }else{
                header("HTTP/1.1 203 OK");
                echo json_encode(['code'=>203,'msg' => "Las credenciales no son validas"]);
            }
            $stmt = null;
            $conn = null;
        }
        //exit();
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage()]);
        //echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su peticion'.$ex->getMessage()]);
    }
} else if($_SERVER["REQUEST_METHOD"]=="GET"){
    try {
        if($_GET["idtoken"]!=""){
            //echo $post["user"]; 
            $bd = new ConfigDb();
            $conn = $bd->conexion();
            $sql = "UPDATE `token_acceso` SET `ESTADO`='INACTIVO' WHERE `ID_TOKEN`= :idtk";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":idtk",$_GET["idtoken"],PDO::PARAM_STR);
            if($stmt->execute()){                
                //var_dump($result);
                header("HTTP/1.1 200 OK");
                echo json_encode(['code'=>200,'msg'=> "OK"]);
            }else{
                header("HTTP/1.1 203 OK");
                echo json_encode(['code'=>203,'msg' => "Las credenciales no son validas"]);
            }
            $stmt = null;
            $conn = null;
        }
        //exit();
    } catch (Exception $ex) {
        header("HTTP/1.1 500");
        echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su petici&oacute;n', "ERROR"=>$ex->getMessage()]);
        //echo json_encode(['code'=>500,'msg' => 'Error interno al procesar su peticion'.$ex->getMessage()]);
    }
}else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}