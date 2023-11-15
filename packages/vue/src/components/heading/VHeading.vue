<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/heading
 */

import { VPrimitive, type VPrimitiveProps } from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import { computed, ref, toRefs } from "vue";
import { useVHeadingLevelContext } from "./VHeadingLevel.vue";

export type VHeadingProps = {
  /**
   * @default
   * ```ts
   * `h${providedLevel ?? 1}`
   * ```
   */
  as?: string;
} & Omit<VPrimitiveProps, "as">;
</script>

<script setup lang="ts">
defineOptions({
  name: "VHeading",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VHeadingProps>(), {
  as: undefined,
});

const { as } = toRefs(props);

const levelContext = useVHeadingLevelContext();
const level = computed(() => levelContext?.level.value ?? 1);

const root = ref<InstanceType<typeof VPrimitive>>();
const rootElement = computed(() => unrefElement(root.value));
const isNativeHeading = computed(() => {
  if (!rootElement.value) return false;
  return /^H\d$/.test(rootElement.value.tagName);
});
</script>

<template>
  <VPrimitive
    :role="!isNativeHeading ? 'heading' : undefined"
    :aria-level="!isNativeHeading ? level : undefined"
    v-bind="$attrs"
    :as="as ?? `h${level}`"
    :as-child="asChild"
    ref="root"
  >
    <slot />
  </VPrimitive>
</template>
