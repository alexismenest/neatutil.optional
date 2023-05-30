import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "flatMap"', () => {
  test('calling on a non-empty instance returns another non-empty instance', () => {
    const mapper = jest.fn((value: number) => Optional.of<string>(`give me ${value}`));
    const nonEmptyInstance = Optional.of<number>(5);
    const anotherNonEmptyInstance = nonEmptyInstance.flatMap<string>(mapper);

    expect(mapper).toHaveBeenCalledTimes(1);
    expect(mapper).toHaveBeenCalledWith(5);
    expect(mapper).toHaveReturnedWith(anotherNonEmptyInstance);
    expect(anotherNonEmptyInstance).toBeInstanceOf(Optional);
    expect(anotherNonEmptyInstance.get()).toBe('give me 5');
    // @ts-ignore
    expect(nonEmptyInstance === anotherNonEmptyInstance).toBe(false);
  });

  test('calling on an empty instance returns the same empty instance', () => {
    const mapper = jest.fn(value => Optional.of<string>(`${value}`));
    const emptyInstance = Optional.empty();
    const anotherEmptyInstance = emptyInstance.flatMap<string>(mapper);

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
    expect(() => emptyInstance.flatMap()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.flatMap(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.flatMap(objectArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.flatMap<string>()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.flatMap<string>(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.flatMap<string>(objectArg)).toThrow(error);
  });

  test('calling on an non-empty instance with a function argument that does not return an "Optional" instance throws', () => {
    const error = new TypeError('invalid return type for method "mapper"; expected: "Optional"');
    const nonOptionalReturningMapper = jest.fn((value: number) => `give me ${value}`);
    const nonEmptyInstance = Optional.of<number>(5);

    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.flatMap<string>(nonOptionalReturningMapper)).toThrow(error);
    expect(nonOptionalReturningMapper).toHaveBeenCalledTimes(1);
    expect(nonOptionalReturningMapper).toHaveBeenCalledWith(5);
    expect(nonOptionalReturningMapper).toHaveReturnedWith('give me 5');
  });
});
