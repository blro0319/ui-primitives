<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/command
 */

import { isButton, isTextField } from "@ariakit/core/utils/dom";
import {
  fireClickEvent,
  isSelfTarget,
  queueBeforeEvent,
} from "@ariakit/core/utils/events";
import { isFirefox } from "@ariakit/core/utils/platform";
import { VFocusable, type VFocusableProps } from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import { computed, ref, toRefs } from "vue";

export type VCommandProps = {
  /**
   * @default
   * ```ts
   * "button"
   * ```
   */
  as?: string;
} & Omit<VFocusableProps, "as"> & {
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
    clickOnScape?: boolean;
  };
</script>

<script setup lang="ts">
defineOptions({
  name: "VCommand",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VCommandProps>(), {
  as: "button",
  clickOnEnter: true,
  clickOnScape: true,
});

const { clickOnEnter, clickOnScape } = toRefs(props);

const root = ref<InstanceType<typeof VFocusable>>();
const rootElement = computed(() => unrefElement(root.value));
const isNativeButton = computed(() => {
  if (!rootElement.value) return false;
  return isButton(rootElement.value);
});

const active = ref(false);
let activeCache = false;

function handleKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented || !isSelfTarget(event)) return;
  if (isDisabled()) return;

  const element = event.currentTarget as HTMLElement | null;
  if (!element || isTextField(element) || element.isContentEditable) return;

  const shouldPreventEnter = event.key === "Enter" && !clickOnEnter.value;
  const shouldPreventSpace = event.key === " " && !clickOnScape.value;
  if (shouldPreventEnter || shouldPreventSpace) {
    event.preventDefault();
    return;
  }

  const isActiveByEnter = clickOnEnter.value && event.key === "Enter";
  const isActiveBySpace = clickOnScape.value && event.key === " ";
  if (!isActiveByEnter && !isActiveBySpace) return;

  const nativeClick = isNativeClick(event);
  if (isActiveByEnter) {
    if (nativeClick) return;
    event.preventDefault();
    const { view, ...eventInit } = event;
    const click = () => fireClickEvent(element, eventInit);
    if (isFirefox()) queueBeforeEvent(element, "keyup", click);
    else queueMicrotask(click);
  } else if (isActiveBySpace) {
    activeCache = true;
    if (!nativeClick) {
      event.preventDefault();
      active.value = true;
    }
  }
}
function handleKeyUp(event: KeyboardEvent) {
  if (event.defaultPrevented || event.metaKey) return;
  if (isDisabled()) return;

  const isSpace = clickOnScape.value && event.key === " ";
  if (isSpace && activeCache) {
    activeCache = false;

    if (isNativeClick(event)) return;
    event.preventDefault();
    active.value = false;

    const element = event.currentTarget as HTMLElement | null;
    if (element) {
      const { view, ...eventInit } = event;
      queueMicrotask(() => fireClickEvent(element, eventInit));
    }
  }
}

function isDisabled() {
  const element = rootElement.value as HTMLButtonElement | null | undefined;
  if (!element) return false;
  return element.disabled || element.ariaDisabled === "true";
}
function isNativeClick(event: KeyboardEvent) {
  if (!event.isTrusted) return false;
  const element = event.currentTarget as HTMLElement | null | undefined;
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

<template>
  <VFocusable
    :type="isNativeButton ? 'button' : undefined"
    :data-active="active ? '' : undefined"
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
    :focusable="focusable"
    :autofocus="autofocus"
    :disabled="disabled"
    :accessible-when-disabled="accessibleWhenDisabled"
    ref="root"
    @keydown="handleKeyDown"
    @keyup="handleKeyUp"
  >
    <slot />
  </VFocusable>
</template>
