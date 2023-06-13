import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "get"', () => {
  test('calling on a non-empty instance returns the present value', () => {
    const nonEmptyInstance = Optional.of<string>('');

    expect(() => nonEmptyInstance.get()).not.toThrow();
    expect(nonEmptyInstance.get()).toBe('');
  });

  test('calling on an empty instance throws', () => {
    const errorThrown = new Error('value not present');
    const emptyInstance = Optional.empty();

    expect(() => emptyInstance.get()).toThrow(errorThrown);
  });
});
