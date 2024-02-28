<script setup lang="ts">
import { ref } from "vue";
import { VGroup, VGroupLabel } from "~/components";

const id = ref("foo");
</script>

<template>
  <main>
    <h1>VGroup</h1>
    <section>
      <h2>Random ID</h2>
      <VGroup data-testid="random:group">
        <VGroupLabel data-testid="random:label">
          Label
        </VGroupLabel>
      </VGroup>
    </section>
    <section>
      <h2>Specified ID</h2>
      <VGroup data-testid="specified:group">
        <VGroupLabel :id="id" data-testid="specified:label">
          Label
        </VGroupLabel>
      </VGroup>
      <button data-testid="specified:change" @click="id = 'bar'">
        Change Id
      </button>
    </section>
  </main>
</template>
