<script lang="ts">
import {
  VPrimitive,
  invariant,
  useId,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { computed, toRefs, useAttrs, watch } from "vue";
import { useVDisclosureContext } from "./VDisclosure.vue";

export interface VDisclosureContentProps
  extends /* @vue-ignore */ VPrimitiveProps {
  unmountOnHide?: boolean;
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosureContent",
  inheritAttrs: false,
});

const props = defineProps<VDisclosureContentProps>();

const { unmountOnHide } = toRefs(props);

const context = useVDisclosureContext();
invariant(
  context,
  "<VDisclosureContent> component must be used within <VDisclosure>"
);
const { expanded, contentId } = context;

const attrs = useAttrs();
const id = useId(attrs.id as string | null | undefined);

const willRender = computed(() => {
  return !unmountOnHide.value || expanded.value;
});

watch(
  [willRender, id],
  ([willRender, id]) => {
    if (!willRender) contentId.value = undefined;
    else contentId.value = id;
  },
  { immediate: true }
);
</script>

<template>
  <VPrimitive
    v-if="!unmountOnHide || expanded"
    v-show="expanded"
    v-bind="$attrs"
    :id="id"
  >
    <slot />
  </VPrimitive>
</template>
