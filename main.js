//EJERCICIO DE PRE ENTREGA UNO
// Saludo
Swal.fire({
  title: '¡Hola!',
  text: 'Vamos a cotizar tu paquete',
  icon: 'info',
  confirmButtonText: 'Comenzar'
}).then(() => {
  // Ingresar tipo de tarjeta
  ingresoTarjeta().then((tipoTarjeta) => {
    console.log('Tipo de tarjeta seleccionado:', tipoTarjeta);
    
    // Llamar a la función cotizador() con el tipo de tarjeta como parámetro
    cotizador(tipoTarjeta);
  });
});

// Función para ingresar el tipo de tarjeta
function ingresoTarjeta() {
  return Swal.fire({
    title: 'Tipo de tarjeta',
    text: 'Ingresa el tipo de tarjeta con la que vas a pagar. ¿VISA o MASTERCARD?',
    input: 'text',
    inputPlaceholder: 'Escribe aquí...',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Enviar',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes ingresar un tipo de tarjeta';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      let tarjeta = result.value.toLowerCase();
      if (tarjeta === 'visa' || tarjeta === 'mastercard') {
        Swal.fire({
          title: 'Tipo de tarjeta válido',
          text: `El tipo de tarjeta ingresado es ${tarjeta.toUpperCase()}.`,
          icon: 'success'
        });
        return tarjeta;
      } else {
        Swal.fire({
          title: 'Tipo de tarjeta NO válida',
          text: 'Vuelve a intentarlo',
          icon: 'error'
        });
        return ingresoTarjeta(); // Vuelve a llamar a la función para ingresar el tipo de tarjeta
      }
    }
  });
}

// Función para cotizar la comisión por pago de tarjeta
function cotizador(tipoTarjeta) {
  Swal.fire({
    title: 'Cantidad a pagar',
    text: 'Ingresa la cantidad con la que te gustaría reservar',
    input: 'number',
    inputPlaceholder: 'Escribe aquí...',
    inputValidator: (value) => {
      if (!value) {
        return 'Debes ingresar una cantidad';
      }
    },
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Enviar'
  }).then((result) => {
    if (result.isConfirmed) {
      let cantidad = parseInt(Number(result.value));
      if (!isNaN(cantidad)) {
        // Realiza la verificación del tipo de tarjeta y muestra el resultado
        if (tipoTarjeta === "visa" || tipoTarjeta === "mastercard") {
          Swal.fire({
            title: 'Comisión adicional',
            text: `Vas a pagar la cantidad de $${(cantidad * 0.14).toFixed(2)} adicionales`,
            icon: 'success'
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Debes ingresar un número válido',
          icon: 'error'
        }).then(() => cotizador(tipoTarjeta)); // Vuelve a llamar a la función si se ingresa una cantidad inválida
      }
    }
  });
}
