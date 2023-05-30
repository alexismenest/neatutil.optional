import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('static method "ofNullable"', () => {
  test('calling with a non-nullish value argument returns a non-empty instance', () => {
    const nonEmptyInstance = Optional.ofNullable<string>('');

    expect(nonEmptyInstance).toBeInstanceOf(Optional);
    expect(nonEmptyInstance.isEmpty()).toBe(false);
    expect(nonEmptyInstance.isPresent()).toBe(true);
    expect(nonEmptyInstance.get()).toBe('');
  });

  test('calling with a nullish value argument returns an empty instance', () => {
    const firstEmptyInstance = Optional.ofNullable<undefined>();
    const secondEmptyInstance = Optional.ofNullable<undefined>(void 0);
    const thirdEmptyInstance = Optional.ofNullable<null>(null);

    expect(firstEmptyInstance).toBeInstanceOf(Optional);
    expect(firstEmptyInstance.isEmpty()).toBe(true);
    expect(firstEmptyInstance.isPresent()).toBe(false);
    expect(secondEmptyInstance).toBeInstanceOf(Optional);
    expect(secondEmptyInstance.isEmpty()).toBe(true);
    expect(secondEmptyInstance.isPresent()).toBe(false);
    expect(thirdEmptyInstance).toBeInstanceOf(Optional);
    expect(thirdEmptyInstance.isEmpty()).toBe(true);
    expect(thirdEmptyInstance.isPresent()).toBe(false);
  });
});
