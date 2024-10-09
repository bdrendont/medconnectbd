//Importaciones de Modulos
import { link, salida } from "./tool.js";
import { modalRecuperacionClave, closeModalResetPass, inicarSesion, validarToken, modalNewLocation, closeNewLocation, VerPerfil, closePerfil, VerEditPerfil } from "./login.js";
import { registrarUsuario } from "./usuario.js";
import { perfil } from "./acceso.js";
import { listadoSala, modalEditarSala } from "./salas.js";
import { listadoPacientesInformes } from "./informes.js";



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

    if (e.target.matches("#nueva-cuenta")) link("newaccount.html") //Botón de ir a crear cuenta
    if (e.target.matches("#iniciar-cuenta")) link("index.html") //Botón de ir a iniciar sesión
    if (e.target.matches("#ir-gestion-salas")) link("gestionsalas.html") //Botón de ir a gestion de salas
    if (e.target.matches("#btnExit")) salida()
    if(e.target.matches(".sala_upd")) modalEditarSala(e.target)
    if(e.target.matches(".sala_del")) modalEliminarSala(e.target)
});

//El evento Submit de los Formularion
document.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.matches("#form-login")) inicarSesion("POST")
    if (e.target.matches("#form-newaccount")) registrarUsuario("PATCH")

});

////////////////////////////////////////////////////////////////////
/*
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const navLink = document.querySelector('.nav-link[href="#"]');

    // Mostrar barra flotante al hacer clic en el enlace
    navLink.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.style.right = '0';
    });

    // Ocultar barra flotante al hacer clic en el botón de cerrar
    closeSidebarBtn.addEventListener('click', function() {
        sidebar.style.right = '-300px'; // Oculta la barra flotante
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Abrir la tarjeta del perfil
    const viewProfileBtn = document.getElementById('viewProfile');
    const profileCard = document.getElementById('profileCard');
    const closeProfileBtn = document.getElementById('closeProfile');

    if (viewProfileBtn && profileCard && closeProfileBtn) {
        viewProfileBtn.addEventListener('click', function (e) {
            e.preventDefault();
            profileCard.style.display = 'block';
        });

        closeProfileBtn.addEventListener('click', function () {
            profileCard.style.display = 'none';
        });
    }
});

// Mostrar la ventana de confirmación
function showConfirmation() {
    document.getElementById('logoutConfirmation').style.display = 'block';
}

// Cerrar la ventana de confirmación
function closeConfirmation() {
    document.getElementById('logoutConfirmation').style.display = 'none';
}

// Asignar el evento al botón de cerrar sesión en la barra de navegación
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.dropdown-item.text-danger');
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        showConfirmation();
    });

    document.querySelector('.btn-cancel').addEventListener('click', function() {
        closeConfirmation(); // Cierra la ventana de confirmación
    });

    document.querySelector('.btn-confirm').addEventListener('click', function() {
        window.location.href = 'index.html'; // Redirige al usuario a la página de inicio
    });
});

//Edición de perfil
document.addEventListener('DOMContentLoaded', () => {
    const editProfileButton = document.getElementById('editProfileButton');
    const profileEdit = document.getElementById('profileEdit');
    const profileInfo = document.getElementById('profileInfo');
    const cancelEdit = document.getElementById('cancelEdit');
    
    editProfileButton.addEventListener('click', () => {
        profileInfo.style.display = 'none';
        profileEdit.style.display = 'block';
    });

    cancelEdit.addEventListener('click', () => {
        profileEdit.style.display = 'none';
        profileInfo.style.display = 'block';
    });
});
//Desaparece botón de editar
document.getElementById('editProfileButton').addEventListener('click', function() {
    document.getElementById('profileInfo').style.display = 'none'; // Oculta la información del perfil
    document.getElementById('editProfileButton').style.display = 'none'; // Oculta el botón de editar
    document.getElementById('profileEdit').style.display = 'block'; // Muestra el formulario de edición
});

document.getElementById('cancelEdit').addEventListener('click', function() {
    document.getElementById('profileInfo').style.display = 'block'; // Muestra la información del perfil
    document.getElementById('editProfileButton').style.display = 'block'; // Muestra el botón de editar
    document.getElementById('profileEdit').style.display = 'none'; // Oculta el formulario de edición
});


// Datos de ejemplo para una nueva tarjeta
const examplePatient = {
    name: "Paciente Nuevo",
    location: "Ubicación Nueva",
    document: "Documento Nuevo",
    age: 40,
    caregiver: "Encargado Nuevo",
    notes: "Observaciones Nuevas",
    medication: ["Medicamento Nuevo - Dosis y frecuencia"]
};

let cardCount = 0;
const maxCards = 9; // Máximo número de tarjetas permitidas

function createCard(patient, index) {
    return `
        <div class="col-md-3 mb-4" data-index="${index}">
            <div class="paciente-card">
                <div class="paciente-card-body">
                    <div class="paciente-card-header">
                        <div class="paciente-icon">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <h5 class="paciente-card-title">${patient.name}</h5>
                    </div>
                    <p class="paciente-card-text"><strong>Ubicación:</strong> ${patient.location}</p>
                    <p class="paciente-card-text"><strong>Documento:</strong> ${patient.document}</p>
                    <p class="paciente-card-text"><strong>Edad:</strong> ${patient.age}</p>
                    <p class="paciente-card-text"><strong>Encargado:</strong> ${patient.caregiver}</p>
                    <div class="paciente-card-observaciones">
                        <strong>Observaciones:</strong>
                        <div class="observaciones-recuadro">
                            <p>${patient.notes}</p>
                        </div>
                    </div>
                    <div class="paciente-card-medicacion">
                        <strong>Medicación:</strong>
                        <ul>
                            ${patient.medication.map(med => `<li>${med}</li>`).join('')}
                        </ul>
                    </div>
                    <!-- Contenedor para los botones alineados verticalmente -->
                    <div class="btn-group-vertical">
                        <a href="#" class="btn btn-edit-info">Editar información básica de paciente</a>
                        <a href="#" class="btn btn-edit-info">Programar medicación</a>
                        <button class="btn btn-delete" onclick="deleteCard(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.getElementById('add-card-button').addEventListener('click', () => {
    const cardContainer = document.getElementById('card-container');
    
    // Verificar si el número de tarjetas ha alcanzado el límite
    if (cardCount < maxCards) {
        // Crear y agregar una nueva tarjeta
        cardContainer.innerHTML += createCard(examplePatient, cardCount);

        // Incrementar el contador de tarjetas
        cardCount++;
        
        // Ocultar el botón si se han creado 9 tarjetas
        if (cardCount >= maxCards) {
            document.getElementById('add-card-button').style.display = 'none';
        }
        
        // Asignar eventos a los nuevos botones
        assignEventsToButtons();
    } else {
        alert("Se ha alcanzado el límite máximo de 9 tarjetas.");
    }
});

function deleteCard(index) {
    const cardContainer = document.getElementById('card-container');
    const cards = cardContainer.getElementsByClassName('col-md-3');
    
    // Elimina la tarjeta correspondiente
    if (cards[index]) {
        cardContainer.removeChild(cards[index]);
        
        // Actualiza el contador y muestra el botón si se han eliminado tarjetas
        cardCount--;
        if (cardCount < maxCards) {
            document.getElementById('add-card-button').style.display = 'inline-block';
        }
    }
}

function assignEventsToButtons() {
    // Botones de editar
    document.querySelectorAll('.btn-edit-info').forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.col-md-3');
            const cardIndex = card.getAttribute('data-index');
            const currentObservations = card.querySelector('.paciente-card-observaciones .observaciones-recuadro p').textContent;
            showEditModal(cardIndex, currentObservations);
        });
    });

    // Botones de eliminar
    document.querySelectorAll('.btn-delete').forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.col-md-3');
            const cardIndex = card.getAttribute('data-index');
            deleteCard(cardIndex);
        });
    });

    // Botón "Cancelar" en el modal de edición
    const cancelButton = document.querySelector('.btn-edit-cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            hideEditModal();
        });
    }
}

// Variables globales para el modal y el formulario
const modal = document.getElementById('modal-edit-observations');
const closeModal = document.querySelector('.btn-edit-cancel');
const observationsInput = document.getElementById('observations-input');
const editForm = document.getElementById('edit-observations-form');
let currentCardIndex = null;

// Función para mostrar el modal de edición
function showEditModal(index, currentObservations) {
    currentCardIndex = index;
    observationsInput.value = currentObservations;
    modal.style.display = 'block';
}

// Función para ocultar el modal de edición
function hideEditModal() {
    modal.style.display = 'none';
}

// Evento para cerrar el modal al hacer clic en el botón de cancelar
closeModal.addEventListener('click', hideEditModal);

// Evento para guardar los cambios en el formulario
editForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

// Actualizar las observaciones en la tarjeta
function updateCardObservations(index, newObservations) {
    const card = document.querySelector(`.col-md-3[data-index="${index}"]`);
    const observationsElement = card.querySelector('.paciente-card-observaciones .observaciones-recuadro p');
    observationsElement.textContent = newObservations;
}
*/


