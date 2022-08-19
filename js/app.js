//Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formularioEnviar = document.querySelector('#enviar-mail')

//Variables de campo
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
//Expresion regular para validar el MAIL
const expresionRegularMail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
        
//--------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------//

//Eventos
eventListeners()
function eventListeners(){
    //Cuando la app arranca
    //el evento DOMContentLoaded permite que se cargue primero todo el HTML antes de ejecutar el JS, siempre y cuando el contenido este dentro de esta funcion
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //Campos del formularioEnviar
    //El evento blur es disparado cuando un elemento ha perdido su foco. La diferencia principal entre este evento y focusout es que sólo el último se propaga (bubbles).
    email.addEventListener('blur', validarformularioEnviar)
    asunto.addEventListener('blur', validarformularioEnviar)
    mensaje.addEventListener('blur', validarformularioEnviar)

    //Enviar email
    formularioEnviar.addEventListener('submit', enviarEmail)

    //Resetea el formularioEnviar
    btnReset.addEventListener('click', resetearFormulario )
    
}

//--------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------//


//Funciones
function iniciarApp(){
   // deshabilitar el envio
   btnEnviar.disabled = true;
   btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarformularioEnviar(evento){

    if (evento.target.value.length > 0) {
        //Elimina los errores
        const erroR = document.querySelector('p.error')
       if (erroR) {
            erroR.remove()
       }

        evento.target.classList.remove('border', 'border-red-500')
        evento.target.classList.add('border', 'border-green-500')
    }else{
        evento.target.classList.remove('border', 'border-green-500')
        evento.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if (evento.target.type === 'email') {
        
        if (expresionRegularMail.test(evento.target.value)) {
            ///Elimina los errores
            const erroR = document.querySelector('p.error')
            if (erroR) {
                erroR.remove()
            }

            evento.target.classList.remove('border', 'border-red-500')
            evento.target.classList.add('border', 'border-green-500')
        }else{
            evento.target.classList.remove('border', 'border-green-500')
            evento.target.classList.add('border', 'border-red-500')
            mostrarError('El mail no es valido')
        }
    }

    if (expresionRegularMail.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')
    //console.log(mensajeError)
    const errores = document.querySelectorAll('.error')
    if (errores.length === 0) {
        formularioEnviar.appendChild(mensajeError)
    }
}

//Envia el email
function enviarEmail(evento){//Se suele poner el las funciones eventos para prevenir el comportamiento por defecto en el boton enviar
    evento.preventDefault()

    //Mostrar el spinner 
    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex'

    //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
    spinner.style.display = 'none' //oculta el spinner despues de 3 segundos

        //Mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p')
        parrafo.textContent = 'El mensaje se envio correctamente'
        parrafo.classList.add('my-10','font-bold', 'border-red-500', 'bg-green-500', 'text-white', 'p-2', 'text-center', 'uppercase')
   
        //Insertar parrafo de 'El mensaje se envio correctamente' antes del Spinner
        formularioEnviar.insertBefore(parrafo, spinner)

        setTimeout(() => {
            //Eliminar el mensaje de 'El mensaje se envio correctamente'
            parrafo.remove()

            resetearFormulario()
        }, 5000);
        
    }, 3000);
    
    // setInterval(() => {
    //     console.log('Esta funcion se ejecuta cada X segundos, dependiendo de cuanto le ponga, cada 1000 son un segundo')
    // }, 3000);
}

//Funcion que resetea el formularioEnviar
function resetearFormulario(){
    formularioEnviar.reset()

    iniciarApp()
}
