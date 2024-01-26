<script setup lang="ts">
// Focusable
import FocusableDisabledExamples from "#examples/focusable/DisabledExamples.vue";
import FocusableFocusableExamples from "#examples/focusable/FocusableExamples.vue";
import FocusableFocusVisibleExamples from "#examples/focusable/FocusVisibleExamples.vue";
// Primitive
import PrimitiveAsChildExamples from "#examples/primitive/AsChildExamples.vue";
import PrimitiveAsExamples from "#examples/primitive/AsExamples.vue";
</script>

<template>
  <main>
    <h1>Blro UI Primitive Playground</h1>
    <section>
      <h2>VFocusable</h2>
      <h3>Focusable Examples</h3>
      <FocusableFocusableExamples />
      <h3>Disabled Examples</h3>
      <FocusableDisabledExamples />
      <h3>Focus Visible Examples</h3>
      <FocusableFocusVisibleExamples />
    </section>
    <section>
      <h2>VPrimitive</h2>
      <h3>As Examples</h3>
      <PrimitiveAsExamples />
      <h3>AsChild Examples</h3>
      <PrimitiveAsChildExamples />
    </section>
  </main>
</template>
