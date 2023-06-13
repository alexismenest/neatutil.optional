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
    const errorThrown = new TypeError('invalid argument type for parameter "errorSupplier"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>(objectArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGetThrow<Error>()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGetThrow<Error>(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGetThrow<Error>(objectArg)).toThrow(errorThrown);
  });

  test('calling on an empty instance with a function argument that does not return an "Error" instance throws', () => {
    const errorThrown = new TypeError('invalid return type for function "errorSupplier"; expected: "Error"');
    const nonErrorReturningSupplier = jest.fn(() => '');
    const emptyInstance = Optional.empty();

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGetThrow<Error>(nonErrorReturningSupplier)).toThrow(errorThrown);
    expect(nonErrorReturningSupplier).toHaveBeenCalledTimes(1);
    expect(nonErrorReturningSupplier).toHaveReturnedWith('');
  });
});
