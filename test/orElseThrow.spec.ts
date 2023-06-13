import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "orElseThrow"', () => {
  test('calling on a non-empty instance returns the present value', () => {
    const nonEmptyInstance = Optional.of<string>('');

    expect(() => nonEmptyInstance.orElseThrow()).not.toThrow();
    expect(nonEmptyInstance.orElseThrow()).toBe('');
  });

  test('calling on an empty instance throws', () => {
    const errorThrown = new Error('value not present');
    const emptyInstance = Optional.empty();

    expect(() => emptyInstance.orElseThrow()).toThrow(errorThrown);
  });
});
