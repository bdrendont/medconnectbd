<?php

require_once("configdb.php");

//header('Content-Type: application/json');
if($_SERVER["REQUEST_METHOD"]=="PATCH"){
    try {
        $post = json_decode(file_get_contents('php://input'),true);
        
        if($post["nombres"]!="" && $post["email"]!="" && $post["indicativo"]!="" && $post["celular"]!="" && $post["identificacion"]!="" && $post["perfil"]!="" &&  $post["alias"]!="" && $post["password"]!=""){
            //$post["documento_adj"]!="" &&
            //echo $post["user"];

            /*
            
            // Obtenemos los valores enviados a través de AJAX
            $json_post = json_decode(file_get_contents('php://input'), true) ?? null;

            // En este caso el archivo no estará en $_FILES sino en en la URL php://input
            if (!is_null($json_post) && isset($json_post['archivo'])) {
                // Creamos el archivo y obtenemos su resource
                $file = fopen($json_post['archivo']['name'], 'w+');
                
                // Parseamos a binario el base64
                $bin = base64_decode($json_post['archivo']['content']);
                
                // Escribimos el archivo
                fwrite($file, $bin);
            
                // Cerramos el archivo
                fclose($file);
            }

            */
            $celular = $post["indicativo"].$post["celular"];
            $file = "";
            $bd = new ConfigDb();
            $conn = $bd->conexion();

            $sql = "INSERT INTO `usuarios`(`id_usuario`, `nombre_completo`, `correo_electronico`, `numero_celular`, `identificacion`, `id_rolFK`, `documento_adj`, `perfil`, `contrasena`) 
            VALUES (null, :nombres, :email, :celular, :identificacion, :perfil, :documento_adj, :alias, MD5(:pass))";
            $stmt = $conn ->prepare($sql);
            $stmt->bindParam(":nombres",$post["nombres"],PDO::PARAM_STR);
            $stmt->bindParam(":email",$post["email"],PDO::PARAM_STR);
            $stmt->bindParam(":celular",$celular,PDO::PARAM_STR);
            $stmt->bindParam(":identificacion",$post["identificacion"],PDO::PARAM_STR);
            $stmt->bindParam(":perfil",$post["perfil"],PDO::PARAM_STR);
            $stmt->bindParam(":documento_adj",$file,PDO::PARAM_STR);
            $stmt->bindParam(":alias",$post["alias"],PDO::PARAM_STR);
            $stmt->bindParam(":pass",$post["password"],PDO::PARAM_STR);
            if($stmt->execute()){
                //var_dump($result);
                header("HTTP/1.1 200 OK");
                echo json_encode(['code'=>200,'msg' => "OK"]);                
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
} else {
    header("HTTP/1.1 400");
    echo json_encode(['code'=>400,'msg' => 'Error, La peticion no se pudo procesar']);
}
?>