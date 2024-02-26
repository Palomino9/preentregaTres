// Definir tipo de eventos a nivel global
let eventos = [
  { nombre: "Boda", paquetes: ["GOLD", "SILVER", "BRONZE"] },
  { nombre: "XV años", paquetes: ["GOLD", "SILVER", "BRONZE"] },
  { nombre: "Evento infantil", paquetes: ["GOLD", "SILVER", "BRONZE"] },
  { nombre: "Sesión fotográfica", paquetes: ["GOLD", "SILVER", "BRONZE"] }
];

// Saludo inicial
Swal.fire({
  title: '¡Hola!',
  text: 'Vamos a cotizar tu paquete',
  icon: 'success',
  confirmButtonText: '¡Vamos!'
}).then(() => {
  // Ingresar tipo de tarjeta
  ingresoTarjeta().then(() => {
      // Cotizar
      cotizador().then(() => {
          // Mostrar comisión
          mostrarComision().then(() => {
              // Solicitar nombre del usuario
              solicitarNombreUsuario().then((nombreUsuario) => {
                  // Mostrar tipos de eventos disponibles
                  mostrarTiposEventos().then(() => {
                      // Solicitar tipo de evento de interés
                      solicitarEventoInteres().then((tipoEvento) => {
                          // Mostrar paquetes disponibles para el tipo de evento seleccionado
                          mostrarPaquetesDisponibles(tipoEvento).then((paqueteSeleccionado) => {
                              // Solicitar mes del evento
                              solicitarMesEvento().then((mesEvento) => {
                                  // Mostrar resumen de la selección del usuario
                                  mostrarResumen(nombreUsuario, tipoEvento, paqueteSeleccionado, mesEvento);
                              });
                          });
                      });
                  });
              });
          });
      });
  });
}).catch(error => {
  console.error(error);
});

// Ingresar tipo de tarjeta
function ingresoTarjeta() {
  return Swal.fire({
      title: 'Tipo de tarjeta',
      text: 'Ingresa el tipo de tarjeta con la que vas a pagar: VISA o MASTERCARD',
      input: 'text',
      inputPlaceholder: 'Mi tipo de tarjeta es...',
      showCancelButton: true,
      confirmButtonText: 'Enviar'
  }).then((result) => {
      if (result.isConfirmed) {
          let tarjeta = result.value.toLowerCase();
          if (tarjeta === "visa" || tarjeta === "mastercard") {
              return;
          } else {
              return ingresoTarjeta();
          }
      }
  });
}

// Cotizar
function cotizador() {
    return Swal.fire({
        title: 'Cotizador',
        text: 'Ingresa la cantidad con la que te gustaría reservar:',
        input: 'text',
        inputPlaceholder: 'Reservaría con...',
        showCancelButton: true,
        confirmButtonText: 'Enviar'
    }).then((result) => {
        if (result.isConfirmed) {
            let cantidad = parseInt(result.value);
            if (!isNaN(cantidad)) {
                let comision = cantidad * 0.14;
                return mostrarComision(comision); 
            } else {
                return cotizador();
            }
        }
    });
  }
  
  // Mostrar comisión
  function mostrarComision(comision) {
    return new Promise((resolve) => {
      if (!isNaN(comision)) {
        Swal.fire({
            title: 'Comisión',
            text: `Vas a pagar una comisión adicional de $${comision.toFixed(2)}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => resolve(comision)); 
      } else {
        resolve(0); 
      }
    });
  }
  
  
  // Solicitar nombre del usuario
  function solicitarNombreUsuario() {
    return Swal.fire({
        title: 'Nombre del usuario',
        text: 'Ingresa tu nombre:',
        input: 'text',
        inputPlaceholder: 'Mi nombre es...',
        showCancelButton: true,
        confirmButtonText: 'Enviar'
    }).then((result) => {
        if (result.isConfirmed) {
            return result.value;
        }
    });
  }
  



// Mostrar los tipos de eventos disponibles
function mostrarTiposEventos() {
  let tiposEventos = eventos.map(evento => evento.nombre).join(", ");
  return Swal.fire({
      title: 'Tipos de eventos disponibles:',
      text: 'Estos son los tipos de eventos que manejamos: ' + tiposEventos,
      icon: 'success',
      confirmButtonText: 'Ok'
  });
}

// Solicitar al usuario el evento de su interés
function solicitarEventoInteres() {
  return Swal.fire({
      title: 'Tipo de evento',
      text: '¿Qué evento es de tu interés?',
      input: 'text',
      inputPlaceholder: '¿Boda, XV años, Evento infantil, Sesión fotográfica?',
      showCancelButton: true,
      confirmButtonText: 'Enviar'
  }).then((result) => {
      if (result.isConfirmed) {
          let tipoEvento = result.value.toLowerCase();
          return tipoEvento;
      }
  });
}

// Mostrar los paquetes disponibles para un tipo de evento
function mostrarPaquetesDisponibles(tipoEvento) {
  tipoEvento = tipoEvento.toLowerCase();
  let eventoSeleccionado = eventos.find(evento => evento.nombre.toLowerCase() === tipoEvento);
  if (eventoSeleccionado) {
      let paquetesDisponibles = eventoSeleccionado.paquetes.join(" | ");
      return Swal.fire({
          title: 'Paquetes disponibles',
          text: 'Selecciona el paquete de tu interés:',
          input: 'select',
          inputOptions: {
              ...eventoSeleccionado.paquetes.reduce((acc, curr) => ({ ...acc, [curr]: curr }), {})
          },
          showCancelButton: true,
          confirmButtonText: 'Enviar'
      }).then((result) => {
          if (result.isConfirmed) {
              return result.value;
          }
      });
  } else {
      Swal.fire({
          title: 'Tipo de evento no válido',
          text: 'Vuelve a intentarlo.',
          icon: 'error'
      });
      return solicitarEventoInteres().then((tipoEvento) => {
          return mostrarPaquetesDisponibles(tipoEvento);
      });
  }
}

// Función para solicitar al usuario el mes de su evento
function solicitarMesEvento() {
  return Swal.fire({
      title: 'Mes del evento',
      text: 'Ingresa el mes de tu evento:',
      input: 'text',
      inputPlaceholder: 'Mi evento será en el mes de...',
      showCancelButton: true,
      confirmButtonText: 'Enviar'
  }).then((result) => {
      if (result.isConfirmed) {
          return result.value;
      }
  });
}

// Función para guardar en localStorage
function guardarEnLocalStorage(clave, valor) {
    let eventosGuardados = JSON.parse(localStorage.getItem(clave)) || [];
    eventosGuardados.push(JSON.parse(valor)); // Convertir valor a objeto JSON antes de agregarlo
    localStorage.setItem(clave, JSON.stringify(eventosGuardados));
}

  
 // Función para mostrar un resumen de la selección del usuario
function mostrarResumen(nombreUsuario, tipoEvento, paqueteSeleccionado, mesEvento) {
    Swal.fire({
        title: '¿Son correctos los datos de tu evento?',
        html: `Nombre: ${nombreUsuario}<br>Evento: ${tipoEvento}<br>Paquete: ${paqueteSeleccionado}<br>Mes del evento: ${mesEvento}`,
        icon: 'info',
        confirmButtonText: 'Mis datos son correctos'
    }).then(() => {
        
        // Guardar datos en localStorage
        const evento = {
            nombreUsuario: nombreUsuario,
            tipoEvento: tipoEvento,
            paqueteSeleccionado: paqueteSeleccionado,
            mesEvento: mesEvento
        };
        guardarEnLocalStorage('evento', JSON.stringify(evento));

        // Mostrar el mensaje de agradecimiento
        Swal.fire({
            title: '¡Gracias!',
            text: 'Nos pondremos en contacto en menos de 24 horas. Por favor revisa tu correo.',
            icon: 'success',
            confirmButtonText: '¡Gracias!'
        });
    });
}