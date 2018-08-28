const { createEngine } = require('./createEngine');
const { createPilot } = require('./createPilot');
const { renderPanorama } = require('./renderPanorama');
const { renderAirplane } = require('./renderAirplane');
const { renderStatus } = require('./renderStatus');
const { renderConditions } = require('./renderConditions');
const { getAirplaneConditions } = require('./utils');

// The application state. It contains the DOM element references, the time status,
// the panorama, landing and airplane actors state in the simulation.
// All changes in the simulation and mutated here, since we don't have an
// immutable system.
const simulator = {

  // DOM references.
  panoramaEl: document.querySelector('.panorama'),
  airplaneEl: document.querySelector('.airplane'),
  statusEl: document.querySelector('.status'),
  conditionsEl: document.querySelector('.conditions'),

  // Simulation time status.
  time: {
    startTimestamp: -20000, // ms
    lastTimestamp: 0, // ms
    duration: 0 // ms
  },

  // Panorama/Ambient actor.
  panorama: {
    width: 1000, // px
    height: 450, // px
    undergroundHeight: 150 // px
  },

  // Landing zone actor.
  landing: {
    x: 13000
  },

  // Airplane actor.
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

// Update UI components with current simulation data state.
const render = data => {
  renderPanorama(data);
  renderAirplane(data);
  renderStatus(data);
  renderConditions(data);
};

// Create a pilot system to take decisions on flying time.
const pilot = createPilot({

  // The acceleration it will take when speeding up or down is needed.
  accelerate: 90, // px/s2

  // The tilt the airplane will take when ascending or descending is needed.
  tilt: 5 // degress
});

// Create an engine for the airplane.
const engine = createEngine({
  simulator,
  nextFrame: window.requestAnimationFrame,
  render,
  pilot,
  getAirplaneConditions
});

// Start the engine for the first time.
// It will take control over the system and delegate tasks.
engine();

window.simulator = simulator;
