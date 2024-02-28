<script lang="ts">
import { reactive, ref } from "vue";
import { VPrimitive, type VPrimitiveProps } from "~/components";
import { setVGroupContext } from "./context";

export type VGroupProps = VPrimitiveProps;
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<VGroupProps>(), {
  as: undefined,
  asChild: undefined,
});

const labelId = ref("");
setVGroupContext(reactive({ labelId }));
</script>

<template>
  <VPrimitive
    role="group"
    :aria-labelledby="labelId"
    v-bind="{ ...$attrs, as, asChild }"
  >
    <slot />
  </VPrimitive>
</template>
