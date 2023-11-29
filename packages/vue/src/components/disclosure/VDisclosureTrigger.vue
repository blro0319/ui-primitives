<script lang="ts">
import {
  VButton,
  invariant,
  omit,
  type VButtonProps,
} from "@blro/ui-primitives-vue";
import { useCurrentElement } from "@vueuse/core";
import { mergeProps, ref, toRefs, watch } from "vue";
import { useVDisclosureContext } from "./VDisclosure.vue";

export type VDisclosureTriggerProps = VButtonProps & {
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  preventToggleOnClick?: boolean;
};
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosureTrigger",
  inheritAttrs: false,
});

const props = defineProps<VDisclosureTriggerProps>();

const context = useVDisclosureContext();
invariant(context, "<VDisclosureTrigger> must be used within <VDisclosure>");
const { open, triggerElement, contentElement, toggle } = context;
const { preventToggleOnClick } = toRefs(props);

const selfElement = useCurrentElement<HTMLElement>();
const expanded = ref(false);

watch([open, triggerElement], () => {
  let isSelf = triggerElement.value === selfElement.value;
  if (!triggerElement.value?.isConnected) {
    triggerElement.value = selfElement.value;
    isSelf = true;
  }
  expanded.value = isSelf && open.value;
});

function handleClick(event: MouseEvent) {
  if (event.defaultPrevented) return;
  if (preventToggleOnClick.value) return;
  triggerElement.value = selfElement.value;
  toggle();
}
</script>

<template>
  <VButton
    :aria-expanded="expanded"
    :aria-controls="contentElement?.id"
    v-bind="mergeProps($attrs, omit(props, ['preventToggleOnClick']))"
    @click="handleClick"
  >
    <slot />
  </VButton>
</template>
