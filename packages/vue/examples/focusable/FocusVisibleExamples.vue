<script setup lang="ts">
import { ref } from "vue";
import { VFocusable } from "~/components";

const count = ref(0);
</script>

<template>
  <div>
    <VFocusable
      as="button"
      @focus-visible="count++"
    >
      Focusable
    </VFocusable>
    <VFocusable
      as="input"
      type="text"
      value="Always focus visible"
      @focus-visible="count++"
    />
    <code>{{ count }}</code>
  </div>
</template>

