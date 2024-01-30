import { createGlobalState, useEventListener } from "@vueuse/core";
import { computed, ref } from "vue";
import type { AnyFunction } from "~/types";

export const useIsKeyboardModality = createGlobalState(() => {
  const isKeyboardModality = ref(false);

  useEventListener("mousedown", (event) => {
    const target = event.target as HTMLElement | EventTarget | null;
    if (target && "hasAttribute" in target) {
      if (!target.hasAttribute("data-focus-visible")) {
        isKeyboardModality.value = false;
      }
    }
  }, true);
  useEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    isKeyboardModality.value = true;
  }, true);

  return isKeyboardModality;
});

/**
 * A hook that passes metadata props around without leaking them to the DOM.
 */
export function useMetadataProps<T, K extends keyof any>(
  attrs: Record<string, unknown>,
  key: K,
  value: T,
) {
  const parent = computed(() => {
    const parent = attrs.onLoadedMetadataCapture;
    return parent as (AnyFunction & Record<K, T>) | undefined;
  });

  return {
    isDuplicated: computed(() => !!parent.value?.[key]),
    metadataAttrs: computed(() => ({
      onLoadedMetadataCapture: Object.assign(
        () => {},
        { ...parent.value, [key]: value },
      ),
    })),
  };
}

