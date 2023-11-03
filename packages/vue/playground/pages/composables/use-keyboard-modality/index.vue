<script setup lang="ts">
import { VFocusable, useKeyboardModality } from "@blro/ui-primitives-vue";

defineOptions({
  name: "UseKeyboardModalityPlayground",
});

const isKeyboardModality = useKeyboardModality();
</script>

<template>
  <div>
    <h1>useKeyboardModality</h1>
    {{ isKeyboardModality }}
    <VFocusable as="button">Button</VFocusable>
  </div>
</template>
