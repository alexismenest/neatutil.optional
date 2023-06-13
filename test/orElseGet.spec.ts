import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "orElseGet"', () => {
  test('calling on a non-empty instance returns the present value', () => {
    const supplier = jest.fn(() => '0');
    const nonEmptyInstance = Optional.of<string>('');
    const returnedValue = nonEmptyInstance.orElseGet(supplier);

    expect(supplier).not.toHaveBeenCalled();
    expect(returnedValue).toBe('');
  });

  test('calling on an empty instance returns the supplied maybe-nullish value', () => {
    const nonNullishReturningSupplier = jest.fn(() => '');
    const nullReturningSupplier = jest.fn(() => null);
    const undefinedReturningSupplier = jest.fn(() => { console.log(); });
    const emptyInstance = Optional.empty();
    const returnedNonNullishValue = emptyInstance.orElseGet(nonNullishReturningSupplier);
    const returnedNullValue = emptyInstance.orElseGet(nullReturningSupplier);
    const returnedUndefinedValue = emptyInstance.orElseGet(undefinedReturningSupplier);

    expect(nonNullishReturningSupplier).toHaveBeenCalledTimes(1);
    expect(nonNullishReturningSupplier).toHaveReturnedWith('');
    expect(returnedNonNullishValue).toBe('');
    expect(nullReturningSupplier).toHaveBeenCalledTimes(1);
    expect(nullReturningSupplier).toHaveReturnedWith(null);
    expect(returnedNullValue).toBe(null);
    expect(undefinedReturningSupplier).toHaveBeenCalledTimes(1);
    expect(undefinedReturningSupplier).toHaveReturnedWith(undefined);
    expect(returnedUndefinedValue).toBe(null);
  });

  test('calling with a non-function argument throws', () => {
    const nullArg = null;
    const objectArg = {};
    const errorThrown = new TypeError('invalid argument type for parameter "supplier"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGet()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGet(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.orElseGet(objectArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGet()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGet(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.orElseGet(objectArg)).toThrow(errorThrown);
  });
});
