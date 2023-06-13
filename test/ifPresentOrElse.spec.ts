import { 
  describe, 
  expect, 
  jest, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "ifPresentOrElse"', () => {
  test('calling on a non-empty instance performs the given action with the present value', () => {
    let n = 1;
    const action = jest.fn((value: number) => { n += value; });
    const emptyAction = jest.fn(() => { console.log(); });
    const nonEmptyInstance = Optional.of<number>(4);
    nonEmptyInstance.ifPresentOrElse(action, emptyAction);

    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith(4);
    expect(action).toHaveReturnedWith(undefined);
    expect(n).toBe(5);
    expect(emptyAction).not.toHaveBeenCalled();
  });

  test('calling on an empty instance performs the given empty-based action', () => {
    let n = 1;
    const action = jest.fn(value => { console.log(value); });
    const emptyAction = jest.fn(() => { n += 4; });
    const emptyInstance = Optional.empty();
    emptyInstance.ifPresentOrElse(action, emptyAction);

    expect(emptyAction).toHaveBeenCalledTimes(1);
    expect(emptyAction).toHaveReturnedWith(undefined);
    expect(n).toBe(5);
    expect(action).not.toHaveBeenCalled();
  });

  test('calling with a non-function argument throws', () => {
    const action = (value: unknown) => { console.log(value); };
    const emptyAction = () => { console.log(); };
    const nullArg = null;
    const objectArg = {};
    const actionErrorThrown = new TypeError('invalid argument type for parameter "action"; expected: "function"');
    const emptyActionErrorThrown = new TypeError('invalid argument type for parameter "emptyAction"; expected: "function"');
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');

    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse()).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(nullArg)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(nullArg, emptyAction)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(objectArg)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(objectArg, emptyAction)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(action)).toThrow(emptyActionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(action, nullArg)).toThrow(emptyActionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => emptyInstance.ifPresentOrElse(action, objectArg)).toThrow(emptyActionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse()).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(nullArg)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(nullArg, emptyAction)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(objectArg)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(objectArg, emptyAction)).toThrow(actionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(action)).toThrow(emptyActionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(action, nullArg)).toThrow(emptyActionErrorThrown);
    // @ts-expect-error: Testing wrong argument type
    expect(() => nonEmptyInstance.ifPresentOrElse(action, objectArg)).toThrow(emptyActionErrorThrown);
  });
});
