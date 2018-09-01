const { getAirplaneConditions } = require('./utils');

/**
 * Renderiza las condiciones actuales de vuelo.
 * @param  {Object} simulator - Estado de la simulación.
 */
function renderConditions(simulator) {
  const { conditionsEl, airplane } = simulator;
  const {
    isTooHigh,
    isTooLow,
    isOff,
    isOutOfFuel,
    isTooFast,
    isTooFastOnGround
  } = getAirplaneConditions(airplane);

  let currentStatus = 'Todos los sistemas funcionando bien.';

  if (isTooHigh) {
    currentStatus = 'El avión está muy alto.';
  }
  else if (isTooLow) {
    currentStatus = 'El avión está bajo suelo.';
  }
  else if (isOff) {
    currentStatus = 'El avión está sin movimiento en el aire.';
  }
  else if (isOutOfFuel) {
    currentStatus = 'Se ha acabado el combustible.';
  }
  else if (isTooFast) {
    currentStatus = 'El avión voló a demasiada velocidad.';
  }
  else if (isTooFastOnGround) {
    currentStatus = 'El avión se movía muy rápido en el suelo.';
  }

  conditionsEl.innerHTML = currentStatus;
}

module.exports = { renderConditions };
