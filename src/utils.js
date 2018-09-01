/**
 * Consigue las condiciones físicas del avión en base a su estado actual.
 * @param  {Object}  airplane - Estado del avión.
 * @return {Object}
 */
function getAirplaneConditions(airplane) {
  const { y, fuel, speed, acceleration } = airplane;

  const isTooHigh = y > 300;
  const isTooLow = y < -10;
  const isOff = speed < 50 && y > 10;
  const isOutOfFuel = fuel < 0;
  const isTooFast = acceleration > 100;
  const isTooFastOnGround = speed > 300 && y <= 0;

  const isOk = !(isTooHigh || isTooLow || isOff || isOutOfFuel || isTooFast || isTooFastOnGround);

  return { isOk, isTooHigh, isTooLow, isOff, isOutOfFuel, isTooFast, isTooFastOnGround };
}

module.exports = { getAirplaneConditions };
