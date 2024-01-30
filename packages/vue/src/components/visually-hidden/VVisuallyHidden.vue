<script lang="ts">
import { VPrimitive, type VPrimitiveProps } from "~/components";

export type VVisuallyHiddenProps = {
  /**
   * @default
   * ```ts
   * "span"
   * ```
   */
  as?: VPrimitiveProps["as"];
} & Omit<VPrimitiveProps, "as">;
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<VVisuallyHiddenProps>(), {
  as: "span",
  asChild: undefined,
});
</script>

<template>
  <VPrimitive
    :style="{
      overflow: 'hidden',
      position: 'absolute',
      clip: 'rect(0 0 0 0)',
      width: '1px',
      height: '1px',
      margin: '-1px',
      padding: 0,
      border: 0,
      whiteSpace: 'nowrap',
    }"
    v-bind="{ ...$attrs, ...$props }"
  >
    <slot />
  </VPrimitive>
</template>
