/* eslint-env jest */

const { createEngine } = require('./createEngine');

describe('createEngine()', () => {
  it('Should return a function', () => {
    const received = typeof createEngine({});
    const expected = 'function';
    expect(received).toBe(expected);
  });

  it('Should call nextFrame with engine ref', () => {
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

  it('Should call render with simulator ref', () => {
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

  it('Should update duration and lastTimestamp', () => {
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

  it('Should call pilot with simulator ref if airplane condition is ok', () => {
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

  it('Should update airplane.x with current simulator conditions and timestamp difference (1 second)', () => {
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

  it('Should update airplane.y with current simulator conditions and timestamp difference (1 second)', () => {
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

  it('Should update airplane.fuel with current simulator conditions and timestamp difference (1 second)', () => {
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

  it('Should update airplane.speed with current simulator conditions and timestamp difference (1 second)', () => {
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
