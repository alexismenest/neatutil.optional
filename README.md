# NeatUtil.Optional
[![Build](https://github.com/alexismenest/neatutil.optional/actions/workflows/build.yml/badge.svg)](https://github.com/alexismenest/neatutil.optional/actions/workflows/build.yml)

A TypeScript isomorphic adaptation of Java's [Optional](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Optional.html).

All methods of Java's `Optional` class are implemented except for `hashCode` and `stream`.

## Installation
npm:
```bash
$ npm install neatutil.optional
```
yarn:
```bash
$ yarn add neatutil.optional
```

## Basic usage

```typescript
import { Optional } from 'neatutil.optional';

const emptyInstance = Optional.empty();
console.log(emptyInstance.isPresent()); // => false
console.log(emptyInstance.isEmpty()); // => true
console.log(emptyInstance.toString()); // => 'Optional.empty'

const nonEmptyInstance = Optional.of<string>('I love Espresso coffee.');
console.log(nonEmptyInstance.isPresent()); // => true
console.log(nonEmptyInstance.isEmpty()); // => false
console.log(nonEmptyInstance.get()); // => 'I love Espresso coffee.'
console.log(nonEmptyInstance.toString()); // => 'Optional[I love Espresso coffee.]'

const anotherEmptyInstance = Optional.ofNullable(null);
console.log(anotherEmptyInstance.isPresent()); // => false
console.log(anotherEmptyInstance.isEmpty()); // => true
console.log(anotherEmptyInstance.toString()); // => 'Optional.empty'

const anotherNonEmptyInstance = Optional.ofNullable<string>('I love Espresso coffee.');
console.log(anotherNonEmptyInstance.isPresent()); // => true
console.log(anotherNonEmptyInstance.isEmpty()); // => false
console.log(anotherNonEmptyInstance.get()); // => 'I love Espresso coffee.'
console.log(anotherNonEmptyInstance.toString()); // => 'Optional[I love Espresso coffee.]'

console.log(emptyInstance.equals(nonEmptyInstance)); // => false
console.log(emptyInstance.equals(anotherEmptyInstance)); // => true

console.log(nonEmptyInstance.equals(anotherNonEmptyInstance)); // => true
```

## API

```typescript
Optional<TValue>
```
A container object which may or may not contain a non-`nullish` value. If a value is present, `isPresent()` returns `true`. If no value is present, the object is considered empty and `isPresent()` returns `false`.

Additional methods that depend on the presence or absence of a contained value are provided, such as `orElse()` (returns a default value if no value is present) and `ifPresent()` (performs an action if a value is present).

This is a value-based class; instances that are equal should be treated as interchangeable.

`Optional` is primarily intended for use as a method return type where there is a clear need to represent "no result", and where using `null` or `undefined` is likely to cause errors. A variable whose type is `Optional` should never itself be `null` or `undefined`; it should always point to an `Optional` instance.

**Type Parameters:**

`TValue` - The type of value.

---

```typescript
static empty<TValue>(): Optional<TValue>
```
Returns an empty `Optional` instance. No value is present for this `Optional`.

**Type Parameters:**

`TValue` - The type of value.

**Returns:**

An empty `Optional` instance.

---

```typescript
static of<TValue>(value: TValue): Optional<TValue>
```
Returns an `Optional` instance describing the given non-`nullish` value.

**Type Parameters:**

`TValue` - The type of value.

**Parameters:**

`value` - The value to describe, which must be non-`nullish`.

**Returns:**

An `Optional` instance with the value present.

**Throws:**

`TypeError` - If value is `nullish`.

---

```typescript
static ofNullable<TValue>(value?: TValue): Optional<TValue>
```
Returns an `Optional` instance describing the given value, if non-`nullish`, otherwise returns an empty `Optional` instance.

**Type Parameters:**

`TValue` - The type of value.

**Parameters:**

`value` - The possibly-`nullish` value to describe.

**Returns:**

An `Optional` instance with a present value if the specified value is non-`nullish`, otherwise an empty `Optional` instance.

---

```typescript
equals(other: Optional<TValue>): boolean
```
Indicates whether some other `Optional` instance is "equal to" this `Optional` instance. 

The other `Optional` instance is considered equal if:
- both instances have no value present or;
- the present values are "equal to" each other.

**Parameters:**

`other` - An `Optional` instance to be tested for equality.

**Returns:**

`true` if the other `Optional` instance is "equal to" this `Optional` instance, otherwise `false`.

---

```typescript
filter(predicate: (value: TValue) => boolean): Optional<TValue>
```
If a value is present, and the value matches the given `predicate`, returns an `Optional` instance describing the value, otherwise returns an empty `Optional` instance.

**Parameters:**

`predicate` - The predicate to apply to the value, if present.

**Returns:**

An `Optional` instance describing the value of this `Optional`, if a value is present and the value matches the given `predicate`, otherwise an empty `Optional` instance.

**Throws:**

`TypeError` - If `predicate` is not a `function`.

---

```typescript
flatMap<UValue>(mapper: (value: TValue) => Optional<UValue>): Optional<UValue>
```
If a value is present, returns the result of applying the given `Optional`-bearing mapping `function` to the value, otherwise returns an empty `Optional` instance.

**Type Parameters:**

`UValue` - The type of value of the `Optional` instance returned by the mapping `function`.

**Parameters:**

`mapper` - The mapping `function` to apply to the value, if present.

**Returns:**

The result of applying an `Optional`-bearing mapping `function` to the value of this `Optional`, if a value is present, otherwise an empty `Optional` instance.

**Throws:**

`TypeError` - If `mapper` is not a `function` or does not return an `Optional` instance.

---

```typescript
get(): TValue
```
If a value is present, returns the value, otherwise throws.

**Returns:**

The non-`nullish` value described by this `Optional` instance.

**Throws:**

`Error` - If no value is present.

---

```typescript
ifPresent(action: (value: TValue) => void): void
```
If a value is present, performs the given `action` with the value, otherwise does nothing.

**Parameters:**

`action` - The action to be performed, if a value is present.

**Throws:**

`TypeError` - If `action` is not a `function`.

---

```typescript
ifPresentOrElse(action: (value: TValue) => void, emptyAction: () => void): void
```
If a value is present, performs the given `action` with the value, otherwise performs the given empty-based `action`.

**Parameters:**

`action` - The action to be performed, if a value is present.

`emptyAction` - The empty-based action to be performed, if no value is present.

**Throws:**

`TypeError` - If `action` or `emptyAction` is not a `function`.

---

```typescript
isEmpty(): boolean
```
If a value is not present, returns `true`, otherwise `false`.

**Returns:**

`true` if a value is not present, otherwise `false`.

---

```typescript
isPresent(): boolean
```
If a value is present, returns `true`, otherwise `false`.

**Returns:**

`true` if a value is present, otherwise `false`.

---

```typescript
map<UValue>(mapper: (value: TValue) => UValue): Optional<UValue>
```
If a value is present, returns an `Optional` instance describing the result of applying the given mapping `function` to the value, otherwise returns an empty `Optional` instance.

**Type Parameters:**

`UValue` - The type of the value returned from the mapping `function`.

**Parameters:**

`mapper` - The mapping `function` to apply to a value, if present.

**Returns:**

An `Optional` instance describing the result of applying a mapping `function` to the value of this `Optional`, if a value is present, otherwise an empty `Optional` instance.

**Throws:**

`TypeError` - If `mapper` is not a `function`.

---

```typescript
or(supplier: () => Optional<TValue>): Optional<TValue>
```
If a value is present, returns an `Optional` instance describing the value, otherwise returns an `Optional` instance produced by the supplying `function`.

**Parameters:**

`supplier` - The supplying `function` that produces an `Optional` instance to be returned.

**Returns:**

An `Optional` instance describing the value of this `Optional`, if a value is present, otherwise an `Optional` instance produced by the supplying `function`.

**Throws:**

`TypeError` - If `supplier` is not a `function` or does not return an `Optional` instance.

---

```typescript
orElse(other: TValue | null = null): TValue | null
```
If a value is present, returns the value, otherwise returns `other`.

**Parameters:**

`other` - The value to be returned, if no value is present. May be `nullish`.

**Returns:**

The value, if present, otherwise `other`.

---

```typescript
orElseGet(supplier: () => TValue | null): TValue | null
```
If a value is present, returns the value, otherwise returns the result produced by the supplying `function`.

**Parameters:**

`supplier` - The supplying `function` that produces a value to be returned.

**Returns:**

The value, if present, otherwise the result produced by the supplying `function`.

**Throws:**

`TypeError` - If `supplier` is not a `function`.

---

```typescript
orElseThrow(): TValue
```
If a value is present, returns the value, otherwise throws.

**Returns:**

The non-`nullish` value described by this `Optional`.

**Throws:**

`Error` - If no value is present.

---

```typescript
orElseGetThrow<TError extends Error>(errorSupplier: () => TError): TValue
```
If a value is present, returns the value, otherwise throws an error produced by the error supplying `function`.

**Type Parameters:**

`TError` - Type of the error to be thrown.

**Parameters:**

`errorSupplier` - The supplying `function` that produces an error to be thrown.

**Returns:**

The value, if present.

**Throws:**

`TError` - If no value is present.

`TypeError` - If `errorSupplier` is not a `function` or does not return an `Error` instance.

---

```typescript
toString(): string
```
Returns a non-empty `string` representation of this `Optional` suitable for debugging.

**Returns:**

The string representation of this instance.

## Copyright & license

Copyright (c) 2023 Alexis Loïc A. Menest - Released under the [MIT license](LICENSE).
