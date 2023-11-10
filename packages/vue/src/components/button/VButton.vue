<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/button
 */

import { isButton } from "@ariakit/core/utils/dom";
import { VCommand, type VCommandProps } from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import { computed, ref } from "vue";

export interface VButtonProps extends /* @vue-ignore */ VCommandProps {}
</script>

<script setup lang="ts">
defineOptions({
  name: "VButton",
  inheritAttrs: false,
});

defineProps<VButtonProps>();

const root = ref<InstanceType<typeof VCommand>>();
const rootElement = computed(() => unrefElement(root));

const role = computed(() => {
  if (!rootElement.value) return "button";
  if (!isButton(rootElement.value) && rootElement.value.tagName !== "A") {
    return "button";
  }
  return undefined;
});
</script>

<template>
  <VCommand :role="role" v-bind="$attrs" ref="root">
    <slot />
  </VCommand>
</template>
