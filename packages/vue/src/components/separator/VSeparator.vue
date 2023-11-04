<script lang="ts">
import { VPrimitive } from "@blro/ui-primitives-vue";

export interface VSeparatorProps {
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
   * false
   * ```
   */
  asChild?: boolean;
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
    :as-child="asChild"
  >
    <slot />
  </VPrimitive>
</template>
