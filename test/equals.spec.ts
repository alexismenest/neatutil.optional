import { 
  describe, 
  expect, 
  test 
} from '@jest/globals';
import { Optional } from '../src';

describe('instance method "equals"', () => {
  test('calling with another equivalent instance argument returns true', () => {
    const firstEmptyInstance = Optional.empty();
    const secondEmptyInstance = Optional.empty();
    const firstNonEmptyInstance = Optional.of<string>('');
    const secondNonEmptyInstance = Optional.of<string>('');
    
    expect(firstEmptyInstance.equals(secondEmptyInstance)).toBe(true);
    expect(firstEmptyInstance === secondEmptyInstance).toBe(true);
    expect(firstNonEmptyInstance.equals(secondNonEmptyInstance)).toBe(true);
    expect(firstNonEmptyInstance === secondNonEmptyInstance).toBe(false);
  });

  test('calling with another non-equivalent instance argument returns false', () => {
    const emptyInstance = Optional.empty();
    const firstNonEmptyInstance = Optional.of<string>('');
    const secondNonEmptyInstance = Optional.of<number>(0);
    
    expect(emptyInstance.equals(firstNonEmptyInstance)).toBe(false);
    expect(emptyInstance.equals(secondNonEmptyInstance)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(firstNonEmptyInstance.equals(emptyInstance)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(firstNonEmptyInstance.equals(secondNonEmptyInstance)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(secondNonEmptyInstance.equals(emptyInstance)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(secondNonEmptyInstance.equals(firstNonEmptyInstance)).toBe(false);
  });

  test('calling with an argument which is not an instance of Optional returns false', () => {
    const nullArg = null;
    const stringArg = '';
    const objectArg = {};
    const emptyInstance = Optional.empty();
    const nonEmptyInstance = Optional.of<string>('');
    
    // @ts-ignore: Testing wrong argument type
    expect(emptyInstance.equals()).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(emptyInstance.equals(nullArg)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(emptyInstance.equals(stringArg)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(emptyInstance.equals(objectArg)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(nonEmptyInstance.equals()).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(nonEmptyInstance.equals(nullArg)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(nonEmptyInstance.equals(stringArg)).toBe(false);
    // @ts-ignore: Testing wrong argument type
    expect(nonEmptyInstance.equals(objectArg)).toBe(false);
  });
});
