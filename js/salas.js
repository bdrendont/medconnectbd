import { Ajax } from "./tool.js"

export function listadoSala(){

    let $tinfo = document.getElementById("tb_ubicacion"), item = "";
    $tinfo.children[1].innerHTML = `<tr><td colspan='2' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;

    Ajax({
        url: "controller/salas.php",
        method: "GET",
        fSuccess: (resp)=>{
            if(resp.code === 200){
                resp.data.forEach((el) => {
                    item += `<tr>
                              <td>${el.nombre_ubicacion}</td>
                              <td> 
                              ${(el.estados==="Disponible" ? "<button class='status-button active'>Disponible</button>": "<button class='status-button inactive'>No disponible</button>")}
                              </td>
                              <td>
                              <div class='group-button'>
                              <button class="btn btn-primary btn-sm sala_upd" data-id="${el.id_ubicacion}" data-nom="${el.nombre_ubicacion}" data-est="${el.estados}"><i class="fas fa-pencil-alt"></i></button>
                              <button class='btn btn-danger btn-sm sala_del' data-id='${el.id_ubicacion}'><i class="fas fa-trash-alt"></i></button>

                              </div>
                              </td>
                            </tr>`;
                });
                $tinfo.children[1].innerHTML = item;
            } else $tinfo.children[1].innerHTML = `<tr><td colspan='2' class='text-center'><div>${resp.msg}</div></td></tr>`;
        }
    })
}


export function modalEditarSala(el){
    eid_sala.value=el.dataset.id
    enom_sala.value=el.dataset.nom
    eestado.value = el.dataset.est
    //eestado.
    EditLocationModal.style.display = 'block'
}

export function modalEliminarSala(el){
    EditLocationModal.style.display = 'block'
}

export function registrarUbicacion(method) {
    let $form = document.getElementById("form-new-location");

    // Crear un objeto param con los datos del formulario
    let param = {
        nombre_sala: $form.nombre_sala.value,
        disponibilidad: $form.disponibilidad.value // Asume que 1 es "Disponible" y 2 es "No disponible"
    };
    
    // Llamada AJAX para enviar los datos al servidor
    Ajax({
        url: "controller/salas.php",  // Asegúrate de que esta URL sea correcta
        method, 
        param, 
        fSuccess: (resp) => {
            if (resp.code === 200) {
                alert("La nueva ubicación fue registrada correctamente");
                // Aquí podrías cerrar el modal o redirigir a otra página si es necesario
                // link("index.html");
            } else {
                alert(resp.msg); // Mostrar mensaje de error si la respuesta no es exitosa
            }
        }
    });
}


