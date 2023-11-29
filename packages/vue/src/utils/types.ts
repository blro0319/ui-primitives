import type { ToRef, UnwrapRef } from "vue";

/**
 * Same as `keyof any`
 */
export type AnyKey = string | number | symbol;
export type AnyObject = Record<string, unknown>;
export type AnyFunction = (...args: unknown[]) => unknown;

export type MaybeArray<T> = T | T[];
/**
 * @example
 * ```ts
 * type Foo = MaybeRefs<{ foo: number; bar: Ref<string> }>;
 * // Same as:
 * type Foo = { foo: number | Ref<number>; bar: string | Ref<string> }
 * ```
 */
export type MaybeRefs<T extends AnyObject> = {
  [K in keyof T]: UnwrapRef<T[K]> | ToRef<T[K]>;
};

export type Nullish = null | undefined;
export type Nullable<T> = T | Nullish;

export type Prettify<T extends Record<AnyKey, unknown>> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;
