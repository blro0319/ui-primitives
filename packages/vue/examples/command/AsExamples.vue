<script setup lang="ts">
import { ref } from "vue";
import { VCommand } from "~/components";

const count = ref(0);
</script>

<template>
  <div>
    <VCommand @click="count++">
      No native button
    </VCommand>
    <VCommand as="button" @click="count++">
      Native button
    </VCommand>
    <VCommand as="a" href="#" @click="count++">
      Native button
    </VCommand>
    {{ count }}
  </div>
</template>
