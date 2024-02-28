<script lang="ts">
import { syncRef } from "@vueuse/core";
import { toRefs } from "vue";
import { VPrimitive, type VPrimitiveProps } from "~/components";
import { useIdWithAttrs } from "~/composables";
import { useVGroupContext } from "./context";

export type VGroupLabelProps = VPrimitiveProps;
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<VGroupLabelProps>(), {
  as: undefined,
  asChild: undefined,
});

const id = useIdWithAttrs();

const group = useVGroupContext();
if (!group) throw new Error("VGroupLabel must be used within a VGroup.");
const { labelId } = toRefs(group);
syncRef(labelId, id, { direction: "rtl" });
</script>

<template>
  <VPrimitive :id="id" aria-hidden="true" v-bind="{ ...$attrs, as, asChild }">
    <slot />
  </VPrimitive>
</template>
