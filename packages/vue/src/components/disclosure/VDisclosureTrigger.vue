<script lang="ts">
import { VButton, invariant, type VButtonProps } from "@blro/ui-primitives-vue";
import { mergeProps } from "vue";
import { useVDisclosureContext } from "./VDisclosure.vue";

export type VDisclosureTriggerProps = VButtonProps;
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosureTrigger",
  inheritAttrs: false,
});

defineProps<VDisclosureTriggerProps>();

const context = useVDisclosureContext();
invariant(context, "<VDisclosureTrigger> must be used within <VDisclosure>");
const { expanded, contentId } = context;
</script>

<template>
  <VButton
    :aria-expanded="expanded"
    :aria-controls="contentId"
    v-bind="mergeProps($attrs, $props)"
    @click="expanded = !expanded"
  >
    <slot />
  </VButton>
</template>
