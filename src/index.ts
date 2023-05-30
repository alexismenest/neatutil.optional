import isEqual from 'lodash.isequal';

const ACTION = '"action"';
const EMPTY_ACTION = '"emptyAction"';
const EXPECTED = '; expected: ';
const ERROR = '"Error"';
const ERROR_SUPPLIER = '"errorSupplier"';
const FUNCTION = '"function"';
const INVALID = 'invalid';
const MAPPER = '"mapper"';
const NON_NULLISH = '"non-nullish"';
const OPTIONAL = '"Optional"';
const OPTIONAL_TS = 'Optional';
const OPTIONAL_EMPTY = 'Optional.empty';
const PREDICATE = '"predicate"';
const SUPPLIER = '"supplier"';
const TYPE_FOR = 'type for';
const VALUE = '"value"';
const VALUE_NOT_PRESENT = 'value not present';
const INVALID_ARGUMENT_TYPE_FOR_PARAMETER = `${INVALID} argument ${TYPE_FOR} parameter `;
const INVALID_RETURN_TYPE_FOR_METHOD = `${INVALID} return ${TYPE_FOR} method `;

function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

function isNullish(value: unknown): boolean {
  return value === null || value === undefined;
}

function invalidArgTypeErrorMessage(strings: TemplateStringsArray, paramNameExp: string, typeExp: string): string {
  return `${INVALID_ARGUMENT_TYPE_FOR_PARAMETER}${paramNameExp}${EXPECTED}${typeExp}`;
}

function invalidReturnTypeErrorMessage(strings: TemplateStringsArray, funcNameExp: string, typeExp: string): string {
  return `${INVALID_RETURN_TYPE_FOR_METHOD}${funcNameExp}${EXPECTED}${typeExp}`;
}

/**
 * A container object which may or may not contain a non-`nullish` value.
 *
 * @template TValue The type of value.
 */
export class Optional<TValue> {
  /**
   * Common empty instance
   */
  static #EMPTY_INSTANCE = new Optional();

  /**
   * If non-`nullish`, the value; if `nullish`, indicates no value is present.
   */
  #value: TValue | undefined;

  private constructor(value?: TValue) {
    this.#value = value;
  }

  /**
   * Returns an empty `Optional` instance. No value is present for this `Optional`.
   *
   * @template TEValue The type of value.
   * @returns {Optional<TEValue>} An empty `Optional` instance.
   */
  public static empty<TEValue>(): Optional<TEValue> {
    return Optional.#EMPTY_INSTANCE as Optional<TEValue>;
  }

  /**
   * Returns an `Optional` instance describing the given non-`nullish` value.
   *
   * @template TOValue The type of value.
   * @param {TOValue} value The value to describe, which must be non-`nullish`.
   * @returns {Optional<TOValue>} An `Optional` instance with the value present.
   * @throws {TypeError} If value is `nullish`.
   */
  public static of<TOValue>(value: TOValue): Optional<TOValue> {
    if (isNullish(value) === true) {
      throw new TypeError(invalidArgTypeErrorMessage`${VALUE}${NON_NULLISH}`);
    }

    return new Optional<TOValue>(value);
  }

  /**
   * Returns an `Optional` instance describing the given value, if non-`nullish`, 
   * otherwise returns an empty `Optional` instance.
   *
   * @template TONValue The type of value.
   * @param {TONValue} value The possibly-`nullish` value to describe.
   * @returns {Optional<TONValue>} An `Optional` instance with a present value if the specified value is non-`nullish`, 
   * otherwise an empty `Optional` instance.
   */
  public static ofNullable<TONValue>(value?: TONValue): Optional<TONValue> {
    return isNullish(value) === true ? Optional.#EMPTY_INSTANCE as Optional<TONValue> : new Optional<TONValue>(value);
  }

  /**
   * Indicates whether some other `Optional` instance is "equal to" this `Optional` instance. 
   * The other `Optional` instance is considered equal if:
   *   - both instances have no value present or;
   *   - the present values are "equal to" each other.
   *
   * @param {Optional<TValue>} other An `Optional` instance to be tested for equality.
   * @returns {boolean} `true` if the other `Optional` instance is "equal to" this `Optional` instance, otherwise `false`.
   */
  public equals(other: Optional<TValue>): boolean {
    if (this === other) {
      return true;
    }

    return (other instanceof Optional) && isEqual(this.#value, other.#value);
  }

  /**
   * If a value is present, and the value matches the given `predicate`, 
   * returns an `Optional` instance describing the value, 
   * otherwise returns an empty `Optional` instance.
   *
   * @param {(value: TValue) => boolean} predicate The `predicate` to apply to the value, if present.
   * @returns {Optional<TValue>} An `Optional` instance describing the value of this `Optional`, 
   * if a value is present and the value matches the given `predicate`, otherwise an empty `Optional` instance.
   * @throws {TypeError} If `predicate` is not a `function`.
   */
  public filter(predicate: (value: TValue) => boolean): Optional<TValue> {
    if (isFunction(predicate) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${PREDICATE}${FUNCTION}`);
    }

    if ((this.isPresent() === true) && (predicate(this.#value as TValue) === true)) {
      return this;
    }

    return Optional.empty<TValue>();
  }

  /**
   * If a value is present, returns the result of applying the given `Optional`-bearing 
   * mapping `function` to the value, otherwise returns an empty `Optional` instance.
   *
   * @template TMValue The type of value of the `Optional` instance returned by the mapping `function`.
   * @param {(value: TValue) => Optional<TMValue>} mapper The mapping `function` to apply to the value, if present.
   * @returns {Optional<TMValue>} The result of applying an `Optional`-bearing mapping `function` to the value of 
   * this `Optional`, if a value is present, otherwise an empty `Optional` instance.
   * @throws {TypeError} If `mapper` is not a `function` or does not return an `Optional` instance.
   */
  public flatMap<TMValue>(mapper: (value: TValue) => Optional<TMValue>): Optional<TMValue> {
    if (isFunction(mapper) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${MAPPER}${FUNCTION}`);
    }

    if (this.isPresent() === true) {
      const mappingResult = mapper(this.#value as TValue);

      if ((mappingResult instanceof Optional) === false) {
        throw new TypeError(invalidReturnTypeErrorMessage`${MAPPER}${OPTIONAL}`);
      }

      return mappingResult;
    }

    return Optional.empty<TMValue>();
  }

  /**
   * If a value is present, returns the value, otherwise throws.
   *
   * @returns {TValue} The non-`nullish` value described by this `Optional` instance.
   * @throws {Error} If no value is present.
   */
  public get(): TValue {
    if (this.isPresent() === false) {
      throw new Error(VALUE_NOT_PRESENT);
    }

    return this.#value as TValue;
  }

  /**
   * If a value is present, performs the given `action` with the value, otherwise does nothing.
   *
   * @param {(value: TValue) => void} action The `action` to be performed, if a value is present.
   * @throws {TypeError} If `action` is not a `function`.
   */
  public ifPresent(action: (value: TValue) => void): void {
    if (isFunction(action) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${ACTION}${FUNCTION}`);
    }

    if (this.isPresent() === true) {
      action(this.#value as TValue);
    }
  }

  /**
   * If a value is present, performs the given `action` with the value, 
   * otherwise performs the given empty-based `action`.
   *
   * @param {(value: TValue) => void} action The `action` to be performed, if a value is present.
   * @param {() => void} emptyAction The empty-based `action` to be performed, if no value is present.
   * @throws {TypeError} If `action` or `emptyAction` is not a `function`.
   */
  public ifPresentOrElse(action: (value: TValue) => void, emptyAction: () => void): void {
    if (isFunction(action) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${ACTION}${FUNCTION}`);
    }

    if (isFunction(emptyAction) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${EMPTY_ACTION}${FUNCTION}`);
    }

    if (this.isPresent() === true) {
      action(this.#value as TValue);
    } else {
      emptyAction();
    }
  }

  /**
   * If a value is not present, returns `true`, otherwise `false`.
   *
   * @returns {boolean} `true` if a value is not present, otherwise `false`.
   */
  public isEmpty(): boolean {
    return isNullish(this.#value) === true;
  }

  /**
   * If a value is present, returns `true`, otherwise `false`.
   *
   * @returns {boolean} `true` if a value is present, otherwise `false`.
   */
  public isPresent(): boolean {
    return isNullish(this.#value) === false;
  }

  /**
   * If a value is present, returns an `Optional` instance describing 
   * the result of applying the given mapping `function` to the value, 
   * otherwise returns an empty `Optional` instance.
   *
   * @template TMValue The type of the value returned from the mapping `function`.
   * @param {(value: TValue) => TMValue} mapper The mapping `function` to apply to a value, if present.
   * @returns {Optional<TMValue>} An `Optional` instance describing the result of applying a mapping `function` 
   * to the value of this `Optional`, if a value is present, otherwise an empty `Optional` instance.
   * @throws {TypeError} If `mapper` is not a `function`.
   */
  public map<TMValue>(mapper: (value: TValue) => TMValue): Optional<TMValue> {
    if (isFunction(mapper) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${MAPPER}${FUNCTION}`);
    }

    if (this.isPresent() === true) {
      return Optional.ofNullable<TMValue>(mapper(this.#value as TValue));
    }

    return Optional.empty<TMValue>();
  }

  /**
   * If a value is present, returns an `Optional` instance describing the value, 
   * otherwise returns an `Optional` instance produced by the supplying `function`.
   *
   * @param {() => Optional<TValue>} supplier The supplying `function` that produces an `Optional` instance to be returned.
   * @returns {Optional<TValue>} An `Optional` instance describing the value of this `Optional`, if a value is present, 
   * otherwise an `Optional` instance produced by the supplying `function`.
   * @throws {TypeError} If `supplier` is not a `function` or does not return an `Optional` instance.
   */
  public or(supplier: () => Optional<TValue>): Optional<TValue> {
    if (isFunction(supplier) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${SUPPLIER}${FUNCTION}`);
    }

    if (this.isPresent() === true) {
      return this;
    }

    const supplyingResult = supplier();

    if ((supplyingResult instanceof Optional) === false) {
      throw new TypeError(invalidReturnTypeErrorMessage`${SUPPLIER}${OPTIONAL}`);
    }

    return supplyingResult;
  }

  /**
   * If a value is present, returns the value, otherwise returns other.
   *
   * @param {TValue | null} other The value to be returned, if no value is present. May be `nullish`.
   * @returns {TValue | null} The value, if present, otherwise other.
   */
  public orElse(other: TValue | null = null): TValue | null {
    return this.isPresent() === true ? this.#value as TValue : other;
  }

  /**
   * If a value is present, returns the value, otherwise returns the result produced by the supplying `function`.
   *
   * @param {() => TValue | null} supplier The supplying `function` that produces a value to be returned.
   * @returns {TValue | null} The value, if present, otherwise the result produced by the supplying `function`.
   * @throws {TypeError} If `supplier` is not a `function`.
   */
  public orElseGet(supplier: () => TValue | null): TValue | null {
    if (isFunction(supplier) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${SUPPLIER}${FUNCTION}`);
    }

    if (this.isPresent() === true) {
      return this.#value as TValue;
    }

    const supplyingResult = supplier();

    return isNullish(supplyingResult) === false ? supplyingResult : null;
  }

  /**
   * If a value is present, returns the value, otherwise throws.
   *
   * @returns {TValue} The non-`nullish` value described by this `Optional`.
   * @throws {Error} If no value is present.
   */
  public orElseThrow(): TValue {
    if (this.isPresent() === false) {
      throw new Error(VALUE_NOT_PRESENT);
    }

    return this.#value as TValue;
  }

  /**
   * If a value is present, returns the value, otherwise throws an error produced by the error supplying `function`.
   *
   * @template TSError Type of the error to be thrown.
   * @param {() => TSError} errorSupplier The supplying `function` that produces an error to be thrown.
   * @returns {TValue} The value, if present.
   * @throws {TSError} If no value is present.
   * @throws {TypeError} If `errorSupplier` is not a `function` or does not return an `Error` instance.
   */
  public orElseGetThrow<TSError extends Error>(errorSupplier: () => TSError): TValue {
    if (isFunction(errorSupplier) === false) {
      throw new TypeError(invalidArgTypeErrorMessage`${ERROR_SUPPLIER}${FUNCTION}`);
    }

    if (this.isPresent() === false) {
      const supplyingResult = errorSupplier();

      if ((supplyingResult instanceof Error) === false) {
        throw new TypeError(invalidReturnTypeErrorMessage`${ERROR_SUPPLIER}${ERROR}`);
      }

      throw supplyingResult;
    }

    return this.#value as TValue;
  }

  /**
   * Returns a non-empty `string` representation of this `Optional` suitable for debugging.
   *
   * @returns {string} The `string` representation of this instance.
   */
  public toString(): string {
    return this.isPresent() === true ? `${OPTIONAL_TS}[${this.#value}]` : OPTIONAL_EMPTY;
  }
}
