import { createGlobalState, useEventListener } from "@vueuse/core";
import { computed, onMounted, ref, toValue, useAttrs, type MaybeRefOrGetter } from "vue";
import type { AnyFunction } from "~/types";

export function useId(id?: MaybeRefOrGetter<string | null | undefined>) {
  const argId = computed(() => toValue(id));
  const rndId = ref("");

  onMounted(() => {
    rndId.value = Math.random()
      .toString(36)
      .slice(2, 6);
  });

  return computed(() => {
    return argId.value || rndId.value;
  });
}

export function useIdWithAttrs() {
  const attrs = useAttrs();
  return useId(() => attrs.id as string | undefined);
}

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

