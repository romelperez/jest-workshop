/**
 * Crear la maquina de ejecución de la simulación del vuelo del avión.
 * @param  {Object} dependencies - Dependencias.
 * @param  {Object} dependencies.simulator - Estado de la simulación.
 * @param  {Function} dependencies.nextFrame - función "requestAnimationFrame".
 * @param  {Function} dependencies.render - Renderizar interfaz.
 * @param  {Function} dependencies.pilot - Piloto.
 * @param  {Function} dependencies.getAirplaneConditions - Consigue las condiciones
 * de vuelo actuales.
 * @return {Function} - La máquina de simulación creada. Recibe el timestamp del
 * frame actual.
 */
function createEngine(dependencies) {
  const { simulator, nextFrame, render, pilot, getAirplaneConditions } = dependencies;

  // Recibe timestamp del frame actual.
  function engine(timestamp = 0) {
    const { time, airplane } = simulator;
    const { isOk } = getAirplaneConditions(airplane);

    // Diferencia de tiempo en milisegundos del último frame con este.
    const timeDiff = timestamp - time.lastTimestamp;

    if (isOk) {
      pilot(simulator);

      // Sólo afectado por la velocidad del avión.
      const xDiff = (timeDiff * airplane.speed) / 1000;

      // Sólo afectado por la inclinación del avión.
      // Inclination 1deg = ~15px per second.
      const yDiff = (timeDiff * airplane.inclination) / 66;

      // Sólo afectado por la velocidad del avión.
      // Speed 1px/ms2 = 0.01units per second.
      const fuelDiff = -(timeDiff * airplane.speed) / 1e5;

      // Sólo afectado por la aceleración del avión.
      const speedDiff = (timeDiff * airplane.acceleration) / 1000;

      airplane.x += xDiff;
      airplane.y += yDiff;
      airplane.fuel += fuelDiff;
      airplane.speed += speedDiff;
    }

    time.duration = timestamp - time.startTimestamp;
    time.lastTimestamp = timestamp;

    render(simulator);

    nextFrame(engine);
  }

  return engine;
}

module.exports = { createEngine };
