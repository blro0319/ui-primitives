import type { InjectionKey } from "vue";

export function injectionKey<T>(name: string) {
  return Symbol(name) as InjectionKey<T>;
}
