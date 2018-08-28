const { getAirplaneConditions } = require('./utils');

const renderAirplane = ({ airplaneEl, panorama, airplane }) => {
  const airplaneConditions = getAirplaneConditions(airplane);

  if (!airplaneConditions.isOk) {
    airplaneEl.classList.add('broken');
    return;
  }

  airplaneEl.style.width = airplane.width + 'px';
  airplaneEl.style.height = airplane.height + 'px';

  const y = (panorama.height - airplane.y) - panorama.undergroundHeight;
  airplaneEl.style.top = y + 'px';
  airplaneEl.style.transform = `rotate(${-airplane.inclination}deg)`;
};

module.exports = { renderAirplane };
