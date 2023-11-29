<script lang="ts">
import {
  VCommand,
  useId,
  type VCommandProps,
  VCollectionItem,
} from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import { computed, ref, toRefs, useAttrs } from "vue";

export type VCompositeItemProps = VCommandProps & {
  rowId?: string;
  preventScrollOnKeyDown?: boolean;
  preventMoveOnKeyPress?: boolean;
};
</script>

<script setup lang="ts">
defineOptions({
  name: "VCompositeItem",
  inheritAttrs: false,
});

const props = defineProps<VCompositeItemProps>();
const attrs = useAttrs();

const { disabled, accessibleWhenDisabled } = toRefs(props);

const root = ref<InstanceType<typeof VCommand>>();
const rootElement = computed(() => unrefElement(root.value));

const id = useId(attrs.id);

const itemDisabled = computed(() => {
  return disabled.value || String(attrs["aria-disabled"]) === "true";
});
const trulyDisabled = computed(() => {
  return itemDisabled.value && !accessibleWhenDisabled.value;
});

function handleFocus(event: FocusEvent) {
  if (event.defaultPrevented) return;
  if (!id.value) return;
}
</script>

<template>
  <VCollectionItem as-child>
    <VCommand
      v-bind="$attrs"
      :as="as"
      :as-child="asChild"
      :focusable="focusable"
      :autofocus="autofocus"
      :disabled="disabled"
      :accessible-when-disabled="accessibleWhenDisabled"
      :click-on-enter="clickOnEnter"
      :click-on-scape="clickOnScape"
      :id="id"
      ref="root"
      @focus="handleFocus"
    >
      <slot />
    </VCommand>
  </VCollectionItem>
</template>
