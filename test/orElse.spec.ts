import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "orElse"', () => {
  test('calling on a non-empty instance returns the present value', () => {
    const nonEmptyInstance = Optional.of<string>('');

    expect(nonEmptyInstance.orElse()).toBe('');
    expect(nonEmptyInstance.orElse(null)).toBe('');
    expect(nonEmptyInstance.orElse('0')).toBe('');
  });

  test('calling on an empty instance returns the maybe-nullish argument value', () => {
    const emptyInstance = Optional.empty();

    expect(emptyInstance.orElse()).toBe(null);
    expect(emptyInstance.orElse(null)).toBe(null);
    expect(emptyInstance.orElse('')).toBe('');
    expect(emptyInstance.orElse(0)).toBe(0);
  });
});
