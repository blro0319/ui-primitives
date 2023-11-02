<script setup lang="ts">
import { VCommand } from "@blro/ui-primitives-vue";

function click(msg: string) {
  alert(msg);
}
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VCommand</h1>
    <VCommand @click="click('Default')">Default</VCommand>
    <VCommand as="button" @click="click('Native Button')">
      Native Button
    </VCommand>
    <VCommand as-child>
      <button @click="click('Native Button As Child')">
        Native Button As Child
      </button>
    </VCommand>
    <VCommand disabled @click="click('Disabled')">Disabled</VCommand>
    <VCommand disabled accessible-when-disabled @click="click('Disabled')">
      Accessible When Disabled
    </VCommand>
    <VCommand :click-on-enter="false" @click="click('Click On Enter Off')">
      Click On Enter Off
    </VCommand>
    <VCommand :click-on-scape="false" @click="click('Click On Scape Off')">
      Click On Scape Off
    </VCommand>
  </div>
</template>
