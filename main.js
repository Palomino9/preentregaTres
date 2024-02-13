//EJERCICIO DE PRE ENTREGA UNO
//PEDIR TIPO DE TARJETA PARA PAGO
    //Saludo
    let saludo = alert("¡Hola, vamos a cotizar tu paquete!");

    // Ingrese su tipo de plástico
    function ingresoTarjeta() {
        while (true) {
            let tarjeta = prompt("Ingresa el tipo de tarjeta con la que vas a pagar. ¿VISA o MASTERCARD?").toLowerCase();
    
            // Sólo puede ingresar visa o mastercard.
            if (tarjeta === "visa") {
                alert("El tipo de tarjeta ingresado es VISA.");
                return "visa"; // Devuelve el tipo de tarjeta
            } else if (tarjeta === "mastercard") {
                alert("El tipo de tarjeta ingresado es MASTERCARD.");
                return "mastercard"; // Devuelve el tipo de tarjeta
            } else {
                alert("Tipo de tarjeta NO válida. Vuelve a intentarlo");
            }
        }
    }
    
    //PAGO
    // Ingresar cantidad a pagar con TdC.
    function cotizador() {
        let tipoTarjeta = ingresoTarjeta(); // Se obtiene el tipo de tarjeta desde la función anterior.
        //bucle
        while (true) {
            let cantidad = parseInt(Number(prompt("Ingresa la cantidad con la que te gustaría reservar")));
    
            // Realiza la verificación del tipo de tarjeta y muestra el resultado
            if (tipoTarjeta === "visa" || tipoTarjeta === "mastercard") {
                alert("Vas a pagar la cantidad de" + " $" + cantidad * 0.14 + " " + "adicional");
                break;
            }
        }
    }
    
    cotizador();


//EJERCICIO DE PREENTREGA 2
//OBJETO
let eventos = [
    { nombre: "Boda", paquetes: ["GOLD", "SILVER", "BRONZE"] },
    { nombre: "XV años", paquetes: ["GOLD", "SILVER", "BRONZE"] },
    { nombre: "Evento infantil", paquetes: ["GOLD", "SILVER", "BRONZE"] },
    { nombre: "Sesión fotográfica", paquetes: ["GOLD", "SILVER", "BRONZE"] }
];

// Solicitar el nombre del usuario
function solicitarNombreUsuario() {
    return prompt("Ingresa tu nombre:");
}

// Mostrar los tipos de eventos disponibles
function mostrarTiposEventos() {
    let tiposEventos = eventos.map(evento => evento.nombre).join(", ");
    alert("Estos son los tipos de eventos que manejamos: " + tiposEventos);
}

// Solicitar al usuario el evento de su interés
function solicitarEventoInteres() {
    let tipoEvento = prompt("¿Qué evento es de tu interés?");
    tipoEvento = tipoEvento.toLowerCase();
    return tipoEvento;
}


// Función para mostrar los paquetes disponibles para un tipo de evento
function mostrarPaquetesDisponibles(tipoEvento) {
    tipoEvento = tipoEvento.toLowerCase(); 
    let eventoSeleccionado = eventos.find(evento => evento.nombre.toLowerCase() === tipoEvento);
    if (eventoSeleccionado) {
        let paquetesDisponibles = eventoSeleccionado.paquetes.join(" | ");
        let paqueteSeleccionado = prompt("Selecciona el paquete de tu interés: " + paquetesDisponibles);
        return paqueteSeleccionado;
    } else {
        alert("Tipo de evento no válido. Vuelve a intentarlo.");
        return mostrarPaquetesDisponibles(solicitarEventoInteres());
    }
}

// Función para solicitar al usuario el mes de su evento
function solicitarMesEvento() {
    return prompt("Ingresa el mes de tu evento:");
}

// Función para mostrar un resumen de la selección del usuario
function mostrarResumen(nombreUsuario, tipoEvento, paqueteSeleccionado, mesEvento) {
    alert("Resumen:\nNombre: " + nombreUsuario + "\nEvento: " + tipoEvento + "\nPaquete: " + paqueteSeleccionado + "\nMes del evento: " + mesEvento);
}


//EJERCICIO PRE ENTREGA 3

// Función para mostrar el mensaje de agradecimiento y el resumen del usuario en el HTML
function mostrarAgradecimiento(nombreUsuario, tipoEvento, paqueteSeleccionado, mesEvento) {
    // Uso de DOM para mostrar el mensaje de agradecimiento y el resumen del usuario
    document.getElementById("nombreUsuario").innerText = nombreUsuario;
    document.getElementById("tipoEvento").innerText = tipoEvento;
    document.getElementById("paqueteSeleccionado").innerText = paqueteSeleccionado;
    document.getElementById("mesEvento").innerText = mesEvento;
    document.getElementById("resumenUsuario").style.display = "block";

    //  Datos del usuario en formato JSON para almacenamiento de información
    let datosUsuario = {
        nombre: nombreUsuario,
        evento: tipoEvento,
        paquete: paqueteSeleccionado,
        mes: mesEvento
    };

    // Convertimos JSON a string
    let datosUsuarioString = JSON.stringify(datosUsuario);

    // Almacenamiento de los datos del usuario en localStorage
    localStorage.setItem("datosUsuario", datosUsuarioString);
}

// Activación del botón de enviar
document.getElementById("btnEnviar").addEventListener("click", enviarSeleccion);

// Función para manejar el evento de clic en el botón "Enviar"
function enviarSeleccion() {
    alert("Revisa tu correo electrónico.");

    // Finalizar el proceso
    return;
}

// Proceso principal
function procesoSeleccionEvento() {
    let nombreUsuario = solicitarNombreUsuario();
    mostrarTiposEventos();
    let tipoEvento = solicitarEventoInteres();
    let paqueteSeleccionado = mostrarPaquetesDisponibles(tipoEvento);
    let mesEvento = solicitarMesEvento();
    mostrarAgradecimiento(nombreUsuario, tipoEvento, paqueteSeleccionado, mesEvento);
}

// Ejecutar el proceso principal
procesoSeleccionEvento();