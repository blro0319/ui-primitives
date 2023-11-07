<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/heading
 */

import { VPrimitive } from "@blro/ui-primitives-vue";
import { computed, toRefs } from "vue";
import { useVHeadingLevelContext } from "./VHeadingLevel.vue";

export interface VHeadingProps {
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
  name: "VHeading",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VHeadingProps>(), {
  as: undefined,
});

const { as } = toRefs(props);

const levelContext = useVHeadingLevelContext();
const level = computed(() => levelContext?.level.value ?? 1);
const tag = computed(() => as.value ?? `h${level.value}`);
const isNativeHeading = computed(() => /^h\d$/.test(tag.value));
</script>

<template>
  <VPrimitive
    :role="!isNativeHeading ? 'heading' : undefined"
    :aria-level="!isNativeHeading ? level : undefined"
    v-bind="$attrs"
    :as="tag"
    :as-child="asChild"
  >
    <slot />
  </VPrimitive>
</template>
