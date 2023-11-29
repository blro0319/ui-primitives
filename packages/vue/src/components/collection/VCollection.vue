<script lang="ts">
import {
  VPrimitive,
  useId,
  type MaybeRefs,
  type Nullish,
  type Prettify,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import {
  inject,
  provide,
  ref,
  useAttrs,
  type ComponentPublicInstance,
  type MaybeRef,
  type ToRefs,
} from "vue";

export type VCollectionProps = VPrimitiveProps & {
  scope?: string | symbol;
};

export type VCollectionState = {
  contextId: string;
  items: HTMLElement[];
};
export type VCollectionContext = Prettify<
  ToRefs<VCollectionState> & {
    updateItems(): void;
  }
>;

export const V_COLLECTION_ITEM_ATTRIBUTE = "data-v-collection-item";

const DEFAULT_SCOPE = Symbol("VCollection");

export function createVCollectionContext(
  container: MaybeRef<HTMLElement | ComponentPublicInstance | Nullish>,
  state: Partial<MaybeRefs<VCollectionState>> = {}
): VCollectionContext {
  const contextId = ref(state.contextId ?? useId());
  const items = ref(state.items ?? []);

  let requestId: ReturnType<typeof requestAnimationFrame> | undefined;
  function updateItems() {
    if (requestId) return;
    requestId = requestAnimationFrame(() => {
      const containerElement = unrefElement(container);
      if (!containerElement) return;

      const selector = `[${V_COLLECTION_ITEM_ATTRIBUTE}="${contextId.value}"]`;
      items.value = Array.from(containerElement.querySelectorAll(selector));

      requestId = undefined;
    });
  }

  return {
    contextId,
    items,
    updateItems,
  };
}
export function useVCollectionContext(scope?: string | symbol | Nullish) {
  return inject<VCollectionContext | null>(scope ?? DEFAULT_SCOPE, null);
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VCollection",
  inheritAttrs: false,
});

const props = defineProps<VCollectionProps>();
const attrs = useAttrs();

const root = ref<InstanceType<typeof VPrimitive>>();

const context = createVCollectionContext(root, {
  contextId: attrs.id as string | undefined,
});

provide<VCollectionContext>(props.scope ?? DEFAULT_SCOPE, context);
defineExpose(context);
</script>

<template>
  <VPrimitive v-bind="$attrs" :as="as" :as-child="asChild" ref="root">
    <slot />
  </VPrimitive>
</template>
