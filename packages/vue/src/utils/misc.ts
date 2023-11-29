import type { AnyKey, AnyObject } from "@blro/ui-primitives-vue";

/**
 * Checks whether `key` is an own property of `object` or not.
 *
 * @example
 * ```ts
 * hasOwnProperty({ foo: 1 }, "foo"); // true
 * hasOwnProperty({ foo: 1 }, "bar"); // false
 * ```
 */
export function hasOwnProperty<T extends AnyObject>(
  object: T,
  key: AnyKey
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(object, key);
}

/**
 * Omits specific keys from an object.
 *
 * @example
 * ```ts
 * omit({ foo: 1, bar: 2 }, ["foo"]); // { bar: 2 }
 * omit({ foo: 1, bar: 2 }, ["foot", "bar"]); // {}
 * ```
 */
export function omit<T extends AnyObject, K extends keyof T>(
  object: T,
  keys: ReadonlyArray<K> | K[]
) {
  const result = { ...object };
  for (const key of keys) {
    if (hasOwnProperty(result, key)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete result[key];
    }
  }
  return result;
}

/**
 * Asserts that a condition is truthy, otherwise throws an error.
 *
 * @example
 * ```ts
 * invariant(someValue, "Invariant failed");
 * someValue; // someValue is now asserted to be truthy
 * ```
 */
export function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (condition) return;
  if (typeof message !== "string") throw new Error("Invariant failed");
  throw new Error(message);
}
