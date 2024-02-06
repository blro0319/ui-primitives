<script setup lang="ts">
import StyledPrimitive from "./StyledPrimitive.vue";
import { VPrimitive } from "~/components";
</script>

<template>
  <main>
    <h1>VPrimitive</h1>
    <section>
      <h2>As Prop</h2>
      <VPrimitive data-testid="as:div">
        Div
      </VPrimitive>
      <VPrimitive as="button" data-testid="as:button">
        Button
      </VPrimitive>
      <VPrimitive
        :as="StyledPrimitive"
        class="component"
        data-testid="as:component"
      >
        Component
      </VPrimitive>
    </section>
    <section>
      <h2>As Child Prop</h2>
      <VPrimitive as-child data-testid="as-child:button">
        <button>Button</button>
      </VPrimitive>
      <VPrimitive as-child class="foo" data-testid="as-child:classes">
        <div class="bar">
          With classes (foo, bar)
        </div>
      </VPrimitive>
      <VPrimitive
        as-child
        style="background-color: black"
        data-testid="as-child:styles"
      >
        <div style="color: white">
          With styles (background-color: black, color: white)
        </div>
      </VPrimitive>
      <VPrimitive as-child data-testid="as-child:nested">
        <VPrimitive as-child>
          <div>Nested</div>
        </VPrimitive>
      </VPrimitive>
      <VPrimitive as-child data-testid="as-child:multiple">
        <i>Multiple children #1</i>
        <span>Multiple children #2</span>
        <span>Multiple children #3</span>
      </VPrimitive>
    </section>
  </main>
</template>

<style scoped>
.component {
  color: white;
}
</style>
