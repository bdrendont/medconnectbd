import { Ajax, link } from "./tool.js";

// Función para abrir el modal de recuperación de contraseña
export function modalRecuperacionClave(){
    document.getElementById('resetPasswordModal').style.display = 'block';
}

// Función para cerrar el modal de recuperacion de Contraseña
export function closeModalResetPass() {
    document.getElementById('resetPasswordModal').style.display = 'none';
}

//Funcion de Iniciar Sesion
export function inicarSesion(method){
    let user = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let info = {user,pass}
    Ajax({
        url: "controller/login.php", 
        method, 
        param: info, 
        fSuccess: (resp)=>{
            //console.log(resp)
            if (resp.code == 200) link("accesos.html?idtk="+resp.idToken)
        }
    })

}