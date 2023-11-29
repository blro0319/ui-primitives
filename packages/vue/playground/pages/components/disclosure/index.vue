<script setup lang="ts">
import {
  VDisclosure,
  VDisclosureContent,
  VDisclosureTrigger,
} from "@blro/ui-primitives-vue";
import { ref } from "vue";

const disclosure = ref<InstanceType<typeof VDisclosure>>();

const open = ref(false);
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VDisclosure</h1>
    <hr />
    <div>
      <button @click="disclosure?.show()">Show</button>
      <button @click="disclosure?.hide()">Hide</button>
      <button @click="disclosure?.toggle()">Toggle</button>
    </div>
    <VDisclosure ref="disclosure">
      <VDisclosureTrigger>Default</VDisclosureTrigger>
      <VDisclosureContent>Content</VDisclosureContent>
    </VDisclosure>
    <hr />
    <VDisclosure default-open>
      <VDisclosureTrigger>Default Open</VDisclosureTrigger>
      <VDisclosureContent>Content</VDisclosureContent>
    </VDisclosure>
    <hr />
    <div>
      <button @click="open = !open">Toggle</button>
    </div>
    <VDisclosure v-model:open="open">
      <VDisclosureTrigger>Controlled</VDisclosureTrigger>
      <VDisclosureContent unmount-on-hide>Content</VDisclosureContent>
    </VDisclosure>
  </div>
</template>
