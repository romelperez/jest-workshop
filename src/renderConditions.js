const { getAirplaneConditions } = require('./utils');

const renderConditions = ({ conditionsEl, airplane }) => {
  const {
    isTooHigh,
    isTooLow,
    isOff,
    isOutOfFuel,
    isTooFast,
    isTooFastOnGround
  } = getAirplaneConditions(airplane);

  let currentStatus = 'All systems working OK';

  if (isTooHigh) {
    currentStatus = 'Airplane is too high.';
  }
  else if (isTooLow) {
    currentStatus = 'Airplane is under the floor.';
  }
  else if (isOff) {
    currentStatus = 'Airplane is above ground with no speed.';
  }
  else if (isOutOfFuel) {
    currentStatus = 'Airplane has ran out of fuel.';
  }
  else if (isTooFast) {
    currentStatus = 'Airplane got too fast.';
  }
  else if (isTooFastOnGround) {
    currentStatus = 'Airplane got too fast on the ground.';
  }

  conditionsEl.innerHTML = currentStatus;
};

module.exports = { renderConditions };
