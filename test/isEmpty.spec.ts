import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "isEmpty"', () => {
  test('calling on a non-empty instance returns false', () => {
    const nonEmptyInstance = Optional.of(''); 

    expect(nonEmptyInstance.isEmpty()).toBe(false);
  });

  test('calling on an empty instance returns true', () => {
    const emptyInstance = Optional.empty(); 

    expect(emptyInstance.isEmpty()).toBe(true);
  });
});
