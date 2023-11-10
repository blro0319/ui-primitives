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
    <VCommand as="div" @click="click('Default')">Default</VCommand>
    <VCommand @click="click('Native Button')">Native Button</VCommand>
    <VCommand as-child>
      <button @click="click('Native Button As Child')">
        Native Button As Child
      </button>
    </VCommand>
    <VCommand as="div" disabled @click="click('Disabled')">Disabled</VCommand>
    <VCommand
      as-child
      disabled
      accessible-when-disabled
      @click="click('Disabled')"
    >
      <div>Accessible When Disabled</div>
    </VCommand>
    <VCommand
      as="div"
      :click-on-enter="false"
      @click="click('Click On Enter Off')"
    >
      Click On Enter Off
    </VCommand>
    <VCommand
      as="div"
      :click-on-scape="false"
      @click="click('Click On Scape Off')"
    >
      Click On Scape Off
    </VCommand>
    <VCommand :click-on-enter="false" @click="click('Click On Enter Off')">
      Click On Enter Off
    </VCommand>
    <VCommand :click-on-scape="false" @click="click('Click On Scape Off')">
      Click On Scape Off
    </VCommand>
  </div>
</template>
