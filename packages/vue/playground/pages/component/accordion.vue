<script setup lang="ts">
import {
  VAccordion,
  VAccordionHeader,
  VAccordionItem,
  VAccordionPanel,
  VAccordionTrigger,
} from "~/components";
</script>

<template>
  <div class="accordion">
    <h1>VAccordion</h1>
    <article>
      <h2>Basic Usage</h2>
      <VAccordion>
        <VAccordionItem v-for="i in [1, 2, 3]" :key="i">
          <VAccordionHeader>
            <VAccordionTrigger>Item {{ i }}</VAccordionTrigger>
          </VAccordionHeader>
          <VAccordionPanel>Panel {{ i }}</VAccordionPanel>
        </VAccordionItem>
      </VAccordion>
    </article>
    <article>
      <h2>Multiple</h2>
      <VAccordion expand-mode="multiple">
        <VAccordionItem v-for="i in [1, 2, 3]" :key="i">
          <VAccordionHeader>
            <VAccordionTrigger>Item {{ i }}</VAccordionTrigger>
          </VAccordionHeader>
          <VAccordionPanel>Panel {{ i }}</VAccordionPanel>
        </VAccordionItem>
      </VAccordion>
    </article>
    <article>
      <h2>Opened Item (Single)</h2>
      <VAccordion>
        <VAccordionItem v-for="i in [1, 2, 3]" :key="i" :open="i === 2">
          <VAccordionHeader>
            <VAccordionTrigger>Item {{ i }}</VAccordionTrigger>
          </VAccordionHeader>
          <VAccordionPanel>Panel {{ i }}</VAccordionPanel>
        </VAccordionItem>
      </VAccordion>
    </article>
    <article>
      <h2>Opened Item (Multiple)</h2>
      <VAccordion expand-mode="multiple">
        <VAccordionItem v-for="i in [1, 2, 3]" :key="i" :open="i !== 1">
          <VAccordionHeader>
            <VAccordionTrigger>Item {{ i }}</VAccordionTrigger>
          </VAccordionHeader>
          <VAccordionPanel>Panel {{ i }}</VAccordionPanel>
        </VAccordionItem>
      </VAccordion>
    </article>
    <article>
      <h2>Transition</h2>
      <VAccordion>
        <VAccordionItem v-for="i in [1, 2, 3]" :key="i">
          <VAccordionHeader>
            <VAccordionTrigger>Item {{ i }}</VAccordionTrigger>
          </VAccordionHeader>
          <Transition name="accordion">
            <VAccordionPanel>Panel {{ i }}</VAccordionPanel>
          </Transition>
        </VAccordionItem>
      </VAccordion>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  padding-bottom: 256px;

  &-enter-active,
  &-leave-active {
    transition: opacity 250ms;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
