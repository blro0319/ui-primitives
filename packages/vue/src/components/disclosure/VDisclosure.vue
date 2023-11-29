<script lang="ts">
import {
  injectionKey,
  usePassiveVModel,
  type MaybeRefs,
  type Nullish,
  type Prettify,
} from "@blro/ui-primitives-vue";
import { inject, provide, ref, toValue, type ToRefs, toRefs } from "vue";

export type VDisclosureProps = {
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  open?: boolean;
  /**
   * @default
   * ```ts
   * false
   * ```
   */
  defaultOpen?: boolean;
};

export type VDisclosureEmits = {
  (e: "update:open", value: boolean): boolean;
};

export type VDisclosureState = {
  open: boolean;
  defaultOpen: boolean;
  triggerElement: HTMLElement | Nullish;
  contentElement: HTMLElement | Nullish;
};
export type VDisclosureContext = Prettify<
  ToRefs<VDisclosureState> & {
    show(): void;
    hide(): void;
    toggle(): void;
  }
>;

const SCOPE = injectionKey<VDisclosureContext>("VDisclosure");

export function createVDisclosureContext(
  state: Partial<MaybeRefs<VDisclosureState>> = {}
): VDisclosureContext {
  const open = ref(state.open ?? toValue(state.defaultOpen) ?? false);
  const defaultOpen = ref(state.defaultOpen ?? false);
  const triggerElement = ref(state.triggerElement ?? null);
  const contentElement = ref(state.contentElement ?? null);

  return {
    open,
    defaultOpen,
    triggerElement,
    contentElement,
    show() {
      open.value = true;
    },
    hide() {
      open.value = false;
    },
    toggle() {
      open.value = !open.value;
    },
  };
}
export function useVDisclosureContext() {
  return inject(SCOPE, null);
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosure",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VDisclosureProps>(), {
  open: undefined,
  defaultOpen: false,
});
const emit = defineEmits<VDisclosureEmits>();

const context = createVDisclosureContext({
  ...toRefs(props),
  open: usePassiveVModel(props, "open", emit, props.defaultOpen),
});

provide(SCOPE, context);

defineExpose(context);
</script>

<template>
  <slot />
</template>
