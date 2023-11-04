<script lang="ts">
import { VPrimitive } from "@blro/ui-primitives-vue";
import { inject, provide, ref, type Ref } from "vue";

export interface VGroupProps {
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

const CONTEXT_KEY = Symbol("VGroup");

export interface VGroupContext {
  labelId: Ref<string | undefined>;
}

export function provideVGroupContext() {
  const labelId = ref<string>();

  const context: VGroupContext = { labelId };
  provide(CONTEXT_KEY, context);
  return context;
}
export function injectVGroupContext() {
  return inject<VGroupContext | null>(CONTEXT_KEY, null);
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VGroup",
  inheritAttrs: false,
});

defineProps<VGroupProps>();

const { labelId } = provideVGroupContext();
</script>

<template>
  <VPrimitive
    role="group"
    :aria-labelledby="labelId ? labelId : undefined"
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </VPrimitive>
</template>
