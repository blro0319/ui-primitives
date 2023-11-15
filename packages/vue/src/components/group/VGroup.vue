<script lang="ts">
/**
 * @credit Ariakit
 * @see https://ariakit.org/components/group
 */

import {
  injectionKey,
  VPrimitive,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { inject, provide, ref, type Ref } from "vue";

export type VGroupProps = VPrimitiveProps;

export interface VGroupContext {
  labelId: Ref<string | undefined>;
}

const KEY = injectionKey<VGroupContext>("VGroup");

export function injectVGroupContext() {
  return inject(KEY, null);
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VGroup",
  inheritAttrs: false,
});

defineProps<VGroupProps>();

const labelId = ref<string>();
provide(KEY, { labelId });
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
