import { Ajax, salida } from "./tool.js"

export function perfil(){
    if(localStorage.getItem("idtk")){
        document.getElementById("lb_perfil").innerHTML=localStorage.getItem("Alias")
        Ajax({
            url: "controller/token.php",
            method: "POST",
            param: {idtk: localStorage.getItem("idtk")}, 
            fSuccess: (resp)=>{
                if(!resp.code===200) salida()
            }

        })
    } else salida()
    
}