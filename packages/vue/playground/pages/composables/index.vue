<script setup lang="ts">
defineOptions({
  name: "PlaygroundComposables",
});

const PAGES = Object.keys(import.meta.glob("./*/index.vue")).map((path) => {
  return path.replace(/.*?([^/]+)\/index\.vue$/, "$1");
});
</script>

<template>
  <div>
    <h1>Composables</h1>
    <ul>
      <li v-for="page in PAGES" :key="page">
        <RouterLink :to="`/composables/${page}`">{{ page }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
