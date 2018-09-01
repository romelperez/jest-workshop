/**
 * Renderiza el estado de la simulación.
 * @param  {Object} simulator - Estado de la simulación.
 */
function renderStatus(simulator) {
  const { statusEl, time, airplane, landing } = simulator;

  const variables = [
    { name: 'Tiempo', value: Math.round(time.duration / 1000) + ' s' },
    { name: 'Velocidad', value: Math.round(airplane.speed) + ' px/s' },
    { name: 'X (desde despegue)', value: Math.round(airplane.x) + ' px' },
    { name: 'X (desde aterrizaje)', value: Math.round(airplane.x - landing.x) + ' px' },
    { name: 'Y (desde suelo)', value: Math.round(airplane.y) + ' px' },
    { name: 'Combustible', value: Math.round(airplane.fuel) + ' units' },
    { name: 'Aceleración', value: Math.round(airplane.acceleration) + ' px/s<sup>2</sup>' },
    { name: 'Inclinación', value: Math.round(airplane.inclination) + ' deg' }
  ];

  const html = variables
    .map((variable, index) => {
      const { name, value } = variable;
      return `
        <li class="status-item" data-index="${index}">
          <span class="status-name">${name}</span>
          <span class="status-value">${value}</span>
        </li>
      `;
    })
    .join('');

  statusEl.innerHTML = html;
}

module.exports = { renderStatus };
