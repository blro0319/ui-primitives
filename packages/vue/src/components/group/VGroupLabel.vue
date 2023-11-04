<script lang="ts">
import {
  VPrimitive,
  injectVGroupContext,
  useId,
} from "@blro/ui-primitives-vue";
import { useAttrs, watch } from "vue";

export interface VGroupLabelProps {
  /**
   * @default
   * ```ts
   * "div"
   * ```
   */
  as?: string;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  asChild?: boolean;
}
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
  <VPrimitive
    :id="id"
    aria-hidden="true"
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </VPrimitive>
</template>
