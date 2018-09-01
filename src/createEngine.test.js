/* eslint-env jest */

const { createEngine } = require('./createEngine');

describe('createEngine()', () => {
  it('Debe retornar una función al ser creada', () => {
    const received = typeof createEngine({});
    const expected = 'function';
    expect(received).toBe(expected);
  });

  it('Debe usar "nextFrame" con la referencia al "engine"', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: false });
    const simulator = {
      time: {},
      airplane: {}
    };

    const engine = createEngine({ simulator, nextFrame, render, getAirplaneConditions });
    engine();

    expect(nextFrame).toHaveBeenCalledWith(engine);
  });

  it('Debe llamar "render" con la referencia a "simulator"', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: false });
    const simulator = {
      time: {},
      airplane: {}
    };

    const engine = createEngine({ simulator, nextFrame, render, getAirplaneConditions });
    engine();

    expect(render).toHaveBeenCalledWith(simulator);
  });

  it('Debe actualizar "duration" y "lastTimestamp"', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: false });
    const simulator = {
      time: { startTimestamp: 75 },
      airplane: {}
    };

    const engine = createEngine({ simulator, nextFrame, render, getAirplaneConditions });
    engine(100);

    expect(simulator.time.duration).toBe(25);
    expect(simulator.time.lastTimestamp).toBe(100);
  });

  it('Debe llamar "pilot" con la referencia a "simulator" si las condiciones de vuelo se encuentran bien', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const pilot = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: true });
    const simulator = {
      time: { startTimestamp: 0 },
      airplane: { x: 0, y: 0, fuel: 0, speed: 0, inclination: 0 }
    };

    const engine = createEngine({ simulator, nextFrame, render, pilot, getAirplaneConditions });
    engine(1000);

    expect(pilot).toHaveBeenCalledWith(simulator);
  });

  it('Debe actualizar "airplane.x" con las condiciones actuales y en diferencia de tiempo 1 segundo', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const pilot = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: true });
    const simulator = {
      time: { startTimestamp: 0, lastTimestamp: 0 },
      airplane: { x: 0, y: 0, fuel: 0, speed: 100, inclination: 0 }
    };

    const engine = createEngine({ simulator, nextFrame, render, pilot, getAirplaneConditions });
    engine(1000);

    // time diff * speed / 1000
    expect(simulator.airplane.x).toBe((1000 * 100) / 1000);
  });

  it('Debe actualizar "airplane.y" con las condiciones actuales y en diferencia de tiempo 1 segundo', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const pilot = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: true });
    const simulator = {
      time: { startTimestamp: 0, lastTimestamp: 0 },
      airplane: { x: 0, y: 0, fuel: 0, speed: 0, inclination: 10 }
    };

    const engine = createEngine({ simulator, nextFrame, render, pilot, getAirplaneConditions });
    engine(1000);

    // time diff * inclination / 66
    expect(simulator.airplane.y).toBe((1000 * 10) / 66);
  });

  it('Debe actualizar "airplane.fuel" con las condiciones actuales y en diferencia de tiempo 1 segundo', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const pilot = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: true });
    const simulator = {
      time: { startTimestamp: 0, lastTimestamp: 0 },
      airplane: { x: 0, y: 0, fuel: 0, speed: 100, inclination: 0 }
    };

    const engine = createEngine({ simulator, nextFrame, render, pilot, getAirplaneConditions });
    engine(1000);

    // - time diff * speed / 1e5
    expect(simulator.airplane.fuel).toBe(-(1000 * 100) / 1e5);
  });

  it('Debe actualizar "airplane.speed" con las condiciones actuales y en diferencia de tiempo 1 segundo', () => {
    const nextFrame = jest.fn();
    const render = jest.fn();
    const pilot = jest.fn();
    const getAirplaneConditions = jest.fn().mockReturnValue({ isOk: true });
    const simulator = {
      time: { startTimestamp: 0, lastTimestamp: 0 },
      airplane: { x: 0, y: 0, fuel: 0, speed: 100, inclination: 0, acceleration: 5 }
    };

    const engine = createEngine({ simulator, nextFrame, render, pilot, getAirplaneConditions });
    engine(1000);

    // speed + (time diff * acceleration) / 1000
    expect(simulator.airplane.speed).toBe(100 + (1000 * 5) / 1000);
  });
});
