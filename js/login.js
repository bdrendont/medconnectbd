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

// Función para ver tabla medicamentos
export function VerTbMedicamentos() {
    document.getElementById('ProgramadorMedicamentosPaciente').style.display = 'block';
}

// Modal agregar paciente
export function AgregarPaciente() {
    document.getElementById('NewPacienteModal').style.display = 'block';
} 

// Modal WhatsApp
export function EnlaceWhatsApp() {
    document.getElementById('WhatsAppModal').style.display = 'block';
} 

// Modal Observaciones medicación
export function ObervacionesMedicacion() {
    document.getElementById('Observaciones_medicacionsi').style.display = 'block';
} 

// Modal nuevo medicamento
export function NewMed() {
    document.getElementById('NewMedicamentoModal').style.display = 'block';
} 

export function VerObservaciones(obs) {
    document.getElementById('Consolidadodeobservaciones').style.display = 'block';
    Consolidadodeobservaciones.innerHTML=`<h5>Observaciones</h5><p>${obs}</p><button type="button" id="cancelEdit" class="btn btn-nosave">Cerrar</button>`;
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