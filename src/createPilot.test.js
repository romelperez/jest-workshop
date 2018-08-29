/* eslint-env jest */

const { createPilot } = require('./createPilot');

describe('createPilot()', () => {
  it('Should return a function', () => {
    const received = typeof createPilot();
    const expected = 'function';
    expect(received).toBe(expected);
  });

  it('Should NOT update acceleration or inclination when no landing conditions are met', () => {
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

  it('Should update acceleration if moving when landing conditions are met', () => {
    const settings = { accelerate: 10, tilt: 0 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 0, speed: 100, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.acceleration).toBe(-10);
  });

  it('Should NOT update acceleration if static when landing conditions are met', () => {
    const settings = { accelerate: 10, tilt: 0 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 0, speed: 0, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.acceleration).toBe(0);
  });

  it('Should update inclination if above ground when landing conditions are met', () => {
    const settings = { accelerate: 0, tilt: 10 };
    const simulator = {
      landing: { x: 500 },
      airplane: { x: 501, y: 75, speed: 0, acceleration: 0, inclination: 0 }
    };
    const pilot = createPilot(settings);
    pilot(simulator);

    expect(simulator.airplane.inclination).toBe(-10);
  });

  it('Should NOT update inclination if on ground when landing conditions are met', () => {
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
