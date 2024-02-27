<script lang="ts">
import { unrefElement } from "@vueuse/core";
import { type ComponentPublicInstance, computed, ref } from "vue";
import VFocusTrap from "./VFocusTrap.vue";
import { VPrimitive, type VPrimitiveProps } from "~/components";
import { getAllTabbableIn } from "~/utils";

export type VFocusTrapRegionProps = Omit<VPrimitiveProps, "asChild"> & {
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  enabled?: boolean;
};
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VFocusTrapRegionProps>(), {
  as: undefined,
  enabled: false,
});

const container = ref<ComponentPublicInstance>();
const containerElement = computed(() => {
  return (unrefElement(container) ?? null) as HTMLElement | null;
});

function handleFocus(event: FocusEvent) {
  if (!props.enabled) return;

  const container = containerElement.value;
  if (!container) return;

  const tabbableElements = getAllTabbableIn(container, true)
    .filter((element) => !("focusTrap" in element.dataset));
  const first = tabbableElements.at(0);
  const last = tabbableElements.at(-1);

  // Fallbacks to the container element
  if (!tabbableElements.length) {
    container.focus();
    return;
  }

  if (event.relatedTarget === first) {
    last?.focus();
  } else {
    first?.focus();
  }
}
</script>

<template>
  <VPrimitive ref="container" v-bind="{ ...$attrs, as }">
    <VFocusTrap v-if="enabled" @focus="handleFocus" />
    <slot />
    <VFocusTrap v-if="enabled" @focus="handleFocus" />
  </VPrimitive>
</template>
