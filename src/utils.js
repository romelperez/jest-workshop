/**
 * Gets a report of the airplane physical conditions.
 * @param  {Object}  airplane - Airplane state.
 * @return {Object}
 */
const getAirplaneConditions = airplane => {
  const { y, fuel, speed, acceleration } = airplane;

  const isTooHigh = y > 300;
  const isTooLow = y < -10;
  const isOff = speed < 50 && y > 10;
  const isOutOfFuel = fuel < 0;
  const isTooFast = acceleration > 100;
  const isTooFastOnGround = speed > 300 && y <= 0;

  const isOk = !(isTooHigh || isTooLow || isOff || isOutOfFuel || isTooFast || isTooFastOnGround);

  return { isOk, isTooHigh, isTooLow, isOff, isOutOfFuel, isTooFast, isTooFastOnGround };
};

/**
 * Format the value provided to user friendly number as a number.
 * @param  {Number} data
 * @return {Number}
 */
const formatNumber = data => {
  if (typeof data !== 'number') {
    throw new Error('Provided value is not a number.');
  }

  const value = data.toFixed(1);

  return Number(value);
};

module.exports = { getAirplaneConditions, formatNumber };
