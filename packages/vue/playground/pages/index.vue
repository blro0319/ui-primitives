<script setup lang="ts">
defineOptions({
  name: "PlaygroundHome",
});

const COMPONENTS = Object.keys(
  import.meta.glob("./components/*/index.vue")
).map((path) => {
  return path.replace(/.*?([^/]+)\/index\.vue$/, "$1");
});
</script>

<template>
  <div>
    <h1>Blro UI Primitives</h1>
    <ul>
      <li v-for="component in COMPONENTS" :key="component">
        <RouterLink :to="`/components/${component}`">
          {{ component }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
