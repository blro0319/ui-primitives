<script setup lang="ts">
import StyledPrimitive from "./StyledPrimitive.vue";
import { VPrimitive } from "~/components";

defineOptions({
  name: "VPrimitivePropAs",
});
</script>

<template>
  <div>
    <VPrimitive>
      Div (default)
    </VPrimitive>
    <VPrimitive as="button">
      Button
    </VPrimitive>
    <VPrimitive :as="StyledPrimitive" style="color: white">
      Component
    </VPrimitive>
  </div>
</template>
