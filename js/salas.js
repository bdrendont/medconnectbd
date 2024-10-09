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
                              <button class='btn btn-warning btn-sm sala_upd' data-id='${el.id_ubicacion}' data-nom='${el.nombre_ubicacion}' data-est='${el.estados}'>Editar</button>
                              <button class='btn btn-danger btn-sm sala_del' data-id='${el.id_ubicacion}'>Eliminar</button>
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