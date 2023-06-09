<script lang="ts">
export default defineComponent({ inheritAttrs: false });
</script>

<script setup lang="ts">
import { disableBodyScroll, enableBodyScroll } from "@blro/body-scroll-lock";
import { unrefElement } from "@vueuse/core";
import { computed, defineComponent, nextTick, ref, toRefs } from "vue";
import { VContent, useVTransitionContext } from "~/components";
import { useGlobalCancelStack } from "~/composables";
import { setVDialogContext } from "./context";
import type { VDialogEmits, VDialogProps } from "./types";

const props = withDefaults(defineProps<VDialogProps>(), {
  transition: undefined,
  cancelTrigger: "all",
});
const emit = defineEmits<VDialogEmits>();

const { cancelTrigger } = toRefs(props);
const transition = useVTransitionContext();
const root = ref<InstanceType<typeof VContent>>();
const rootElement = computed(() => {
  return unrefElement(root.value) as HTMLDialogElement | undefined;
});
const visible = ref(false);
let mode: "show" | "showModal" = "show";

const cancelStack = useGlobalCancelStack(
  () => {
    cancel();
    if (visible.value) cancelStack.create();
  },
  computed(() => {
    if (cancelTrigger.value === "all") return { escape: true, history: true };
    return {
      escape: cancelTrigger.value === "escape",
      history: cancelTrigger.value === "history",
    };
  })
);

async function internalShow(method: "show" | "showModal") {
  if (visible.value) return;
  cancelStack.create();
  visible.value = true;
  await nextTick();

  rootElement.value?.[method]();
  if (method === "showModal") {
    disableBodyScroll();
  }

  mode = method;
  emit("show");
}

function close() {
  if (!visible.value) return;

  cancelStack.revoke({ historyBack: true });
  visible.value = false;
  if (!transition) afterClose();
  emit("close");
}
transition?.$on("after-leave", afterClose);
function afterClose() {
  rootElement.value?.close();
  if (mode === "showModal") enableBodyScroll();
}

function cancel() {
  if (!visible.value) return;
  const event = new Event("cancel", { cancelable: true });
  emit("cancel", event);
  if (!event.defaultPrevented) close();
}

setVDialogContext({ cancel, close });

defineExpose({
  show: () => internalShow("show"),
  showModal: () => internalShow("showModal"),
  close,
  cancel,
});
</script>

<template>
  <VContent
    v-show="visible"
    v-bind="$attrs"
    as="dialog"
    ref="root"
    class="v-dialog"
    @cancel.prevent
  >
    <slot />
  </VContent>
</template>

<style lang="scss" scoped>
.v-dialog {
  :where(&) {
    display: block;
  }
}
</style>
