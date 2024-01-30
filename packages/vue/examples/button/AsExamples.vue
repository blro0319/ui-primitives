<script setup lang="ts">
import { VButton } from "~/components";
</script>

<template>
  <div>
    <VButton>
      Native button
    </VButton>
    <VButton as="a" href="#">
      Anchor button
    </VButton>
    <VButton as="div">
      No native button
    </VButton>
  </div>
</template>
