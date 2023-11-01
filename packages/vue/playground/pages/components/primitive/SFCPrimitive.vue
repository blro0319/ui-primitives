<script setup lang="ts">
import { VPrimitive } from "@blro/ui-primitives-vue";

withDefaults(
  defineProps<{
    as?: string;
    asChild?: boolean;
  }>(),
  {
    as: "div",
    asChild: false,
  }
);
</script>

<template>
  <VPrimitive as-child class="sfc-primitive">
    <VPrimitive :as="as" :as-child="asChild">
      <slot />
    </VPrimitive>
  </VPrimitive>
</template>

<style scoped>
.sfc-primitive {
  text-decoration: underline;
}
</style>
