<script lang="ts">
import { unrefElement } from "@vueuse/core";
import { type ComponentPublicInstance, computed, ref, useAttrs } from "vue";
import { VCommand, type VCommandEmits, type VCommandProps } from "~/components";
import { isButton } from "~/utils";

export type VButtonProps = {
  /**
   * @default
   * ```ts
   * "button"
   * ```
   */
  as?: VCommandProps["as"];
} & Omit<VCommandProps, "as">;
export type VButtonEmits = VCommandEmits;
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<VButtonProps>(), {
  as: "button",
  asChild: undefined,
  disabled: undefined,
  focusable: undefined,
  accessibleWhenDisabled: undefined,
  clickOnEnter: undefined,
  clickOnSpace: undefined,
});
const emit = defineEmits<VButtonEmits>();

const attrs = useAttrs();

const component = ref<ComponentPublicInstance>();
const element = computed(() => unrefElement(component.value));
const tagName = computed(() => element.value?.tagName.toLowerCase());
const isNativeButton = computed(() => {
  if (!tagName.value) return false;
  return isButton({
    tagName: tagName.value,
    type: attrs.type as string | undefined,
  });
});
</script>

<template>
  <VCommand
    ref="component"
    :role="!isNativeButton && tagName !== 'a' ? 'button' : undefined"
    v-bind="{ ...$attrs, ...$props }"
    @focus-visible="emit('focusVisible', $event)"
  >
    <slot />
  </VCommand>
</template>
