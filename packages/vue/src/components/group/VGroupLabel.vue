<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/group
 */

import {
  VPrimitive,
  injectVGroupContext,
  useId,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { useAttrs, watch } from "vue";

export interface VGroupLabelProps extends /* @vue-ignore */ VPrimitiveProps {}
</script>

<script setup lang="ts">
defineOptions({
  name: "VGroupLabel",
  inheritAttrs: false,
});

defineProps<VGroupLabelProps>();

const groupContext = injectVGroupContext();
const attrs = useAttrs();

const id = useId(() => {
  if (!attrs.id) return null;
  return String(attrs.id);
});
watch(
  id,
  (id) => {
    if (!groupContext) return;
    groupContext.labelId.value = id;
  },
  { immediate: true }
);
</script>

<template>
  <VPrimitive :id="id" aria-hidden="true" v-bind="$attrs">
    <slot />
  </VPrimitive>
</template>
