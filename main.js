// PRIMERA PARTE DEL CÓDIGO TRABAJADO EN PRE ENTREGA UNO.

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
            let cantidad = parseInt(Number(prompt("Ingresa la cantidad con la que vas a pagar"))); //Agrego un parseInt para redondear mis decimales en el resultado.
    
            // Realiza la verificación del tipo de tarjeta y muestra el resultado
            if (tipoTarjeta === "visa" || tipoTarjeta === "mastercard") {
                alert("Vas a pagar la cantidad de" + " $" + cantidad * 0.14 + " " + "adicional");
                break;
            }
        }
    }
    
    cotizador();


    //SEGUNDA PARTE DEL CÓDIGO. (PRE ENTREGA DOS.)

    