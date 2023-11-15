<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/focusable
 */

import { isButton } from "@ariakit/core/utils/dom";
import {
  isFocusEventOutside,
  isSelfTarget,
  queueBeforeEvent,
} from "@ariakit/core/utils/events";
import {
  focusIfNeeded,
  hasFocus,
  isFocusable,
} from "@ariakit/core/utils/focus";
import { isSafari } from "@ariakit/core/utils/platform";
import {
  VPrimitive,
  useKeyboardModality,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { unrefElement, useIntersectionObserver } from "@vueuse/core";
import { logicAnd } from "@vueuse/math";
import { computed, ref, toRefs, useAttrs, watch } from "vue";

export type VFocusableProps = VPrimitiveProps & {
  /**
   * @default
   * ```ts
   * true
   * ```
   */
  focusable?: boolean;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  autofocus?: boolean;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  disabled?: boolean;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  accessibleWhenDisabled?: boolean;
};

const ALWAYS_FOCUS_VISIBLE_INPUT_TYPES = [
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "number",
  "date",
  "month",
  "week",
  "time",
  "datetime",
  "datetime-local",
];
</script>

<script setup lang="ts">
defineOptions({
  name: "VFocusable",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VFocusableProps>(), {
  focusable: true,
  autofocus: false,
  disabled: false,
  accessibleWhenDisabled: false,
});

const { focusable, autofocus, disabled, accessibleWhenDisabled } =
  toRefs(props);

const attrs = useAttrs();

const root = ref<InstanceType<typeof VPrimitive>>();
const rootElement = computed(() => unrefElement(root.value));

const isKeyboardModality = useKeyboardModality();
const focusVisible = ref(false);

const focusableDisabled = computed(() => focusable.value && disabled.value);
const trulyDisabled = computed(() => {
  return focusableDisabled.value && !accessibleWhenDisabled.value;
});
// When the focusable element is disabled, it doesn't trigger a blur event so we
// can't set focusVisible to false there. Instead, we have to do it here by
// checking the element's disabled attribute.
watch(trulyDisabled, (trulyDisabled) => {
  if (!focusable.value) return;
  if (trulyDisabled && focusVisible.value) focusVisible.value = false;
});

// When an element that has focus becomes hidden, it doesn't trigger a blur
// event so we can't set focusVisible to false there. We observe the element and
// check if it's still focusable. Otherwise, we set focusVisible to false.
const observer = useIntersectionObserver(
  rootElement,
  () => {
    if (!focusable.value) return;
    if (!rootElement.value) return;
    if (!isFocusable(rootElement.value)) focusVisible.value = false;
  },
  { immediate: false }
);
watch(logicAnd(focusable, focusVisible), (value) => {
  if (!value) observer.stop();
  else observer.resume();
});

function preventDefaultWhenDisabled(event: Event) {
  if (event.defaultPrevented) return;
  if (focusableDisabled.value) {
    event.stopPropagation();
    event.preventDefault();
  }
}

function handleMouseDown(event: MouseEvent) {
  preventDefaultWhenDisabled(event);
  if (event.defaultPrevented) return;
  if (!focusable.value) return;
  if (!isSafari()) return;

  const element = event.currentTarget as HTMLElement | null;
  if (!element) return;
  if (!isButton(element) && !isCheckboxOrRadio(element)) return;

  let receivedFocus = false;
  const handleFocus = () => {
    receivedFocus = true;
  };

  element.addEventListener("focusin", handleFocus, {
    once: true,
    capture: true,
  });

  queueBeforeEvent(element, "mouseup", () => {
    element.removeEventListener("focusin", handleFocus, true);
    if (!receivedFocus) focusIfNeeded(element);
  });

  function isCheckboxOrRadio(element: { tagName: string; type?: string }) {
    if (element.tagName !== "INPUT" && !element.type) return false;
    return element.type === "radio" || element.type === "checkbox";
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  if (!focusable.value) return;
  if (focusVisible.value) return;
  if (event.metaKey || event.altKey || event.ctrlKey) return;
  if (!isSelfTarget(event)) return;
  setFocusVisibleByEvent(event);
}

function handleFocus(event: FocusEvent) {
  if (event.defaultPrevented) return;
  if (!focusable.value) return;
  if (!isSelfTarget(event)) {
    focusVisible.value = false;
    return;
  }
  const element = event.currentTarget as HTMLElement | null;
  if (!element) return;

  if (isKeyboardModality.value || isAlwaysFocusVisible(element)) {
    setFocusVisibleByEvent(event);
  } else {
    focusVisible.value = false;
  }

  function isAlwaysFocusVisible(element: HTMLElement) {
    const { tagName, readOnly, type } = element as HTMLInputElement;
    if (tagName === "TEXTAREA" && !readOnly) return true;
    if (tagName === "SELECT" && !readOnly) return true;
    if (tagName === "INPUT" && !readOnly) {
      return ALWAYS_FOCUS_VISIBLE_INPUT_TYPES.includes(type);
    }
    if (element.isContentEditable) return true;
    if (element.role === "combobox") return false;
    return !!element.dataset.name;
  }
}
function handleBlur(event: FocusEvent) {
  if (!focusable.value) return;
  if (!isFocusEventOutside(event)) return;
  focusVisible.value = false;
}

function setFocusVisibleByEvent(event: Event) {
  if (!focusable.value) return;
  if (event.defaultPrevented) return;
  const element = event.currentTarget as HTMLElement | null;
  if (!element || !hasFocus(element)) return;
  focusVisible.value = true;
}

const tabindex = computed(() => {
  if (!focusable.value) return attrs.tabindex;
  if (trulyDisabled.value) {
    if (nativeTabbable.value && !supportsDisabled.value) {
      return -1;
    }
    return;
  }
  if (nativeTabbable.value) {
    return attrs.tabindex;
  }
  return attrs.tabindex ?? 0;
});

const nativeTabbable = computed(() => {
  if (!rootElement.value) return false;
  return (
    rootElement.value.tagName === "BUTTON" ||
    rootElement.value.tagName === "INPUT" ||
    rootElement.value.tagName === "SELECT" ||
    rootElement.value.tagName === "TEXTAREA" ||
    rootElement.value.tagName === "A"
  );
});
const supportsDisabled = computed(() => {
  if (!rootElement.value) return false;
  return (
    rootElement.value.tagName === "BUTTON" ||
    rootElement.value.tagName === "INPUT" ||
    rootElement.value.tagName === "SELECT" ||
    rootElement.value.tagName === "TEXTAREA"
  );
});
</script>

<template>
  <VPrimitive
    v-bind="attrs"
    :as="as"
    :as-child="asChild"
    :autofocus="autofocus && focusable"
    :disabled="supportsDisabled && trulyDisabled ? true : undefined"
    :contenteditable="focusableDisabled ? undefined : attrs.contenteditable"
    :tabindex="tabindex"
    ref="root"
    :style="{ pointerEvent: trulyDisabled ? 'none' : undefined }"
    :aria-disabled="focusableDisabled ? true : undefined"
    :data-focus-visible="focusable && focusVisible ? '' : undefined"
    @focus.capture="handleFocus"
    @blur="handleBlur"
    @keydown.capture="handleKeyDown"
    @keypress.capture="preventDefaultWhenDisabled"
    @mousedown.capture="handleMouseDown"
    @click.capture="preventDefaultWhenDisabled"
  >
    <slot />
  </VPrimitive>
</template>
