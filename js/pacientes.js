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
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h6 class="card-title"><i class="fas fa-user-injured"></i> ${el.nombre_paciente}</h6> <!-- Ícono de paciente -->
                                        <p class="card-text">${el.ubicacion}</p>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-custom me-2" id="programarmed" title="Programar medicación" data-id="${el.id_paciente}">
                                                <i class="fas fa-hourglass-half"></i>
                                            </a> 
                                            <button class="btn btn-custom" title="Agregar observaciones" id="observacionesPac" data-obs="${el.observaciones}">
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