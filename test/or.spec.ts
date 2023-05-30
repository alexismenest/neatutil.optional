import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "or"', () => {
  test('calling on a non-empty instance returns the same instance', () => {
    const supplier = jest.fn(() => Optional.of<string>('0'));
    const nonEmptyInstance = Optional.of<string>('');
    const anotherNonEmptyInstance = nonEmptyInstance.or(supplier);

    expect(supplier).not.toHaveBeenCalled();
    expect(anotherNonEmptyInstance).toBeInstanceOf(Optional);
    expect(anotherNonEmptyInstance.get()).toBe('');
    expect(nonEmptyInstance === anotherNonEmptyInstance).toBe(true);
    expect(nonEmptyInstance.equals(anotherNonEmptyInstance)).toBe(true);
  });

  test('calling on an empty instance returns the supplied non-empty instance', () => {
    const supplier = jest.fn(() => Optional.of<string>(''));
    const emptyInstance = Optional.empty();
    const suppliedNonEmptyInstance = emptyInstance.or(supplier);

    expect(supplier).toHaveBeenCalledTimes(1);
    expect(supplier).toHaveReturnedWith(suppliedNonEmptyInstance);
    expect(suppliedNonEmptyInstance).toBeInstanceOf(Optional);
    expect(suppliedNonEmptyInstance.isEmpty()).toBe(false);
    expect(suppliedNonEmptyInstance.isPresent()).toBe(true);
    expect(suppliedNonEmptyInstance.get()).toBe('');
  });

  test('calling with a non-function argument throws', () => {
    const nullArg = null;
    const objectArg = {};
    const error = new TypeError('invalid argument type for parameter "supplier"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.or()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.or(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.or(objectArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.or()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.or(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.or(objectArg)).toThrow(error);
  });

  test('calling on an empty instance with a function argument that does not return an "Optional" instance throws', () => {
    const error = new TypeError('invalid return type for method "supplier"; expected: "Optional"');
    const nonOptionalReturningSupplier = jest.fn(() => '');
    const emptyInstance = Optional.empty();

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.or(nonOptionalReturningSupplier)).toThrow(error);
    expect(nonOptionalReturningSupplier).toHaveBeenCalledTimes(1);
    expect(nonOptionalReturningSupplier).toHaveReturnedWith('');
  });
});
