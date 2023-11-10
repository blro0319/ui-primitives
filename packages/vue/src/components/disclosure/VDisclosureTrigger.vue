<script lang="ts">
import { VButton, invariant, type VButtonProps } from "@blro/ui-primitives-vue";
import { useVDisclosureContext } from "./VDisclosure.vue";

export interface VDisclosureTriggerProps
  extends /* @vue-ignore */ VButtonProps {}
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosureTrigger",
  inheritAttrs: false,
});

defineProps<VDisclosureTriggerProps>();

const context = useVDisclosureContext();
invariant(
  context,
  "<VDisclosureTrigger> component must be used within <VDisclosure>"
);
const { expanded, contentId } = context;
</script>

<template>
  <VButton
    :aria-expanded="expanded"
    :aria-controls="contentId"
    v-bind="$attrs"
    @click="expanded = !expanded"
  >
    <slot />
  </VButton>
</template>
