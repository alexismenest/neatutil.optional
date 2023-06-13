import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('static method "of"', () => {
  test('calling with a non-nullish value argument returns a non-empty instance', () => {
    const nonEmptyInstance = Optional.of<string>('');

    expect(nonEmptyInstance).toBeInstanceOf(Optional);
    expect(nonEmptyInstance.isEmpty()).toBe(false);
    expect(nonEmptyInstance.isPresent()).toBe(true);
    expect(nonEmptyInstance.get()).toBe('');
  });

  test('calling with a nullish value argument throws', () => {
    const errorThrown = new TypeError('invalid argument type for parameter "value"; expected: "non-nullish"');

    // @ts-expect-error: Testing wrong argument type
    expect(() => Optional.of<undefined>()).toThrow(errorThrown);
    expect(() => Optional.of<undefined>(void 0)).toThrow(errorThrown);
    expect(() => Optional.of<null>(null)).toThrow(errorThrown);
  });
});
