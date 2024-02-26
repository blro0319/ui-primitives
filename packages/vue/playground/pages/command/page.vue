<script setup lang="ts">
import { VCommand } from "~/components";

function handleClick(event: MouseEvent) {
  (event.target as HTMLElement).dataset.clicked = "true";
}
</script>

<template>
  <main>
    <h1>VCommand</h1>
    <section>
      <h2>Click on Enter Prop</h2>
      <VCommand
        as="button"
        click-on-enter
        :click-on-space="false"
        data-testid="click-on-enter:native"
        @click="handleClick"
      >
        Native Click on Enter
      </VCommand>
      <VCommand
        click-on-enter
        :click-on-space="false"
        data-testid="click-on-enter:non-native"
        @click="handleClick"
      >
        Non-Native Click on Enter
      </VCommand>
    </section>
    <section>
      <h2>Click on Space Prop</h2>
      <VCommand
        as="button"
        :click-on-enter="false"
        click-on-space
        data-testid="click-on-space:native"
        @click="handleClick"
      >
        Native Click on Space
      </VCommand>
      <VCommand
        :click-on-enter="false"
        click-on-space
        data-testid="click-on-space:non-native"
        @click="handleClick"
      >
        Non-Native Click on Space
      </VCommand>
    </section>
  </main>
</template>
