<?php
class ConfigDb {
    private $db_host = "localhost"; //Lugar o IP donde esta el servidor de Base de datos
    private $db_port = "3306"; // Puerto de Base de datos MySQL
    private $db_user = "brignidb"; // brignidb Nombre del usuario para conectarnos a la base de datos 
    private $db_pass = "Brignir123"; // Brignir123 Contraseña del Usuario de la Base de datos
    private $db_name = "medconnect"; // Nombre de la Base de Datos

    public function conexion(){
        $link = "mysql:host=".$this->db_host.":".$this->db_port.";dbname=".$this->db_name.";";
        try{
            $conn = new PDO($link,$this->db_user, $this->db_pass);
            $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           return $conn;
       }
       catch(PDOException $e){
           throw new Exception("ERROR: ".$e->getMessage());
       }
   }

    public function obtenerToken($iduser, $nombreuser){
        $bandera=true;
        $estado = "ACTIVO";
        $token = bin2hex(openssl_random_pseudo_bytes(16,$bandera));
        $bd = new ConfigDb();
        $conn = $bd->conexion();
        $sql = "INSERT INTO `token_acceso` (`ID_TOKEN`, `ID_USUARIO_FK`, `USUARIO`, `FECHA_REG`, `HORA_REG`, `ESTADO`)
         VALUES ('$token','$iduser','$nombreuser',CURRENT_DATE(), CURRENT_TIME(),'$estado')";
        $stmt = $conn ->prepare($sql);
        if($stmt->execute()){
            return $token;                
        }
    }
}
?>
