import { createGlobalState, useEventListener } from "@vueuse/core";
import { ref } from "vue";

export const useKeyboardModality = createGlobalState(() => {
  const isKeyboardModality = ref(true);

  useEventListener("mousedown", (event) => {
    const target = event.target as HTMLElement | EventTarget | null;
    if (!target || !("hasAttribute" in target)) return;
    if (!target.getAttribute("data-focus-visible")) {
      isKeyboardModality.value = false;
    }
  });
  useEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    isKeyboardModality.value = true;
  });

  return isKeyboardModality;
});
