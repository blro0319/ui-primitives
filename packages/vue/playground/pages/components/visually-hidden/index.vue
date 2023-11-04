<script setup lang="ts">
import { VVisuallyHidden } from "@blro/ui-primitives-vue";

defineOptions({
  name: "VVisuallyHiddenPlayground",
});
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VVisuallyHidden</h1>
    <button>
      <span aria-hidden="true">...</span>
      <VVisuallyHidden>Show more</VVisuallyHidden>
    </button>
  </div>
</template>
