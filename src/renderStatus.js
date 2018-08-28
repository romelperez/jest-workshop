const { formatNumber } = require('./utils');

const renderStatus = ({ statusEl, time, airplane, landing }) => {
  const variables = [
    { name: 'Flying Time', value: formatNumber(time.duration / 1000) + ' s' },
    { name: 'Speed', value: formatNumber(airplane.speed) + ' px/s' },
    { name: 'Position X<br>(from take-off)', value: formatNumber(airplane.x) + ' px' },
    { name: 'Position X<br>(from landing)', value: formatNumber(airplane.x - landing.x) + ' px' },
    { name: 'Position Y<br>(from floor)', value: formatNumber(airplane.y) + ' px' },
    { name: 'Fuel', value: formatNumber(airplane.fuel) + ' units' },
    { name: 'Acceleration', value: formatNumber(airplane.acceleration) + ' px/s<sup>2</sup>' },
    { name: 'Inclination', value: formatNumber(airplane.inclination) + ' deg' }
  ];

  const html = variables
    .map(({ name, value }, index) => `
      <li class="status-item" data-index="${index}">
        <span class="status-name">${name}</span>
        <span class="status-value">${value}</span>
      </li>
    `)
    .join('');

  statusEl.innerHTML = html;
};

module.exports = { renderStatus };
