import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "ifPresent"', () => {
  test('calling on a non-empty instance performs the given action with the present value', () => {
    let n = 1;
    const action = jest.fn((value: number) => { n += value; });
    const nonEmptyInstance = Optional.of<number>(4);
    nonEmptyInstance.ifPresent(action);

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith(4);
    expect(action).toHaveReturnedWith(undefined);
    expect(n).toBe(5);
  });

  test('calling on an empty instance does nothing', () => {
    const action = jest.fn(value => { console.log(value); });
    const emptyInstance = Optional.empty();
    emptyInstance.ifPresent(action);

    expect(action).not.toHaveBeenCalled();
  });

  test('calling with a non-function argument throws', () => {
    const nullArg = null;
    const objectArg = {};
    const errorThrown = new TypeError('invalid argument type for parameter "action"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresent()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresent(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresent(objectArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresent()).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresent(nullArg)).toThrow(errorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresent(objectArg)).toThrow(errorThrown);
  });
});
