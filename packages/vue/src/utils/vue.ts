import type { InjectionKey } from "vue";

/**
 * Creates an typed injection key.
 */
export function injectionKey<T>(name: string) {
  return Symbol(name) as InjectionKey<T>;
}
