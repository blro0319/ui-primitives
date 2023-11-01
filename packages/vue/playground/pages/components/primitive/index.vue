<script setup lang="ts">
import { VPrimitive } from "@blro/ui-primitives-vue";
import SFCPrimitive from "./SFCPrimitive.vue";

defineOptions({
  name: "VPrimitivePlayground",
});
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VPrimitive</h1>
    <VPrimitive>Default &lt;div&gt;</VPrimitive>
    <VPrimitive as="button">As &lt;button&gt;</VPrimitive>
    <VPrimitive as-child>
      <button>As child &lt;button&gt;</button>
    </VPrimitive>
    <VPrimitive as-child>
      <VPrimitive as="button">As Child & As &lt;button&gt;</VPrimitive>
    </VPrimitive>
    <SFCPrimitive as-child class="sfc-primitive">
      <button>SFC Nested As Child</button>
    </SFCPrimitive>
  </div>
</template>

<style scoped>
.sfc-primitive {
  font-weight: bold;
}
</style>
