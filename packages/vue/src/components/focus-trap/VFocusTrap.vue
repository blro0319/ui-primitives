<script lang="ts">
import { VVisuallyHidden, type VVisuallyHiddenProps } from "~/components";

export type VFocusTrapProps = VVisuallyHiddenProps;
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<VFocusTrapProps>(), {
  as: undefined,
  asChild: undefined,
});
</script>

<template>
  <VVisuallyHidden
    v-bind="{ ...$attrs, as, asChild }"
    :style="{ position: 'fixed', top: 0, left: 0 }"
    tabindex="0"
    aria-hidden="true"
    data-focus-trap=""
  >
    <slot />
  </VVisuallyHidden>
</template>
