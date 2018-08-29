/**
 * Create a pilot system to take action over the airplane for the current
 * simulator state.
 * @param  {Object} settings
 * @param  {Object} settings.accelerate - The acceleration it will take when
 * speeding up or down is needed.
 * @param  {Object} settings.tilt - The tilt the airplane will take when
 * ascending or descending is needed.
 * @return {Function} - The pilot system. It will receive the simulator ref.
 */
const createPilot = settings => {
  return simulator => {
    const { tilt } = settings;
    const { airplane, landing } = simulator;

    // Landing System

    const distanceToLanding = landing.x - airplane.x;
    const isAbove = airplane.y > 0;

    if (distanceToLanding <= 0) {
      airplane.inclination = isAbove ? -tilt : 0;
    }
  };
};

module.exports = { createPilot };
