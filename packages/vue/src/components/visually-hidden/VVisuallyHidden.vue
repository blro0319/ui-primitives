<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/visually-hidden
 */

import { VPrimitive, type VPrimitiveProps } from "@blro/ui-primitives-vue";

export type VVisuallyHiddenProps = VPrimitiveProps;
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
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
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
