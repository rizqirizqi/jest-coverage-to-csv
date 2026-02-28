import { getRandomInt, delimiter } from "./number"

import * as number from "./number"
describe('Number test', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  test('Test random int with valid parameters', () => {
    const randomInt = () => getRandomInt(1, 3);
    expect(randomInt).not.toThrowError();
    expect(randomInt()).toBe(2);
  });

  test('Test random int max has to be bigger than min', () => {
    const randomInt = () => getRandomInt(3, 1);
    expect(randomInt).toThrowError('Max must be greater or equal than min');
  });

  test('delimiter function should add dots per thousands', () => {
    expect(delimiter(50000)).toBe('50,000');
    expect(delimiter(50000, ',')).toBe('50,000');
    expect(delimiter('275009')).toBe('275,009');
  });

  afterEach(() => {
    global.Math.random.mockRestore();
  });
});

// @ponicode
describe("number.getRandomInt", () => {
    test("0", () => {
        let callFunction = () => {
            number.getRandomInt(-100, 0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            number.getRandomInt(0.0, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            number.getRandomInt(10, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            number.getRandomInt(-1, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            number.getRandomInt(1, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            number.getRandomInt(-Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
