/* eslint-env jest */

const { getAirplaneConditions } = require('./utils');

describe('Utils', () => {
  describe('getAirplaneConditions()', () => {
    it('Debe indicar "isTooHigh" si "y" está por encima de 300', () => {
      const airplane = { y: 301, fuel: 0, speed: 100, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = { isOk: false, isTooHigh: true };
      expect(received).toMatchObject(expected);
    });

    it('Debe indicar que "isTooLow" si "y" está por debajo de -10', () => {
      const airplane = { y: -11, fuel: 0, speed: 0, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = { isOk: false, isTooLow: true };
      expect(received).toMatchObject(expected);
    });

    it('Debe indicar "isOutOfFuel" sino hay "fuel"', () => {
      const airplane = { y: 10, fuel: -1, speed: 0, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = { isOk: false, isOutOfFuel: true };
      expect(received).toMatchObject(expected);
    });

    it('Debe indicar que "isOff" si está con "speed" por debajo de 50 y "y" es superior a 10', () => {
      const airplane = { y: 11, fuel: 10, speed: 49, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = { isOk: false, isOff: true };
      expect(received).toMatchObject(expected);
    });

    it('Debe indicar "isTooFast" si "acceleration" es superior a 100', () => {
      const airplane = { y: 0, fuel: 0, speed: 0, acceleration: 101 };
      const received = getAirplaneConditions(airplane);
      const expected = { isOk: false, isTooFast: true };
      expect(received).toMatchObject(expected);
    });

    it('Debe indicar "isTooFastOnGround" si "speed" es mayor a 300 y "y" menor o igual a 0', () => {
      const airplane = { y: 0, fuel: 100, speed: 301, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = { isOk: false, isTooFastOnGround: true };
      expect(received).toMatchObject(expected);
    });

    it('No debe indicar ningún error si se encuentra estático', () => {
      const airplane = { y: 0, fuel: 0, speed: 0, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: true,
        isTooHigh: false,
        isTooLow: false,
        isOff: false,
        isOutOfFuel: false,
        isTooFast: false,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });

    it('No debe indicar ningún error si se encuentra volando en buenas condiciones', () => {
      const airplane = { y: 180, fuel: 50, speed: 200, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: true,
        isTooHigh: false,
        isTooLow: false,
        isOff: false,
        isOutOfFuel: false,
        isTooFast: false,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });
  });
});
