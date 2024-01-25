<script setup lang="ts">
import { VPrimitive, type VPrimitiveProps } from "~/components";

const props = defineProps<VPrimitiveProps>();
</script>

<template>
  <VPrimitive v-bind="props" class="styled">
    <slot />
  </VPrimitive>
</template>

<style scoped>
.styled {
  background-color: black;
}
</style>
