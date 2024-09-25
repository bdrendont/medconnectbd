import { Ajax, salida } from "./tool.js"

export function perfil(){
    if(localStorage.getItem("idtk")){
        let $perfil = document.getElementById("profileDropdown")
        $perfil.lastElementChild.innerHTML=localStorage.getItem("Alias")
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