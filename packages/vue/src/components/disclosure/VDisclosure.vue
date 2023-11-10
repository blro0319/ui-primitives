<script lang="ts">
import { injectionKey } from "@blro/ui-primitives-vue";
import {
  computed,
  inject,
  provide,
  ref,
  toRefs,
  type Ref,
  type WritableComputedRef,
} from "vue";

export interface VDisclosureProps {
  open?: boolean;
  defaultOpen?: boolean;
}

export interface VDisclosureEmits {
  (e: "update:open", value: boolean): void;
}

export interface VDisclosureContext {
  expanded: WritableComputedRef<boolean>;
  contentId: Ref<string | undefined>;
}

const KEY = injectionKey<VDisclosureContext>("VDisclosure");

export function useVDisclosureContext() {
  return inject(KEY, null);
}
</script>

<script setup lang="ts">
defineOptions({
  name: "VDisclosure",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VDisclosureProps>(), {
  open: undefined,
});
const emit = defineEmits<VDisclosureEmits>();

const { open, defaultOpen } = toRefs(props);
const internalOpen = ref(defaultOpen.value);

const expanded = computed({
  get() {
    if (open.value !== undefined) return open.value;
    return internalOpen.value;
  },
  set(value) {
    if (open.value !== undefined) return emit("update:open", value);
    internalOpen.value = value;
  },
});

provide(KEY, {
  expanded,
  contentId: ref<string>(),
});
</script>

<template>
  <slot />
</template>
