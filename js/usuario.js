import { Ajax } from "./tool.js";

export function registrarUsuario(method){

    //alert("OK se enviarán los datos del Formulario a travez del método "+method);
    let $form = document.getElementById("form-newaccount")
    let param= {
        nombres: $form.nombres.value,
        alias: $form.alias.value,
        email: $form.email.value,
        indicativo: $form.indicativo.value,
        celular: $form.celular.value,
        identificacion: $form.identificacion.value,
        perfil: $form.perfil.value,
        password: $form.password.value,
        documento: $form.documento.files[0]
    }
    
    Ajax({
        url: "controller/usuarios.php",
        method, 
        param, 
        fSuccess: (resp)=>{
            if(resp.code === 200){
                alert("La cuenta fue creada correctamente")
                link("index.html")
            }
            else {alert(resp.msg)}
        }
    })


}