<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/separator
 */

import { VPrimitive, type VPrimitiveProps } from "@blro/ui-primitives-vue";

export interface VSeparatorProps extends /* @vue-ignore */ VPrimitiveProps {
  /**
   * @default
   * ```ts
   * "hr"
   * ```
   */
  as?: string;
  /**
   * @default
   * ```ts
   * "horizontal"
   * ```
   */
  orientation?: "horizontal" | "vertical";
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VSeparator",
  inheritAttrs: false,
});

withDefaults(defineProps<VSeparatorProps>(), {
  as: "hr",
  orientation: "horizontal",
});
</script>

<template>
  <VPrimitive
    role="separator"
    :aria-orientation="orientation"
    v-bind="$attrs"
    :as="as"
  >
    <slot />
  </VPrimitive>
</template>
