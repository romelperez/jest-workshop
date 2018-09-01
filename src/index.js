const { createEngine } = require('./createEngine');
const { createPilot } = require('./createPilot');
const { renderPanorama } = require('./renderPanorama');
const { renderAirplane } = require('./renderAirplane');
const { renderStatus } = require('./renderStatus');
const { renderConditions } = require('./renderConditions');
const { getAirplaneConditions } = require('./utils');

// El estado de la simulación. Contiene los elements DOM, el estado del tiempo,
// el panorama, y los estados del área de aterrizaje y el avión.
// Todos los cambios en la simulación son mutados acá, teniendo en cuenta que no
// tenemos un sistema immutable.
const simulator = {

  // Referencias al DOM.
  panoramaEl: document.querySelector('.panorama'),
  airplaneEl: document.querySelector('.airplane'),
  statusEl: document.querySelector('.status'),
  conditionsEl: document.querySelector('.conditions'),

  // Estado del tiempo.
  time: {
    startTimestamp: -20000, // ms
    lastTimestamp: 0, // ms
    duration: 0 // ms
  },

  // Estado del panorama o ambiente.
  panorama: {
    width: 1000, // px
    height: 450, // px
    undergroundHeight: 150 // px
  },

  // Estado de la zona de aterrizaje.
  landing: {
    x: 13000
  },

  // Estado del avión.
  airplane: {
    width: 135, // px
    height: 47, // px
    x: 10000, // px
    y: 270, // px
    speed: 600, // px/s
    acceleration: 0, // px/s2
    inclination: 0, // degress
    fuel: 70 // units
  }
};

// Para actualizar la interfaz con el estado actual.
const render = data => {
  renderPanorama(data);
  renderAirplane(data);
  renderStatus(data);
  renderConditions(data);
};

// Crear un piloto para que tome decisiones en tiempo de vuelo.
const pilot = createPilot({

  // Esta es la aceleración que el piloto puede poner al avión hacia arriba
  // o abajo dependiendo de la maniobra.
  accelerate: 90, // px/s2

  // Esta es la inclinación que el piloto puede poner al avión hacia arriba
  // o abajo dependiendo de la maniobra.
  tilt: 5 // degress
});

// Crear la maquina que se encarga de correr la simulación de todos los actores.
const engine = createEngine({
  simulator,
  nextFrame: window.requestAnimationFrame,
  render,
  pilot,
  getAirplaneConditions
});

// Iniciar la maquina por primera vez. Ésta tomará control de los actores
// y delegará tareas cuando sea necesario.
engine();

window.simulator = simulator;
