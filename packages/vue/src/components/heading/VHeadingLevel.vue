<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/heading
 */

import { injectionKey } from "@blro/ui-primitives-vue";
import { computed, inject, provide, type ComputedRef } from "vue";

export interface VHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface VHeadingLevelContext {
  level: ComputedRef<number>;
}

const KEY = injectionKey<VHeadingLevelContext>("VHeadingLevelContext");

export function useVHeadingLevelContext() {
  return inject(KEY, null);
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VHeadingLevel",
});

const props = defineProps<VHeadingProps>();

const inheritContext = useVHeadingLevelContext();
const computedLevel = computed(() => {
  if (props.level) return props.level;
  if (inheritContext) return Math.min(inheritContext.level.value + 1, 6);
  return 1;
});

provide(KEY, {
  level: computedLevel,
});
</script>

<template>
  <slot />
</template>
