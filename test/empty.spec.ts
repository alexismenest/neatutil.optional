import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('static method "empty"', () => {
  test('calling returns an empty instance', () => {
    const emptyInstance = Optional.empty(); 

    expect(emptyInstance).toBeInstanceOf(Optional);
    expect(emptyInstance.isEmpty()).toBe(true);
    expect(emptyInstance.isPresent()).toBe(false);
  });
});
