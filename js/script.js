//Importaciones de Modulos
import { link, salida } from "./tool.js";
import { modalRecuperacionClave, VerObservaciones, inicarSesion, validarToken, modalNewLocation, VerPerfil, VerEditPerfil, VerTbMedicamentos, AgregarPaciente, EnlaceWhatsApp } from "./login.js";
import { registrarUsuario } from "./usuario.js";
import { perfil } from "./acceso.js";
import { listadoSala, modalEditarSala, modalEliminarSala, registrarUbicacion } from "./salas.js";
import { listadoPacientesInformes } from "./informes.js";
import { listadoPacientes } from "./pacientes.js";



//Inicio del JavaScript con el evento de carga principal
document.addEventListener('DOMContentLoaded', (e) => {
    //assignEventsToButtons();
    let path = location.pathname
    //console.log(path.substring(path.lastIndexOf("/")+1).length)
    if (path.substring(path.lastIndexOf("/") + 1).includes("index") || path.substring(path.lastIndexOf("/") + 1).length == "0") validarToken()
    if (path.includes("accesos")) perfil()
    if (path.includes("gestionsalas")) { perfil(); listadoSala(); }
    if (path.includes("gen_informes")) { perfil(); listadoPacientesInformes(); }
    if (path.includes("mis_salas")) perfil()
    if (path.includes("mis_salas")) {perfil(); listadoPacientes();}
    if (path.includes("notificaciones")) perfil()
});

// Evento click del DOM
document.addEventListener('click', (e) => {
    if (e.target.matches("a")) e.preventDefault()
    //console.log(e.target)
    if (e.target.matches(".btn-close-modal")) e.target.parentNode.parentNode.parentNode.style.display = 'none'
    if (e.target.matches("#forgotPasswordLink")) modalRecuperacionClave()
    if (e.target.matches("#newubi")) modalNewLocation()
    if (e.target.matches("#viewProfile")) VerPerfil()
    if (e.target.matches("#edit-profile")) VerEditPerfil()
    if (e.target.matches("#programarmed")) VerTbMedicamentos()
    if (e.target.matches("#observacionesPac")) VerObservaciones()
    if (e.target.matches("#programarmed")) VerTbMedicamentos(e.target.dataset.id)
    if (e.target.matches("#observacionesPac")) VerObservaciones(e.target.dataset.obs)
    if (e.target.matches("#cancelEdit")) e.target.closest('.confirmation-card').style.display = 'none';
    if (e.target.matches("#addPatientButton")) AgregarPaciente()
    if (e.target.matches("#WhatsApp")) EnlaceWhatsApp()
    if (e.target.matches("#nueva-cuenta")) link("newaccount.html") //Botón de ir a crear cuenta
    if (e.target.matches("#iniciar-cuenta")) link("index.html") //Botón de ir a iniciar sesión
    if (e.target.matches("#ir-gestion-salas")) link("gestionsalas.html") //Botón de ir a gestion de salas
    if (e.target.matches("#btnExit")) salida()
    
        

    // Abrir editar ubicación
    const button = e.target.closest(".sala_upd");
    if (button) modalEditarSala(button);

    //Abrir eliminar ubicación
const buttonEliminar = e.target.closest(".sala_del");
if (buttonEliminar) {
    modalEliminarSala(buttonEliminar);
};

    // Funcionalidad de quiénes somos
    if (e.target.matches("#open-sidebar")) {
        document.getElementById("sidebar").classList.add("active");
    }

    if (e.target.matches("#close-sidebar") || e.target.closest("#close-sidebar")) {
        document.getElementById("sidebar").classList.remove("active");
    }
});

//El evento Submit de los Formularion
document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.matches("#form-login")) inicarSesion("POST")
    if (e.target.matches("#form-newaccount")) registrarUsuario("PATCH")
    if (e.target.matches("#form-new-location")) registrarUbicacion('POST')
});