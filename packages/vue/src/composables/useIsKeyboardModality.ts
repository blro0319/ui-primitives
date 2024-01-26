import { createGlobalState, useEventListener } from "@vueuse/core";
import { ref } from "vue";

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
