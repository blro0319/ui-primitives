<script setup lang="ts">
import { VSeparator } from "@blro/ui-primitives-vue";
</script>

<template>
  <div>
    <h1>VSeparator</h1>
    <VSeparator />
    <VSeparator orientation="vertical" />
    <VSeparator as="div" orientation="horizontal">Horizontal</VSeparator>
    <VSeparator as="div" orientation="vertical">Vertical</VSeparator>
    <VSeparator as-child orientation="horizontal">
      <div>Horizontal</div>
    </VSeparator>
    <VSeparator as-child orientation="vertical">
      <div>Vertical</div>
    </VSeparator>
  </div>
</template>
