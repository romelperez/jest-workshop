/**
 * Crear un sistema de piloto que tomará acciones sobre el avión teniendo en
 * cuenta las condiciones de la simulación.
 * @param  {Object} settings - Configuración del piloto.
 * @param  {Object} settings.accelerate - Esta es la aceleración que el piloto
 * puede poner al avión hacia arriba o abajo dependiendo de la maniobra.
 * @param  {Object} settings.tilt - Esta es la inclinación que el piloto puede
 * poner al avión hacia arriba o abajo dependiendo de la maniobra.
 * @return {Function} - La función del piloto. Ésta recibirá la referencia al
 * estado actual.
 */
function createPilot(settings) {
  return function(simulator) {
    const { tilt } = settings;
    const { airplane, landing } = simulator;

    // Este es el sistema de aterrizaje del avión.

    // TODO: El avión está tomando la decisión de descender cuando ya se encuentra
    // en la zona de aterrizaje, pero no está desacelerando.
    // Necesitas comparar si la velocidad es mayor a 0 y bajar la aceleración
    // con la que fue definida para el piloto. Pero si su velocidad es menor o
    // igual a 0, debe poner la aceleración a 0.
    // `airplane.speed` es la velocidad del avión.
    // `settings.accelerate` es la aceleración/desaceleración que el avión puede usar.

    const distanceToLanding = landing.x - airplane.x;
    const isAbove = airplane.y > 0;

    if (distanceToLanding <= 0) {
      airplane.inclination = isAbove ? -tilt : 0;
    }
  };
}

module.exports = { createPilot };
