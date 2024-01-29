// // PRIMERA PARTE DEL CÓDIGO TRABAJADO EN PRE ENTREGA UNO.

// //PEDIR TIPO DE TARJETA PARA PAGO
//     //Saludo
//     let saludo = alert("¡Hola, vamos a cotizar tu paquete!");

//     // Ingrese su tipo de plástico
//     function ingresoTarjeta() {
//         while (true) {
//             let tarjeta = prompt("Ingresa el tipo de tarjeta con la que vas a pagar. ¿VISA o MASTERCARD?").toLowerCase();
    
//             // Sólo puede ingresar visa o mastercard.
//             if (tarjeta === "visa") {
//                 alert("El tipo de tarjeta ingresado es VISA.");
//                 return "visa"; // Devuelve el tipo de tarjeta
//             } else if (tarjeta === "mastercard") {
//                 alert("El tipo de tarjeta ingresado es MASTERCARD.");
//                 return "mastercard"; // Devuelve el tipo de tarjeta
//             } else {
//                 alert("Tipo de tarjeta NO válida. Vuelve a intentarlo");
//             }
//         }
//     }
    
//     //PAGO
//     // Ingresar cantidad a pagar con TdC.
//     function cotizador() {
//         let tipoTarjeta = ingresoTarjeta(); // Se obtiene el tipo de tarjeta desde la función anterior.
//         //bucle
//         while (true) {
//             let cantidad = parseInt(Number(prompt("Ingresa la cantidad con la que vas a pagar"))); //Agrego un parseInt para redondear mis decimales en el resultado.
    
//             // Realiza la verificación del tipo de tarjeta y muestra el resultado
//             if (tipoTarjeta === "visa" || tipoTarjeta === "mastercard") {
//                 alert("Vas a pagar la cantidad de" + " $" + cantidad * 0.14 + " " + "adicional");
//                 break;
//             }
//         }
//     }
    
//     cotizador();


//     //SEGUNDA PARTE DEL CÓDIGO. (PRE ENTREGA DOS.)


// Objeto para manejar los tipos de eventos y paquetes
let eventos = [
    { nombre: "Boda", paquetes: ["GOLD", "SILVER", "BRONZE"] },
    { nombre: "XV años", paquetes: ["GOLD", "SILVER", "BRONZE"] },
    { nombre: "Evento infantil", paquetes: ["GOLD", "SILVER", "BRONZE"] },
    { nombre: "Sesión fotográfica", paquetes: ["GOLD", "SILVER", "BRONZE"] }
];

// Función para mostrar un mensaje de bienvenida y solicitar el tipo de tarjeta
function ingresoTarjeta() {
    while (true) {
        let tarjeta = prompt("Ingresa el tipo de tarjeta con la que vas a pagar. ¿VISA o MASTERCARD?").toLowerCase();

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

// Función para obtener el porcentaje de comisión según el tipo de tarjeta
function obtenerPorcentajeComision(tipoTarjeta) {
    if (tipoTarjeta === "visa") {
        return 0.14; // Porcentaje de comisión para tarjetas Visa
    } else if (tipoTarjeta === "mastercard") {
        return 0.15; // Porcentaje de comisión para tarjetas Mastercard
    } else {
        return 0; // Porcentaje de comisión por defecto si el tipo de tarjeta no es válido
    }
}

// Función para calcular la comisión y mostrarla al usuario
function calcularComision() {
    let tipoTarjeta = ingresoTarjeta(); // Obtener el tipo de tarjeta
    let porcentajeComision = obtenerPorcentajeComision(tipoTarjeta); // Obtener el porcentaje de comisión
    let cantidad = parseInt(Number(prompt("Ingresa la cantidad con la que vas a pagar"))); // Solicitar la cantidad

    if (porcentajeComision > 0) {
        let comision = cantidad * porcentajeComision;
        alert("Por pagar con " + tipoTarjeta.toUpperCase() + ", deberás pagar una comisión adicional del " + (porcentajeComision * 100) + "%, que equivale a $" + comision.toFixed(2));
    } else {
        alert("Tipo de tarjeta no válida. No se aplicará comisión.");
    }

    // Continuación del flujo: solicitar información sobre el evento
    mostrarTiposEventos();
}

// Función para mostrar los tipos de eventos disponibles y solicitar al usuario que seleccione uno
function mostrarTiposEventos() {
    let tiposEventos = eventos.map(evento => evento.nombre).join(", ");
    alert("Estos son los tipos de eventos que manejamos: " + tiposEventos);
    let tipoEvento = prompt("¿Qué evento es de tu interés?");
    mostrarPaquetes(tipoEvento);
}

// Función para mostrar los paquetes disponibles para un tipo de evento y solicitar al usuario que seleccione uno
function mostrarPaquetes(tipoEvento) {
    let eventoSeleccionado = eventos.find(evento => evento.nombre === tipoEvento);
    if (eventoSeleccionado) {
        let paquetesDisponibles = eventoSeleccionado.paquetes.join(", ");
        let paqueteSeleccionado = prompt("Selecciona el paquete de tu interés: " + paquetesDisponibles);
        solicitarMesEvento(paqueteSeleccionado);
    } else {
        alert("Tipo de evento no válido. Vuelve a intentarlo.");
        mostrarTiposEventos(); // Volver a mostrar los tipos de eventos si el usuario selecciona uno no válido
    }
}

// Función para solicitar al usuario el mes del evento
function solicitarMesEvento(paqueteSeleccionado) {
    let mesEvento = prompt("Ingresa el mes de tu evento:");
    mostrarResumen(paqueteSeleccionado, mesEvento);
}

// Función para mostrar un resumen de la selección del usuario
function mostrarResumen(paqueteSeleccionado, mesEvento) {
    alert("Resumen:\nTipo de paquete seleccionado: " + paqueteSeleccionado + "\nMes del evento: ")}

    