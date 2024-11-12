import { Ajax } from "./tool.js"

export function listadoPacientesInformes(){

    let $tinfo = document.getElementById("tb_informes_pacientes"), item = "";
    $tinfo.children[1].innerHTML = `<tr><td colspan='2' class='text-center'><div class="spinner-border text-black" role="status"><span class="sr-only"></span></div><br>Procesando...</td></tr>`;
    
    Ajax({
        url: "controller/informes.php",
        method: "GET",
        fSuccess: (resp)=>{
            if(resp.code === 200){
                resp.data.forEach((el) => {
                    item += `<tr>
                              <td>${el.nombre_paciente}</td>
                              <td><button class="status-button active">Disponible</button></td>
                              <td><button class="btn btn-download" id="ir_informe"><i class="fas fa-arrow-right"></i></button></td>
                            </tr>`;
                });
                $tinfo.children[1].innerHTML = item;
            } else $tinfo.children[1].innerHTML = `<tr><td colspan='2' class='text-center'><div>${resp.msg}</div></td></tr>`;
        }
    }) 
}