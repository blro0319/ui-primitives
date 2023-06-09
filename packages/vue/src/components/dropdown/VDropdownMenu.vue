<script setup lang="ts">
import { computed } from "vue";
import { VRovingTabindex } from "~/components";
import type { ComponentAs, VBindAttributes } from "~/types";
import { useVDropdownContext } from "./context";
import type { VDropdownMenuProps } from "./types";

withDefaults(defineProps<VDropdownMenuProps>(), {
  as: (): ComponentAs => "div",
  loop: false,
});

const { hooks, triggerId, menuId, visible, menu } =
  useVDropdownContext("VDropdownMenu");

hooks.$on("showMenu", (focusAt) => {
  const items = menu.value?.items.values();
  if (!items) return;
  const index = focusAt === "top" ? 0 : -1;
  Array.from(items).at(index)?.focus();
});

const bind = computed(() => {
  return {
    "role": "menu",
    "id": menuId.value,
    "aria-labelledby": triggerId.value,
  } satisfies VBindAttributes;
});
</script>

<template>
  <VRovingTabindex
    v-show="visible"
    :as="as"
    orientation="vertical"
    :loop="loop"
    v-bind="bind"
    ref="menu"
  >
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </VRovingTabindex>
</template>
