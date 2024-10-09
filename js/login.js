import { Ajax, link } from "./tool.js";

// Función para abrir el modal de recuperación de contraseña
export function modalRecuperacionClave() {
    document.getElementById('resetPasswordModal').style.display = 'block';
}

// Función para cerrar el modal de recuperacion de Contraseña
export function closeModalResetPass() {
    document.getElementById('resetPasswordModal').style.display = 'none';
}

// Función para abrir el modal de nueva ubicación
export function modalNewLocation() {
    document.getElementById('NewLocationModal').style.display = 'block';
}

// Función para cerrar el modal de nueva ubicación
export function closeNewLocation() {
    document.getElementById('NewLocationModal').style.display = 'none';
}

// Función para tarjeta de perfil
export function VerPerfil() {
    document.getElementById('profileCard').style.display = 'block';
}

// Función para tarjeta de perfil
export function closePerfil() {
    document.getElementById('profileCard').style.display = 'none';
}

// Función para ver tarjeta de Editar Perfil
export function VerEditPerfil() {
    document.getElementById('EditInfoPerfil').style.display = 'block';
}

// Función para tarjeta de Editar perfil
export function closeEditPerfil() {
    document.getElementById('EditInfoPerfil').style.display = 'none';
}

//Funcion de Iniciar Sesion
export function inicarSesion(method) {
    let user = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let info = { user, pass }
    //console.log(info)
    Ajax({
        url: "controller/login.php",
        method,
        param: info,
        fSuccess: (resp) => {
            //console.log(resp)
            if (resp.code == 200) {
                localStorage.clear()
                localStorage.setItem("idtk", resp.idToken)
                localStorage.setItem("Alias", resp.Alias)
                localStorage.setItem("Usuario", resp.Usuario)
                localStorage.setItem("id_User", resp.idUser)
                link("accesos.html?idtk=" + resp.idToken)
            } else {
                alert(resp.msg)
            }
        }
    })
}

export function validarToken() {
    if (localStorage.getItem("idtk")) link("accesos.html?idtk=" + localStorage.getItem("idtk"))
}