<script setup lang="ts">
import { VButton } from "~/components";
</script>

<template>
  <main>
    <h1>VButton</h1>
    <section>
      <h2>Basic</h2>
      <VButton data-testid="native">
        Native Button
      </VButton>
      <VButton as="a" href="#" data-testid="anchor">
        Anchor Button
      </VButton>
      <VButton as="div" data-testid="non-native">
        Non-Native Button
      </VButton>
    </section>
  </main>
</template>
