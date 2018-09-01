/* eslint-env jest */

const { createPilot } = require('./createPilot');

describe('createPilot()', () => {
  it('Debe retornar una función al ser creada', () => {
    const received = typeof createPilot();
    const expected = 'function';
    expect(received).toBe(expected);
  });

  it('No debe actualizar "acceleration" o "inclination" cuando las condiciones de aterrizaje no se cumplen', () => {
    const settings = {};
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 300, y: 0, speed: 0, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.acceleration).toBe(0);
    expect(simulator.airplane.inclination).toBe(0);
  });

  it('Debe actualizar "acceleration" si se mueve y las condiciones de aterrizaje se cumplen', () => {
    const settings = { accelerate: 10, tilt: 0 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 0, speed: 100, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.acceleration).toBe(-10);
  });

  it('No debe actualizar "acceleration" si se encuentra inmóvil y las condiciones de aterrizaje se cumplen', () => {
    const settings = { accelerate: 10, tilt: 0 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 0, speed: 0, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.acceleration).toBe(0);
  });

  it('Debe actualizar la "inclination" sino se encuentra en el suelo y las condiciones de aterrizaje se cumplen', () => {
    const settings = { accelerate: 0, tilt: 10 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 75, speed: 0, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.inclination).toBe(-10);
  });

  it('No debe actualizar "inclination" si se encuentra en el suelo y las condiciones de aterrizaje se cumplen', () => {
    const settings = { accelerate: 0, tilt: 10 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 0, speed: 0, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.inclination).toBe(0);
  });
});
