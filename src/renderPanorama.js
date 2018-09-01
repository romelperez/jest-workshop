const { getAirplaneConditions } = require('./utils');

/**
 * Renderiza el panorama de la simulación.
 * @param  {Object} simulator - Estado de la simulación.
 */
function renderPanorama(simulator) {
  const { panoramaEl, panorama, airplane } = simulator;

  const airplaneConditions = getAirplaneConditions(airplane);
  if (!airplaneConditions.isOk) {
    return;
  }

  panoramaEl.style.width = panorama.width + 'px';
  panoramaEl.style.height = panorama.height + 'px';

  // Tenemos dos fondos con la misma imagen. Una de las imágenes se encuentra en
  // posición x=0% y la otra en x=100%. Ellas se mueven al mismo tiempo a la izquierda
  // o derecha para simular el movimiento del avión, que realmente está estático.

  const background1El = panoramaEl.querySelector('.panorama-background1');
  const background2El = panoramaEl.querySelector('.panorama-background2');
  const backgroundOffset = airplane.x % panorama.width;

  background1El.style.left = -backgroundOffset + 'px';
  background2El.style.left = (panorama.width - backgroundOffset) + 'px';
}

module.exports = { renderPanorama };
