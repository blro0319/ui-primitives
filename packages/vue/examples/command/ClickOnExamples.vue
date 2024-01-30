<script setup lang="ts">
import { ref } from "vue";
import { VCommand } from "~/components";

const count = ref(0);
</script>

<template>
  <div>
    <VCommand :click-on-enter="false" @click="count++">
      Click on enter false
    </VCommand>
    <VCommand :click-on-space="false" @click="count++">
      Click on space false
    </VCommand>
    <VCommand :click-on-enter="false" :click-on-space="false" @click="count++">
      Click on space & space false
    </VCommand>
    {{ count }}
  </div>
</template>
