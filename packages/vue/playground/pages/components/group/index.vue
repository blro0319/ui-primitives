<script setup lang="ts">
import { VGroup, VGroupLabel } from "@blro/ui-primitives-vue";
</script>

<template>
  <div>
    <h1>VGroup</h1>
    <VGroup>
      <VGroupLabel>Label</VGroupLabel>
      Content
    </VGroup>
    <VGroup as-child>
      <article>
        <VGroupLabel as-child>
          <h2>Label</h2>
        </VGroupLabel>
        Content
      </article>
    </VGroup>
    <VGroup>
      <VGroupLabel id="custom-id">Label with custom id</VGroupLabel>
      Content
    </VGroup>
  </div>
</template>
