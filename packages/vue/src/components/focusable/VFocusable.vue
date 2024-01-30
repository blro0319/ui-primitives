<script lang="ts">
import { unrefElement, whenever } from "@vueuse/core";
import { and } from "@vueuse/math";
import {
  type ComponentPublicInstance,
  type StyleValue,
  computed,
  ref,
  toRefs,
  useAttrs,
  watch,
} from "vue";
import { VPrimitive, type VPrimitiveProps } from "~/components";
import { useIsKeyboardModality } from "~/composables";
import {
  disabledFromProps,
  focusIfNeeded,
  hasFocus,
  isButton,
  isFocusEventOutside,
  isFocusable,
  isSafari,
  isSelfTarget,
  queueBeforeEvent,
} from "~/utils";

export type VFocusableProps = VPrimitiveProps & {
  /**
   * @default
   * ```tss
   * false
   * ```
   */
  disabled?: boolean;
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
  accessibleWhenDisabled?: boolean;
};
export type VFocusableEmits = {
  focusVisible: [event: Event];
};

function isAlwaysFocusVisible(element: HTMLElement) {
  const { tagName, readOnly, type } = element as HTMLInputElement;
  if (tagName === "TEXTAREA" && !readOnly) return true;
  if (tagName === "SELECT" && !readOnly) return true;
  if (tagName === "INPUT" && !readOnly) {
    return ALWAYS_FOCUS_VISIBLE_INPUT_TYPES.includes(type);
  }
  if (element.isContentEditable) return true;
  return false;
}
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

function isAlwaysFocusVisibleDelayed(element: HTMLElement) {
  const role = element.getAttribute("role");
  if (role !== "combobox") return false;
  return !!element.dataset.name;
}

function isNativeCheckboxOrRadio(element: { tagName: string; type?: string }) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "input" && element.type) {
    return element.type === "checkbox" || element.type === "radio";
  }
  return false;
}

function isNativeTabbable(tagName?: string) {
  if (!tagName) return true;
  return [
    "button",
    "input",
    "select",
    "textarea",
    "a",
  ].includes(tagName);
}

function isSupportsDisabledAttribute(tagName?: string) {
  if (!tagName) return true;
  return [
    "button",
    "input",
    "select",
    "textarea",
  ].includes(tagName);
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VFocusableProps>(), {
  as: "div",
  asChild: undefined,
  disabled: false,
  focusable: true,
  accessibleWhenDisabled: false,
});
const emit = defineEmits<VFocusableEmits>();

const { disabled, focusable, accessibleWhenDisabled } = toRefs(props);

const attrs = useAttrs();
const fallthroughAttrs = computed(() => {
  const {
    onKeypressCapture,
    onMousedownCapture,
    onClickCapture,
    ...result
  } = attrs;

  return result;
});

const primitive = ref<ComponentPublicInstance>();
const element = computed(() => unrefElement(primitive.value));

const disabledByAttrs = computed(() => {
  return focusable.value && disabledFromProps({
    "disabled": disabled.value,
    "aria-disabled": attrs["aria-disabled"],
  });
});
const trulyDisabled = computed(() => {
  return disabledByAttrs.value && !accessibleWhenDisabled.value;
});
const focusVisible = ref(false);

// When the focusable element is disabled, it doesn't trigger a blur event so we
// can't set focusVisible to false there. Instead, we have to do it here by
// checking the element's disabled attribute.
whenever(and(focusable, trulyDisabled, focusVisible), () => {
  focusVisible.value = false;
});

// When an element that has focus becomes hidden, it doesn't trigger a blur
// event so we can't set focusVisible to false there. We observe the element and
// check if it's still focusable. Otherwise, we set focusVisible to false.
watch([focusable, focusVisible], (_cur, _old, onCleanUp) => {
  if (!focusable.value || !focusVisible.value) return;

  const el = element.value;
  if (!el) return;
  if (typeof IntersectionObserver === "undefined") return;

  const observer = new IntersectionObserver(() => {
    if (!isFocusable(el)) {
      focusVisible.value = false;
    }
  });
  observer.observe(el);

  onCleanUp(() => {
    observer.disconnect();
  });
});

const handleKeyPressCapture = createDisabledHandler(attrs.onKeypressCapture);
const handleMouseDownCapture = createDisabledHandler(attrs.onMousedownCapture);
const handleClickCapture = createDisabledHandler(attrs.onClickCapture);

function createDisabledHandler(handler?: unknown) {
  return (event: Event) => {
    if (typeof handler === "function") handler(event);
    if (event.defaultPrevented) return;
    if (disabledByAttrs.value) {
      event.stopPropagation();
      event.preventDefault();
    }
  };
}

function handleMouseDown(event: MouseEvent) {
  if (typeof attrs.onMousedown === "function") attrs.onMousedown(event);
  if (event.defaultPrevented) return;
  if (!focusable.value) return;
  const element = event.currentTarget as HTMLElement | null;
  if (!element) return;
  // Safari doesn't focus on buttons on mouse down like other
  // browsers/platforms. Instead, it focuses on the closest focusable ancestor
  // element, which is ultimately the body element. So we make sure to give
  // focus to this Focusable element on mouse down so it works consistently
  // across browsers.
  if (!isSafari()) return;
  if (!isButton(element) && !isNativeCheckboxOrRadio(element)) return;
  // In future versions of Safari, it may change this behavior and start
  // focusing on buttons on mouse down. To account for that, we must check if
  // the element has received focus before.
  let receivedFocus = false;
  function handleFocus() {
    receivedFocus = true;
  }
  const options = { capture: true, once: true };
  element.addEventListener("focusin", handleFocus, options);
  // We can't focus right away after on mouse down, otherwise it would prevent
  // drag events from happening. So we queue the focus to the next animation
  // frame, but always before the next mouseup event. The mouseup event might
  // happen before the next animation frame on touch devices or by tapping on a
  // MacBook's trackpad, for example. We can't use pointerup otherwise it breaks
  // on mobile Safari.
  queueBeforeEvent(element, "mouseup", () => {
    element.removeEventListener("focusin", handleFocus, true);
    if (receivedFocus) return;
    focusIfNeeded(element);
  });
}

function handleFocusVisible(event: Event, currentTarget?: EventTarget | null) {
  if (!focusable.value) return;
  const element = (currentTarget ?? event.currentTarget) as HTMLElement | null;
  if (!element) return;
  if (!hasFocus(element)) return;
  emit("focusVisible", event);
  if (event.defaultPrevented) return;
  // Some extensions like 1password dispatches some keydown events on autofill
  // and immediately moves focus to the next field. That's why we need to check
  // if the current element is still focused.
  focusVisible.value = true;
}

function handleKeyDownCapture(event: KeyboardEvent) {
  if (typeof attrs.onKeydownCapture === "function") attrs.onKeydownCapture(event);
  if (event.defaultPrevented) return;
  if (!focusable.value) return;
  if (focusVisible.value) return;
  if (event.metaKey || event.altKey || event.ctrlKey) return;
  if (!isSelfTarget(event)) return;
  const element = event.currentTarget;
  queueMicrotask(() => {
    handleFocusVisible(event, element);
  });
}

const isKeyboardModality = useIsKeyboardModality();
function handleFocusCapture(event: FocusEvent) {
  if (typeof attrs.onFocusCapture === "function") attrs.onFocusCapture(event);
  if (event.defaultPrevented) return;
  if (!focusable.value) return;
  if (!isSelfTarget(event)) {
    focusVisible.value = false;
    return;
  }

  const target = event.target as HTMLElement | null;
  if (!target) return;
  const element = event.currentTarget;
  const applyFocusVisible = () => {
    handleFocusVisible(event, element);
  };

  if (isKeyboardModality.value || isAlwaysFocusVisible(target)) {
    queueMicrotask(applyFocusVisible);
  } else if (isAlwaysFocusVisibleDelayed(target)) { // See https://github.com/ariakit/ariakit/issues/1257
    queueBeforeEvent(target, "focusout", applyFocusVisible);
  } else {
    focusVisible.value = false;
  }
}

// Note: Can't use onBlurCapture here otherwise it will not work with
// CompositeItem's with the virtualFocus state set to true.
function handleBlur(event: FocusEvent) {
  if (typeof attrs.onBlur === "function") attrs.onBlur(event);
  if (!focusable.value) return;
  if (!isFocusEventOutside(event)) return;
  focusVisible.value = false;
}

const tagName = computed(() => element.value?.tagName.toLocaleLowerCase());
const nativeTabbable = computed(() => {
  return focusable.value && isNativeTabbable(tagName.value);
});
const supportsDisabled = computed(() => {
  return focusable.value && isSupportsDisabledAttribute(tagName.value);
});

const tabIndex = computed(() => {
  if (!focusable.value) return attrs.tabindex;
  if (trulyDisabled.value) {
    // Anchor, audio and video tags don't support the `disabled` attribute. We
    // must pass :tabindex="-1" so they don't receive focus on tab.
    if (nativeTabbable.value && !supportsDisabled.value) return -1;
    // Elements that support the `disabled` attribute don't need tabindex.
    return;
  }
  // If the element is enabled and it's natively tabbable, we don't need to
  // specify a tabindex attribute unless it's explicitly set by the user.
  if (nativeTabbable.value) return attrs.tabindex;
  // If the element is enabled and is not natively tabbable, we have to fallback
  // :tabindex="0".
  return attrs.tabindex ?? 0;
});

const style = computed((): StyleValue => {
  return trulyDisabled.value ? { pointerEvents: "none" } : {};
});
</script>

<template>
  <VPrimitive
    ref="primitive"
    :aria-disabled="disabledByAttrs || undefined"
    :data-focus-visible="(focusable && focusVisible) || undefined"
    v-bind="fallthroughAttrs"
    :as="as"
    :as-child="asChild"
    :tabindex="tabIndex"
    :disabled="(supportsDisabled && trulyDisabled) || undefined"
    :contenteditable="disabledByAttrs ? undefined : attrs.contenteditable"
    :style="style"
    @keydown.capture="handleKeyDownCapture"
    @keypress.capture="handleKeyPressCapture"
    @mousedown.capture="handleMouseDownCapture"
    @mousedown="handleMouseDown"
    @click.capture="handleClickCapture"
    @focus.capture="handleFocusCapture"
    @blur="handleBlur"
  >
    <slot />
  </VPrimitive>
</template>
