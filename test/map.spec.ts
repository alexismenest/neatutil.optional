import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "map"', () => {
  test('calling on a non-empty instance returns another non-empty instance', () => {
    const mapper = jest.fn((value: number) => `give me ${value}`);
    const nonEmptyInstance = Optional.of<number>(5);
    const anotherNonEmptyInstance = nonEmptyInstance.map<string>(mapper);

    expect(mapper).toHaveBeenCalledTimes(1);
    expect(mapper).toHaveBeenCalledWith(5);
    expect(mapper).toHaveReturnedWith('give me 5');
    expect(anotherNonEmptyInstance).toBeInstanceOf(Optional);
    expect(anotherNonEmptyInstance.get()).toBe('give me 5');
    // @ts-ignore
    expect(nonEmptyInstance === anotherNonEmptyInstance).toBe(false);
  });

  test('calling on an empty instance returns the same empty instance', () => {
    const mapper = jest.fn(value => `${value}`);
    const emptyInstance = Optional.empty();
    const anotherEmptyInstance = emptyInstance.map<string>(mapper);

    expect(mapper).not.toHaveBeenCalled();
    expect(anotherEmptyInstance).toBeInstanceOf(Optional);
    expect(anotherEmptyInstance.isEmpty()).toBe(true);
    expect(anotherEmptyInstance.isPresent()).toBe(false);
    expect(emptyInstance === anotherEmptyInstance).toBe(true);
  });

  test('calling with a non-function argument throws', () => {
    const nullArg = null;
    const objectArg = {};
    const error = new TypeError('invalid argument type for parameter "mapper"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.map()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.map(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.map(objectArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.map<string>()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.map<string>(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.map<string>(objectArg)).toThrow(error);
  });

  test('calling on an non-empty instance with a nullish returning function argument returns an empty instance', () => {
    const nullishReturningMapper = jest.fn((value: number) => { console.log(value); return null; });
    const nonEmptyInstance = Optional.of<number>(5);
    const emptyInstance = nonEmptyInstance.map<null>(nullishReturningMapper);

    expect(nullishReturningMapper).toHaveBeenCalledTimes(1);
    expect(nullishReturningMapper).toHaveBeenCalledWith(5);
    expect(nullishReturningMapper).toHaveReturnedWith(null);
    expect(emptyInstance).toBeInstanceOf(Optional);
    expect(emptyInstance.isEmpty()).toBe(true);
    expect(emptyInstance.isPresent()).toBe(false);
    // @ts-ignore
    expect(nonEmptyInstance === emptyInstance).toBe(false);
  });
});
