import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "filter"', () => {
  test('calling on a non-empty instance with the value matching the predicate returns the same instance', () => {
    const predicate = jest.fn((value: number) => value > 0);
    const nonEmptyInstance = Optional.of<number>(5);
    const anotherNonEmptyInstance = nonEmptyInstance.filter(predicate);

    expect(predicate).toHaveBeenCalledTimes(1);
    expect(predicate).toHaveBeenCalledWith(5);
    expect(predicate).toHaveReturnedWith(true);
    expect(anotherNonEmptyInstance).toBeInstanceOf(Optional);
    expect(anotherNonEmptyInstance.get()).toBe(5);
    expect(nonEmptyInstance === anotherNonEmptyInstance).toBe(true);
    expect(nonEmptyInstance.equals(anotherNonEmptyInstance)).toBe(true);
  });

  test('calling on a non-empty instance with the value not matching the predicate returns an empty instance', () => {
    const predicate = jest.fn((value: number) => value < 0);
    const nonEmptyInstance = Optional.of<number>(5);
    const emptyInstance = nonEmptyInstance.filter(predicate);

    expect(predicate).toHaveBeenCalledTimes(1);
    expect(predicate).toHaveBeenCalledWith(5);
    expect(predicate).toHaveReturnedWith(false);
    expect(emptyInstance).toBeInstanceOf(Optional);
    expect(emptyInstance.isEmpty()).toBe(true);
    expect(emptyInstance.isPresent()).toBe(false);
  });

  test('calling on an empty instance returns the same empty instance', () => {
    const predicate = jest.fn(value => value === null);
    const emptyInstance = Optional.empty();
    const anotherEmptyInstance = emptyInstance.filter(predicate);

    expect(predicate).not.toHaveBeenCalled();
    expect(anotherEmptyInstance).toBeInstanceOf(Optional);
    expect(anotherEmptyInstance.isEmpty()).toBe(true);
    expect(anotherEmptyInstance.isPresent()).toBe(false);
    expect(emptyInstance === anotherEmptyInstance).toBe(true);
  });

  test('calling with a non-function argument throws', () => {
    const nullArg = null;
    const objectArg = {};
    const errorThrown = new TypeError('invalid argument type for parameter "predicate"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.filter()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.filter(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.filter(objectArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.filter()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.filter(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.filter(objectArg)).toThrow(errorThrown);
  });
});
