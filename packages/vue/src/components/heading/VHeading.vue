<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/heading
 */

import { VPrimitive, type VPrimitiveProps } from "@blro/ui-primitives-vue";
import { computed, ref, toRefs } from "vue";
import { useVHeadingLevelContext } from "./VHeadingLevel.vue";
import { unrefElement } from "@vueuse/core";

export interface VHeadingProps extends /* @vue-ignore */ VPrimitiveProps {
  /**
   * @default
   * ```ts
   * `h${providedLevel ?? 1}`
   * ```
   */
  as?: string;
}
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
    ref="root"
  >
    <slot />
  </VPrimitive>
</template>
