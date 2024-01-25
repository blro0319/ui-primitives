<script setup lang="ts">
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
  </div>
</template>
