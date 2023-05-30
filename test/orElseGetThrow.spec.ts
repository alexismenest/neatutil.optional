import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "orElseGetThrow"', () => {
  test('calling on a non-empty instance returns the present value', () => {
    const errorSupplier = jest.fn(() => new Error());
    const nonEmptyInstance = Optional.of<string>('');

    expect(() => nonEmptyInstance.orElseGetThrow<Error>(errorSupplier)).not.toThrow();
    expect(nonEmptyInstance.orElseGetThrow<Error>(errorSupplier)).toBe('');
    expect(errorSupplier).not.toHaveBeenCalled();
  });

  test('calling on an empty instance throws', () => {
    const suppliedErrorInstance = new Error('no value is present');
    const errorSupplier = jest.fn(() => suppliedErrorInstance);
    const emptyInstance = Optional.empty();

    expect(() => emptyInstance.orElseGetThrow<Error>(errorSupplier)).toThrow(suppliedErrorInstance);
    expect(errorSupplier).toHaveBeenCalledTimes(1);
    expect(errorSupplier).toHaveReturnedWith(suppliedErrorInstance);
  });

  test('calling with a non-function argument throws', () => {
    const nullArg = null;
    const objectArg = {};
    const error = new TypeError('invalid argument type for parameter "errorSupplier"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>(objectArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGetThrow<Error>()).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGetThrow<Error>(nullArg)).toThrow(error);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGetThrow<Error>(objectArg)).toThrow(error);
  });

  test('calling on an empty instance with a function argument that does not return an "Error" instance throws', () => {
    const error = new TypeError('invalid return type for method "errorSupplier"; expected: "Error"');
    const nonErrorReturningSupplier = jest.fn(() => '');
    const emptyInstance = Optional.empty();

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>(nonErrorReturningSupplier)).toThrow(error);
    expect(nonErrorReturningSupplier).toHaveBeenCalledTimes(1);
    expect(nonErrorReturningSupplier).toHaveReturnedWith('');
  });
});
