import { toValue, unrefElement } from "@vueuse/core";
import {
  type ComponentPublicInstance,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";
import { useId } from "~/composables";
import { createContext } from "~/utils";
import type { VBindAttributes } from "~/types";
import type {
  VAccordionContextOptions,
  VAccordionItemContextOptions,
} from "./types";

const root = createContext(
  "<VAccordion>",
  (options: VAccordionContextOptions = {}) => {
    const expandMode = computed(() => toValue(options.expandMode) || "single");
    const id = useId("v-accordion");

    // ----- Root ----- //

    const root = ref<ComponentPublicInstance | HTMLElement>();
    const rootElement = computed(() => unrefElement(root.value));

    const rootBind = computed(() => {
      return {
        ref: root,
        onKeydown: handleKeyDown,
      } satisfies VBindAttributes;
    });

    function handleKeyDown(event: KeyboardEvent) {
      event.stopPropagation();

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          moveFocus("prev");
          break;
        case "ArrowDown":
          event.preventDefault();
          moveFocus("next");
          break;
        case "Home":
          event.preventDefault();
          Array.from(triggers.value).at(0)?.focus();
          break;
        case "End":
          event.preventDefault();
          Array.from(triggers.value).at(-1)?.focus();
          break;
      }
    }

    function moveFocus(direction: "prev" | "next") {
      const items = Array.from(triggers.value);
      const activeIndex = items.findIndex((item) => {
        return item === document.activeElement;
      });
      const nextIndex = activeIndex + (direction === "prev" ? -1 : 1);
      if (nextIndex < 0) return items.at(-1)?.focus();
      else if (nextIndex >= items.length) return items.at(0)?.focus();
      else items.at(nextIndex)?.focus();
    }

    // ----- Triggers ----- //

    const triggers = ref<Set<HTMLElement>>(new Set());

    onMounted(() => {
      nextTick(updateTriggers);
    });
    onUpdated(updateTriggers);

    function updateTriggers() {
      if (!rootElement.value) return;
      const buttons = rootElement.value.querySelectorAll<HTMLElement>(
        `[data-v-accordion-trigger="${id.value}"]`
      );
      triggers.value = new Set(Array.from(buttons));
    }

    // ----- Items ----- //

    const activeItems = ref<string[]>([]);

    function toggleItem(id: string) {
      if (activeItems.value.includes(id)) hideItem(id);
      else showItem(id);
    }
    function showItem(id: string) {
      if (activeItems.value.includes(id)) return;
      if (expandMode.value === "single") activeItems.value = [id];
      else activeItems.value.push(id);
      addRenderedItem(id);
    }
    function hideItem(id: string) {
      activeItems.value = activeItems.value.filter((i) => i !== id);
    }

    const renderedItems = ref<string[]>([]);
    function addRenderedItem(id: string) {
      if (renderedItems.value.includes(id)) return;
      renderedItems.value.push(id);
    }
    function removeRenderedItem(id: string) {
      renderedItems.value = renderedItems.value.filter((i) => i !== id);
    }

    return {
      expandMode,
      id,
      // Root
      root,
      rootElement,
      rootBind,
      // Triggers
      triggers,
      // Items
      activeItems,
      toggleItem,
      showItem,
      hideItem,
      renderedItems,
      addRenderedItem,
      removeRenderedItem,
    };
  }
);

export const setVAccordionContext = root.setContext;
export const useVAccordionContext = root.useContext;

// ----- Item ----- //

const item = createContext(
  "<VAccordionItem>",
  (options?: VAccordionItemContextOptions) => {
    const initialOpened = computed(() => toValue(options?.open) || false);
    const { activeItems, toggleItem, showItem, hideItem, removeRenderedItem } =
      useVAccordionContext("<VAccordionItem>");

    const id = useId("v-accordion-item");
    const triggerId = computed(() => `${id.value}-trigger`);
    const panelId = computed(() => `${id.value}-content`);

    const isMounted = ref(false);
    const visible = computed(() => {
      if (!isMounted.value) return initialOpened.value;
      return activeItems.value.includes(panelId.value);
    });

    onMounted(() => {
      if (initialOpened.value) showItem(panelId.value);
      isMounted.value = true;
    });
    onUnmounted(() => removeRenderedItem(panelId.value));

    function toggle() {
      toggleItem(panelId.value);
    }
    function show() {
      showItem(panelId.value);
    }
    function hide() {
      hideItem(panelId.value);
    }

    return {
      initialOpened,
      id,
      triggerId,
      panelId,
      visible,
      toggle,
      show,
      hide,
    };
  }
);

export const setVAccordionItemContext = item.setContext;
export const useVAccordionItemContext = item.useContext;

// ----- Header ----- //

const header = createContext("<VAccordionHeader>", () => {
  const id = useId("v-accordion-header");
  return { id };
});

export const setVAccordionHeaderContext = header.setContext;
export const useVAccordionHeaderContext = header.useContext;
