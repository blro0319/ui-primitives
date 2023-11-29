<script lang="ts">
import {
  VPrimitive,
  invariant,
  omit,
  useId,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { useCurrentElement, watchImmediate } from "@vueuse/core";
import { computed, mergeProps, toRefs, useAttrs } from "vue";
import { useVDisclosureContext } from "./VDisclosure.vue";

export type VDisclosureContentProps = VPrimitiveProps & {
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  unmountOnHide?: boolean;
};
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosureContent",
  inheritAttrs: false,
});

const props = defineProps<VDisclosureContentProps>();

const { unmountOnHide } = toRefs(props);

const context = useVDisclosureContext();
invariant(context, "<VDisclosureContent> must be used within <VDisclosure>");
const { open, contentElement } = context;

const attrs = useAttrs();
const id = useId(attrs.id as string | null | undefined);
const selfElement = useCurrentElement<HTMLElement>();

const willRender = computed(() => {
  return !unmountOnHide.value || open.value;
});

watchImmediate(willRender, (willRender) => {
  if (!willRender) contentElement.value = null;
  else contentElement.value = selfElement.value;
});
watchImmediate([selfElement, id], () => {
  if (willRender.value && id.value) contentElement.value = selfElement.value;
});
</script>

<template>
  <VPrimitive
    v-if="willRender"
    v-show="open"
    v-bind="mergeProps($attrs, omit(props, ['unmountOnHide']))"
    :id="id"
  >
    <slot />
  </VPrimitive>
</template>
