<script lang="ts">
import { unrefElement } from "@vueuse/core";
import { type ComponentPublicInstance, computed, ref, toRefs, useAttrs } from "vue";
import { VFocusable, type VFocusableEmits, type VFocusableProps } from "~/components";
import { useMetadataProps } from "~/composables";
import {
  disabledFromProps,
  fireClickEvent,
  isButton,
  isFirefox,
  isSelfTarget,
  isTextField,
  queueBeforeEvent,
} from "~/utils";

export type VCommandProps = VFocusableProps & {
  /**
   * @default
   * ```ts
   * true
   * ```
   */
  clickOnEnter?: boolean;
  /**
   * @default
   * ```ts
   * true
   * ```
   */
  clickOnSpace?: boolean;
};

export type VCommandEmits = VFocusableEmits;

const symbol = Symbol("VCommand");

function isNativeClick(event: KeyboardEvent) {
  if (!event.isTrusted) return false;

  const element = event.currentTarget as HTMLElement | null;
  if (!element) return false;

  if (event.key === "Enter") {
    return (
      isButton(element) ||
      element.tagName === "SUMMARY" ||
      element.tagName === "A"
    );
  }
  if (event.key === " ") {
    return (
      isButton(element) ||
      element.tagName === "SUMMARY" ||
      element.tagName === "INPUT" ||
      element.tagName === "SELECT"
    );
  }

  return false;
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VCommandProps>(), {
  asChild: undefined,
  disabled: undefined,
  focusable: undefined,
  accessibleWhenDisabled: undefined,
  clickOnEnter: true,
  clickOnSpace: true,
});
const emit = defineEmits<VCommandEmits>();

const { disabled, clickOnEnter, clickOnSpace } = toRefs(props);
const active = ref(false);
let activeCache = false;
const disabledByAttrs = computed(() => {
  return disabledFromProps({
    "disabled": disabled.value,
    "aria-disabled": attrs["aria-disabled"],
  });
});

const attrs = useAttrs();
const { isDuplicated, metadataAttrs } = useMetadataProps(attrs, symbol, true);

const component = ref<ComponentPublicInstance>();
const element = computed(() => unrefElement(component.value));
const isNativeButton = computed(() => {
  const tagName = element.value?.tagName;
  if (!tagName) return false;
  return isButton({ tagName, type: attrs.type as string | undefined });
});

function handleKeyDown(event: KeyboardEvent) {
  if (typeof attrs.onKeydown === "function") attrs.onKeydown(event);

  const element = event.currentTarget as HTMLElement | null;
  if (!element) return;

  if (event.defaultPrevented) return;
  if (isDuplicated.value) return;
  if (disabledByAttrs.value) return;
  if (!isSelfTarget(event)) return;
  if (isTextField(element)) return;
  if (element.isContentEditable) return;

  const isEnter = clickOnEnter.value && event.key === "Enter";
  const isSpace = clickOnSpace.value && event.key === " ";
  const shouldPreventEnter = event.key === "Enter" && !clickOnEnter.value;
  const shouldPreventSpace = event.key === " " && !clickOnSpace.value;

  if (shouldPreventEnter || shouldPreventSpace) {
    event.preventDefault();
    return;
  }

  if (isEnter || isSpace) {
    const nativeClick = isNativeClick(event);
    if (isEnter) {
      if (!nativeClick) {
        event.preventDefault();
        const { view, ...eventInit } = event;
        // Fire a click event instead of calling element.click() directly so we
        // can pass along the modifier state.
        const click = () => fireClickEvent(element, eventInit);
        // If this element is a link with target="_blank", Firefox will block
        // the "popup" if the click event is dispatched synchronously or in a
        // microtask. Queueing the event asynchronously fixes that.
        if (isFirefox()) {
          queueBeforeEvent(element, "keyup", click);
        } else {
          queueMicrotask(click);
        }
      }
    } else if (isSpace) {
      activeCache = true;
      if (!nativeClick) {
        event.preventDefault();
        active.value = true;
      }
    }
  }
}

function handleKeyUp(event: KeyboardEvent) {
  if (typeof attrs.onKeyup === "function") attrs.onKeyup(event);

  if (event.defaultPrevented) return;
  if (isDuplicated.value) return;
  if (disabledByAttrs.value) return;
  if (event.metaKey) return;

  const isSpace = clickOnSpace.value && event.key === " ";

  if (activeCache && isSpace) {
    activeCache = false;
    if (!isNativeClick(event)) {
      event.preventDefault();
      active.value = false;

      const element = event.currentTarget as HTMLElement | null;
      if (!element) return;

      const { view, ...eventInit } = event;
      queueMicrotask(() => fireClickEvent(element, eventInit));
    }
  }
}
</script>

<template>
  <VFocusable
    ref="component"
    :type="isNativeButton ? 'button' : undefined"
    :data-active="active || undefined"
    v-bind="{
      ...metadataAttrs,
      ...$attrs,
      as,
      asChild,
      disabled,
      focusable,
      accessibleWhenDisabled,
    }"
    @focus-visible="emit('focusVisible', $event)"
    @keydown="handleKeyDown"
    @keyup="handleKeyUp"
  >
    <slot />
  </VFocusable>
</template>
