<script setup lang="ts">
import { VFocusable } from "@blro/ui-primitives-vue";
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VFocusable</h1>
    <VFocusable>Default &lt;div&gt;</VFocusable>
    <VFocusable as="button">Native Tabbable &lt;button&gt;</VFocusable>
    <VFocusable disabled>Disabled &lt;div&gt;</VFocusable>
    <VFocusable disabled accessible-when-disabled>
      Accessible When Disabled &lt;div&gt;
    </VFocusable>
    <VFocusable as="button" disabled>Native Disabled &lt;button&gt;</VFocusable>
    <VFocusable as="button" disabled accessible-when-disabled>
      Native Disabled & Accessible &lt;button&gt;
    </VFocusable>
    <hr />
    <VFocusable :focusable="false">Default &lt;div&gt;</VFocusable>
    <VFocusable :focusable="false" as="button">
      Native Tabbable &lt;button&gt;
    </VFocusable>
    <VFocusable :focusable="false" disabled>Disabled &lt;div&gt;</VFocusable>
    <VFocusable :focusable="false" disabled accessible-when-disabled>
      Accessible When Disabled &lt;div&gt;
    </VFocusable>
    <VFocusable :focusable="false" as="button" disabled>
      Native Disabled &lt;button&gt;
    </VFocusable>
    <VFocusable
      :focusable="false"
      as="button"
      disabled
      accessible-when-disabled
    >
      Native Disabled & Accessible &lt;button&gt;
    </VFocusable>
  </div>
</template>

<style scoped>
[data-focus-visible] {
  outline: 2px solid black;
  outline-offset: 2px;
}
</style>
