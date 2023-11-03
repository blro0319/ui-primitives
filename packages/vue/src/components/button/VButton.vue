<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/button
 */

import { isButton } from "@ariakit/core/utils/dom";
import { VCommand } from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import { computed, mergeProps, ref } from "vue";

export interface VButtonProps {
  /**
   * @default
   * ```ts
   * "button"
   * ```
   */
  as?: string;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  asChild?: boolean;
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
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VButton",
  inheritAttrs: false,
});

withDefaults(defineProps<VButtonProps>(), {
  as: "button",
  clickOnEnter: true,
  clickOnScape: true,
});

const root = ref<InstanceType<typeof VCommand>>();
const rootElement = computed(() => unrefElement(root));

const role = computed(() => {
  if (!rootElement.value) return "button";
  if (!isButton(rootElement.value) && rootElement.value.tagName !== "A") {
    return "button";
  }
  return undefined;
});
</script>

<template>
  <VCommand :role="role" v-bind="mergeProps($attrs, $props)" ref="root">
    <slot />
  </VCommand>
</template>
