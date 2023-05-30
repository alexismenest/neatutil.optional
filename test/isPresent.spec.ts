import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "isPresent"', () => {
  test('calling on a non-empty instance returns true', () => {
    const nonEmptyInstance = Optional.of(''); 

    expect(nonEmptyInstance.isPresent()).toBe(true);
  });

  test('calling on an empty instance returns false', () => {
    const emptyInstance = Optional.empty(); 

    expect(emptyInstance.isPresent()).toBe(false);
  });
});
