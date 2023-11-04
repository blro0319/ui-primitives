<script lang="ts">
import { VPrimitive } from "@blro/ui-primitives-vue";
import { mergeProps } from "vue";

export interface VVisuallyHiddenProps {
  /**
   * @default
   * ```ts
   * "div"
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
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VVisuallyHidden",
  inheritAttrs: false,
});

defineProps<VVisuallyHiddenProps>();
</script>

<template>
  <VPrimitive
    v-bind="mergeProps($attrs, $props)"
    style="
      overflow: hidden;
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      white-space: nowrap;
    "
  >
    <slot />
  </VPrimitive>
</template>
