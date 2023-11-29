<script setup lang="ts">
import { VCollection, VCollectionItem } from "@blro/ui-primitives-vue";
import CollectionDebug from "./CollectionDebug.vue";
import { ref } from "vue";

const list = ref([1, 2, 3]);
let count = 3;
function addRandomIndex() {
  list.value.splice(randomInt(0, list.value.length), 0, ++count);
}
function removeRandomIndex() {
  list.value.splice(randomInt(0, list.value.length - 1), 1);
}
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VCollection</h1>
    <VCollection>
      <button @click="addRandomIndex">Add Random</button>
      <button @click="removeRandomIndex">Remove Random</button>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, 64px)"
      >
        <VCollectionItem v-for="i in list" :key="i">{{ i }}</VCollectionItem>
      </div>
      <CollectionDebug :match="list" />
    </VCollection>
  </div>
</template>
