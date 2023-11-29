<script lang="ts">
import { isSelfTarget } from "@ariakit/core/cjs/utils/events";
import {
  VCollection,
  VFocusable,
  type Nullish,
  type VCollectionProps,
  type VFocusableProps,
} from "@blro/ui-primitives-vue";
import { unrefElement } from "@vueuse/core";
import {
  computed,
  provide,
  ref,
  type ComponentPublicInstance,
  type Ref,
} from "vue";

export type VCompositeProps = VCollectionProps &
  Omit<VFocusableProps, "as" | "as-child"> & {
    /**
     * @default
     * ```ts
     * true
     * ```
     */
    composite?: boolean;
    /**
     * @default
     * ```ts
     * true
     * ```
     */
    focusOnMove?: boolean;
    /**
     * @default
     * ```ts
     * true
     * ```
     */
    moveOnKeyPress?: boolean | ((event: KeyboardEvent) => void);
  };

export interface VCompositeContext {
  baseElement: Ref<HTMLElement | Nullish>;
  virtualFocus: Ref<boolean>;
  orientation: Ref<Orientation>;
  rtl: Ref<boolean>;
  focusLoop: Ref<boolean>;
  focusWrap: Ref<boolean>;
  focusShift: Ref<boolean>;
  moves: Ref<number>;
  includesBaseElement: Ref<boolean>;
  activeId: Ref<string | undefined>;
}

export type Orientation = "horizontal" | "vertical" | "both";

const DEFAULT_SCOPE = Symbol("VComposite");
</script>

<script setup lang="ts">
defineOptions({
  name: "VComposite",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VCompositeProps>(), {
  scope: DEFAULT_SCOPE,
  composite: true,
  focusOnMove: true,
  moveOnKeyPress: true,
});

const root = ref<ComponentPublicInstance>();
const baseElement = computed(() => {
  return unrefElement(root.value) as HTMLElement | Nullish;
});

const virtualFocus = ref(false);
const orientation = ref<Orientation>("both");
const rtl = ref(false);
const focusLoop = ref(true);
const focusWrap = ref(true);
const focusShift = ref(true);
const moves = ref(0);
const includesBaseElement = ref(true);
const activeId = ref<string>();

provide<VCompositeContext>(props.scope, {
  baseElement,
  virtualFocus,
  orientation,
  rtl,
  focusLoop,
  focusWrap,
  focusShift,
  moves,
  includesBaseElement,
  activeId,
});

function handleKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  if (!isSelfTarget(event)) return;
}
</script>

<template>
  <VCollection as-child :scope="scope">
    <VFocusable
      v-bind="$attrs"
      :as="as"
      :as-child="asChild"
      :focusable="focusable"
      :autofocus="autofocus"
      :disabled="disabled"
      :accessible-when-disabled="accessibleWhenDisabled"
      ref="root"
      @keydown.capture="handleKeyDown"
    >
      <slot />
    </VFocusable>
  </VCollection>
</template>
