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
                              ${(el.estados==="Disponible" ? "<button class='status-button active'>Activo</button>": "<button class='status-button inactive'>Inactivo</button>")}
                              </td>
                            </tr>`;
                });
                $tinfo.children[1].innerHTML = item;
            } else $tinfo.children[1].innerHTML = `<tr><td colspan='2' class='text-center'><div>${resp.msg}</div></td></tr>`;
        }
    })
}