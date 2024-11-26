import { Ajax } from "./tool.js";

export function listadoPacientes(){
    let $div = div_pacientes, item="";

    Ajax({
        url: "controller/pacientes.php",
        method: "GET",
        fSuccess: (resp)=>{
            if(resp.code === 200){
                let i=1;
                resp.data.forEach((el) => {
                    item += `<div class="col-md-3 mb-3">
    <div class="card position-relative">
        <div class="card-body text-center">
            <!-- Botón deslizable de activo/inactivo al tope de la tarjeta -->
            <div class="d-flex justify-content-end position-absolute" style="top: 10px; right: 10px;">
                <label class="switch">
                    <input type="checkbox" class="toggle-status" id="status-${el.id_paciente}" ${el.activo ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </div>

            <h6 class="card-title"><i class="fas fa-user-injured"></i> ${el.nombre_paciente}</h6> <!-- Ícono de paciente -->
            <p class="card-text">${el.ubicacion}</p>
            <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-custom me-2" id="programarmed" title="Programador" data-id="${el.id_paciente}">
                    <i class="fas fa-hourglass-half"></i>
                </a> 
                <button class="btn btn-custom" title="Datos de ingreso" id="observacionesPac" data-obs="${el.observaciones}">
                    <i class="fas fa-file-alt"></i>
                </button>
            </div>
        </div>
    </div>
</div>`;
i++;

                });
                $div.innerHTML = item;
            } else $div.innerHTML = `<tr><td colspan='2' class='text-center'><div>${resp.msg}</div></td></tr>`;
        }
    })
}

// Función para registrar paciente
export function registrarPaciente(method) {
    let $form = document.getElementById("form-new-paciente");

    let param = {
        nombre_paciente: $form.nombre_paciente.value,
        ubicacion: $form.ubicacion.value,
        datos_clinicos: $form.datos_clinicos.value
    };

    Ajax({
        url: "controller/pacientes.php",
        method,
        param,
        fSuccess: (resp) => {
            if (resp.code === 200) {
                alert("El nuevo paciente se agregó correctamente");
                listadoPacientes();
            } else {
                alert(resp.msg);
            }
            $form.parentNode.style.display = 'none';
        }
    });
}