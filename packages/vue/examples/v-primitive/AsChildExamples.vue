<script setup lang="ts">
import StyledPrimitive from "./StyledPrimitive.vue";
import { VPrimitive } from "~/components";
</script>

<template>
  <div>
    <VPrimitive as-child>
      <div>Div</div>
    </VPrimitive>
    <VPrimitive as-child>
      <button>Button</button>
    </VPrimitive>
    <VPrimitive as-child class="foo">
      <div class="bar">
        With classes (foo, bar)
      </div>
    </VPrimitive>
    <VPrimitive as-child style="background-color: black">
      <div style="color: white">
        With styles (background-color: black, color: white)
      </div>
    </VPrimitive>
    <VPrimitive as-child>
      <VPrimitive as-child>
        <button>Nested as-child</button>
      </VPrimitive>
    </VPrimitive>
    <StyledPrimitive as-child>
      <VPrimitive as-child>
        <div>Scoped style (background-color: black)</div>
      </VPrimitive>
    </StyledPrimitive>
    <VPrimitive as-child>
      <VPrimitive as="i">
        Multiple children (Only show first children)
      </VPrimitive>
    </VPrimitive>
  </div>
</template>

<style scoped>
.styled {
  color: white;
}
</style>
