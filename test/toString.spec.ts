import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "toString"', () => {
  test('calling on a non-empty instance returns the string representation of this instance and the present value', () => {
    const nonEmptyInstance = Optional.of<number>(3.14159265359);

    expect(nonEmptyInstance.toString()).toBe('Optional[3.14159265359]');
  });

  test('calling on an empty instance returns the string representation of this instance', () => {
    const emptyInstance = Optional.empty();

    expect(emptyInstance.toString()).toBe('Optional.empty');
  });
});
