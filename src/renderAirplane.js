const { getAirplaneConditions } = require('./utils');

/**
 * Renderiza el avión.
 * @param  {Object} simulator - Estado de la simulación.
 */
function renderAirplane(simulator) {
  const { airplaneEl, panorama, airplane } = simulator;
  const airplaneConditions = getAirplaneConditions(airplane);

  if (!airplaneConditions.isOk) {
    airplaneEl.classList.add('broken');
    return;
  }

  airplaneEl.style.width = airplane.width + 'px';
  airplaneEl.style.height = airplane.height + 'px';

  // Le sumamos (be abajo hacia arriba) "undergroundHeight" para que el piso
  // no quede al final de la imagen sino virtualmente dentro de la imagen.
  const y = (panorama.height - airplane.y) - panorama.undergroundHeight;
  airplaneEl.style.top = y + 'px';

  // Rotamos en negativo para seguir la convención de que positivo es hacia
  // arriba con el eje derecho.
  airplaneEl.style.transform = `rotate(${-airplane.inclination}deg)`;
}

module.exports = { renderAirplane };
