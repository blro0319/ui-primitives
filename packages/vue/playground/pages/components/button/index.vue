<script setup lang="ts">
import { VButton } from "@blro/ui-primitives-vue";

function click(msg: string) {
  alert(msg);
}
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VButton</h1>
    <VButton @click="click('Default')">Default</VButton>
    <VButton as="div" @click="click('Non Native Button')">Non Native</VButton>
    <VButton disabled @click="click('Default')">Default Disabled</VButton>
    <VButton as="div" disabled @click="click('Non Native Disabled')">
      Non Native Disabled
    </VButton>
    <VButton
      disabled
      accessible-when-disabled
      @click="click('Default Accessible Disabled')"
    >
      Default Accessible Disabled
    </VButton>
    <VButton
      as="div"
      disabled
      accessible-when-disabled
      @click="click('Non Native Disabled')"
    >
      Non Native Disabled
    </VButton>
  </div>
</template>
