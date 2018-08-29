const renderStatus = ({ statusEl, time, airplane, landing }) => {
  const variables = [
    { name: 'Flying Time', value: Math.round(time.duration / 1000) + ' s' },
    { name: 'Speed', value: Math.round(airplane.speed) + ' px/s' },
    { name: 'Position X<br>(from take-off)', value: Math.round(airplane.x) + ' px' },
    { name: 'Position X<br>(from landing)', value: Math.round(airplane.x - landing.x) + ' px' },
    { name: 'Position Y<br>(from floor)', value: Math.round(airplane.y) + ' px' },
    { name: 'Fuel', value: Math.round(airplane.fuel) + ' units' },
    { name: 'Acceleration', value: Math.round(airplane.acceleration) + ' px/s<sup>2</sup>' },
    { name: 'Inclination', value: Math.round(airplane.inclination) + ' deg' }
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
