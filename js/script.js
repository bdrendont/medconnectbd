//Importaciones de Modulos
import { link, salida } from "./tool.js";
import { modalRecuperacionClave, VerObservaciones, inicarSesion, validarToken, modalNewLocation, VerPerfil, VerEditPerfil, VerTbMedicamentos, AgregarPaciente, EnlaceWhatsApp, ObervacionesMedicacion, NewMed} from "./login.js";
import { registrarUsuario } from "./usuario.js";
import { perfil } from "./acceso.js";
import { listadoSala, modalEditarSala, modalEliminarSala, registrarUbicacion , actualizarUbicacion, eliminarUbicacion} from "./salas.js";
import { listadoPacientesInformes } from "./informes.js";
import { listadoPacientes, registrarPaciente } from "./pacientes.js";



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


        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                const filter = this.value.toLowerCase();
                const rows = document.querySelectorAll("#tb_informes_pacientes tbody tr");
    
                rows.forEach(row => {
                    const name = row.cells[0].textContent.toLowerCase();
    
                    if (name.includes(filter)) {
                        row.style.display = ""; 
                    } else {
                        row.style.display = "none";
                    }
                });
            });
        }
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
    if (e.target.closest("#WhatsApp")) EnlaceWhatsApp()
    if (e.target.closest("#Nuevo_med")) NewMed()
    if (e.target.closest("#si_aplicacion")) ObervacionesMedicacion()
    if (e.target.closest("#no_aplicacion")) ObervacionesMedicacion()
    if (e.target.closest("#ir_informe")) {window.open("informes.html", "_blank"); }
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
    if (e.target.matches("#form-new-paciente")) registrarPaciente('POST')
    if (e.target.matches("#fe_sala")) actualizarUbicacion("PUT")
    if (e.target.matches("#del_sala")) eliminarUbicacion("DELETE")
});

// Función de agregar medicamento
const agregarMedicamentoBtn = document.getElementById('AgregarMedicamento');
const medicamentosTable = document.getElementById('medicamentosTable').getElementsByTagName('tbody')[0];

agregarMedicamentoBtn.addEventListener('click', function() {
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td><input type="text" class="form-control" placeholder="Nombre del medicamento"></td>
        <td><input type="text" class="form-control" placeholder="Vía de suministro"></td>
        <td><input type="text" class="form-control" placeholder="Dosis"></td>
        <td><input type="number" class="form-control" placeholder="Cantidad de aplicaciones"></td>
        <td><input type="number" class="form-control" placeholder="Intervalo en horas"></td>
    `;

    medicamentosTable.appendChild(nuevaFila);

    const botonFila = document.createElement('tr');
    const botonCelda = document.createElement('td');
    botonCelda.colSpan = 5; 
    botonCelda.classList.add("text-center"); 

    botonCelda.innerHTML = `
        <button class="btn btn-primary guardarFilaBtn"><i class="fas fa-check"></i></button>
        <button class="btn btn-secondary cancelarFilaBtn"><i class="fas fa-times"></i></button>
    `;
    botonFila.appendChild(botonCelda);

    medicamentosTable.appendChild(botonFila);

    botonCelda.querySelector('.cancelarFilaBtn').addEventListener('click', function() {
        medicamentosTable.removeChild(nuevaFila); 
        medicamentosTable.removeChild(botonFila); 
    });
});









