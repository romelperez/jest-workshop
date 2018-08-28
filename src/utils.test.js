/* eslint-env jest */

const { getAirplaneConditions, formatNumber } = require('./utils');

describe('Utils', () => {
  describe('getAirplaneConditions()', () => {
    it('Should say isTooHigh if y is above 300', () => {
      const airplane = { y: 301, fuel: 0, speed: 100, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: false,
        isTooHigh: true,
        isTooLow: false,
        isOff: false,
        isOutOfFuel: false,
        isTooFast: false,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });

    it('Should say isTooLow if y is below -10', () => {
      const airplane = { y: -11, fuel: 0, speed: 0, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: false,
        isTooHigh: false,
        isTooLow: true,
        isOff: false,
        isOutOfFuel: false,
        isTooFast: false,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });

    it('Should say isOutOfFuel if no fuel', () => {
      const airplane = { y: 10, fuel: -1, speed: 0, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: false,
        isTooHigh: false,
        isTooLow: false,
        isOff: false,
        isOutOfFuel: true,
        isTooFast: false,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });

    it('Should say isOff if low speed above ground', () => {
      const airplane = { y: 11, fuel: 10, speed: 49, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: false,
        isTooHigh: false,
        isTooLow: false,
        isOff: true,
        isOutOfFuel: false,
        isTooFast: false,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });

    it('Should say isTooFast if acceleration is above 100 units', () => {
      const airplane = { y: 0, fuel: 0, speed: 0, acceleration: 101 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: false,
        isTooHigh: false,
        isTooLow: false,
        isOff: false,
        isOutOfFuel: false,
        isTooFast: true,
        isTooFastOnGround: false
      };
      expect(received).toEqual(expected);
    });

    it('Should say isTooFastOnGround if moving fast and on floor', () => {
      const airplane = { y: 0, fuel: 100, speed: 301, acceleration: 0 };
      const received = getAirplaneConditions(airplane);
      const expected = {
        isOk: false,
        isTooHigh: false,
        isTooLow: false,
        isOff: false,
        isOutOfFuel: false,
        isTooFast: false,
        isTooFastOnGround: true
      };
      expect(received).toEqual(expected);
    });

    it('Should say isOk if static', () => {
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

    it('Should return false if flying with good conditions', () => {
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

  describe('formatNumber()', () => {
    it('Should truncate to first decimal', () => {
      const received = formatNumber(10.428);
      const expected = 10.4;
      expect(received).toBe(expected);
    });

    it('Should return a number', () => {
      const received = typeof formatNumber(10);
      const expected = 'number';
      expect(received).toBe(expected);
    });

    it('Should throw if provided value is not a number', () => {
      const call = () => formatNumber(null);
      const errorMsg = 'Provided value is not a number.';
      expect(call).toThrow(errorMsg);
    });
  });
});
