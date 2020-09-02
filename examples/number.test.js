import { getRandomInt, delimiter } from './number';

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
