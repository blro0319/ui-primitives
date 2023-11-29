<script lang="ts">
import {
  VPrimitive,
  invariant,
  type VPrimitiveProps,
} from "@blro/ui-primitives-vue";
import {
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  toRefs,
  watch,
} from "vue";
import {
  V_COLLECTION_ITEM_ATTRIBUTE,
  useVCollectionContext,
} from "./VCollection.vue";

export type VCollectionItemProps = VPrimitiveProps & {
  scope?: string | symbol;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  disabled?: boolean;
};
</script>

<script setup lang="ts">
defineOptions({
  name: "VCollectionItem",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VCollectionItemProps>(), {
  scope: undefined,
  disabled: false,
});

const { disabled } = toRefs(props);

const context = useVCollectionContext(props.scope);
invariant(context, "<VCollectionItem> must be used within <VCollection>");
const { contextId, updateItems } = context;

onMounted(updateItems);
onUnmounted(updateItems);

onActivated(updateItems);
onDeactivated(updateItems);

watch(disabled, updateItems);
</script>

<template>
  <VPrimitive
    v-bind="$attrs"
    :as="as"
    :as-child="asChild"
    :[V_COLLECTION_ITEM_ATTRIBUTE]="!disabled ? contextId : undefined"
  >
    <slot />
  </VPrimitive>
</template>
