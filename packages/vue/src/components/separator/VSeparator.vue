<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/separator
 */

import { VPrimitive, type VPrimitiveProps } from "@blro/ui-primitives-vue";

export type VSeparatorProps = {
  /**
   * @default
   * ```ts
   * "hr"
   * ```
   */
  as?: string;
} & Omit<VPrimitiveProps, "as"> & {
    /**
     * @default
     * ```ts
     * "horizontal"
     * ```
     */
    orientation?: "horizontal" | "vertical";
  };
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
    :as-child="asChild"
  >
    <slot />
  </VPrimitive>
</template>
