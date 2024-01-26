<script setup lang="ts">
import { VFocusable } from "~/components";
</script>

<template>
  <div>
    <VFocusable>
      Focusable
    </VFocusable>
    <VFocusable as="button">
      Native Focusable
    </VFocusable>
    <VFocusable :focusable="false">
      Not focusable
    </VFocusable>
    <VFocusable as="button">
      Not focusable with native
    </VFocusable>
  </div>
</template>

