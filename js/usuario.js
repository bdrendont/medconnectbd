import { Ajax } from "./tool.js";

export function registrarUsuario(method){

    alert("OK vamos a enviar los Datos del Formulario a travez de metodo "+method);
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
    
    //const formData  = new FormData();
    //formData.append('file', document.getElementById("documento").files[0]);
    //for(const name in $form) {formData.append(name, $form[name]);}
    console.log(param);
    Ajax({
        url: "controller/usuarios.php",
        method, 
        param, 
        fSuccess: (resp)=>{
            console.log(resp)
        }
    })


}