<script setup lang="ts">
import {
  invariant,
  useVCollectionContext,
  type Nullish,
} from "@blro/ui-primitives-vue";
import { computed } from "vue";

const props = defineProps<{
  match: number[];
  scope?: string | symbol | Nullish;
}>();

const context = useVCollectionContext(props.scope);
invariant(context);
const { items } = context;

const isValid = computed(() => {
  return props.match.every((item, i) => {
    return items.value[i]?.innerText === String(item);
  });
});
</script>

<template>
  {{ isValid ? "Valid" : "Invalid" }}
  <div style="display: grid; grid-template-columns: repeat(auto-fill, 64px)">
    <div v-for="(item, i) in items" :key="i">
      {{ item.innerText }}
    </div>
  </div>
</template>
