<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/group
 */

import {
  VPrimitive,
  invariant,
  useId,
  useVGroupContext,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { useAttrs, watch } from "vue";

export type VGroupLabelProps = VPrimitiveProps;
</script>

<script setup lang="ts">
defineOptions({
  name: "VGroupLabel",
  inheritAttrs: false,
});

defineProps<VGroupLabelProps>();
const attrs = useAttrs();

const groupContext = useVGroupContext();
invariant(groupContext, "<VGroupLabel> must be used within <VGroup>");
const { labelId } = groupContext;

const id = useId(() => {
  if (!attrs.id) return null;
  return String(attrs.id);
});
watch(
  id,
  (id) => {
    labelId.value = id;
  },
  { immediate: true }
);
</script>

<template>
  <VPrimitive
    aria-hidden="true"
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
    :id="id"
  >
    <slot />
  </VPrimitive>
</template>
