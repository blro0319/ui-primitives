import { inject, provide, type InjectionKey } from "vue";

export function setVGroupContext(context: VGroupContext) {
  provide(INJECTION_KEY, context);
}
export function useVGroupContext() {
  return inject(INJECTION_KEY, undefined);
}

const INJECTION_KEY = Symbol("VGroup") as InjectionKey<VGroupContext>;
interface VGroupContext {
  labelId: string;
}
