/**
 * Create an engine with provided dependencies.
 * @param  {Object} dependencies
 * @param  {Object} dependencies.simulator - Simulator state ref.
 * @param  {Function} dependencies.nextFrame - requestAnimationFrame function.
 * @param  {Function} dependencies.render - To render UI with simulator ref.
 * @param  {Function} dependencies.pilot - To call pilot system.
 * @param  {Function} dependencies.getAirplaneConditions - To get airplane conditions.
 * @return {Function} - The engine system. It will receive the frame timestamp.
 */
const createEngine = dependencies => {
  const { simulator, nextFrame, render, pilot, getAirplaneConditions } = dependencies;

  const engine = (timestamp = 0) => {
    const { time, airplane } = simulator;
    const { isOk } = getAirplaneConditions(airplane);
    const timeDiff = timestamp - time.lastTimestamp;

    if (isOk) {
      pilot(simulator);

      // Only affected by the airplane speed.
      const xDiff = (timeDiff * airplane.speed) / 1000;

      // Only affected by the airplane tilt.
      // Inclination 1deg = ~15px per second.
      const yDiff = (timeDiff * airplane.inclination) / 66;

      // Only affected by the airplane speed.
      // Speed 1px/ms2 = 0.01units per second.
      const fuelDiff = -(timeDiff * airplane.speed) / 1e5;

      // Only affected by the airplane acceleration.
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
  };

  return engine;
};

module.exports = { createEngine };
