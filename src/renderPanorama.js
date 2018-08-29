const { getAirplaneConditions } = require('./utils');

const renderPanorama = ({ panoramaEl, panorama, airplane }) => {
  const airplaneConditions = getAirplaneConditions(airplane);
  if (!airplaneConditions.isOk) {
    return;
  }

  panoramaEl.style.width = panorama.width + 'px';
  panoramaEl.style.height = panorama.height + 'px';

  const background1El = panoramaEl.querySelector('.panorama-background1');
  const background2El = panoramaEl.querySelector('.panorama-background2');
  const backgroundOffset = airplane.x % panorama.width;

  background1El.style.left = -backgroundOffset + 'px';
  background2El.style.left = (panorama.width - backgroundOffset) + 'px';
};

module.exports = { renderPanorama };
