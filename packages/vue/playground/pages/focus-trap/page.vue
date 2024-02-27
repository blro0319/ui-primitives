<script setup lang="ts">
import { ref } from "vue";
import { VFocusTrapRegion } from "~/components";

const enabled = ref(false);
</script>

<template>
  <main>
    <h1>VFocusTrap</h1>
    <section>
      <h2>Basic</h2>
      <button data-testid="before">
        Before Region
      </button>
      <VFocusTrapRegion :enabled="enabled">
        <button data-testid="first" @click="enabled = !enabled">
          Button 1 (Toggle Trap)
        </button>
        <button>
          Button 2
        </button>
        <button data-testid="last">
          Button 3
        </button>
      </VFocusTrapRegion>
      <button data-testid="after">
        After Region
      </button>
    </section>
  </main>
</template>
