<script setup lang="ts">
import {
  VDisclosure,
  VDisclosureContent,
  VDisclosureTrigger,
} from "@blro/ui-primitives-vue";
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VDisclosure</h1>
    <VDisclosure>
      <VDisclosureTrigger style="display: block">Trigger</VDisclosureTrigger>
      <VDisclosureContent>Content</VDisclosureContent>
    </VDisclosure>
    <VDisclosure>
      <VDisclosureTrigger style="display: block">Trigger</VDisclosureTrigger>
      <VDisclosureContent unmount-on-hide>
        Content: Unmount on hide
      </VDisclosureContent>
    </VDisclosure>
    <VDisclosure>
      <VDisclosureTrigger as-child>
        <div>Trigger</div>
      </VDisclosureTrigger>
      <VDisclosureContent as-child>
        <article>Content</article>
      </VDisclosureContent>
    </VDisclosure>
    <VDisclosure>
      <VDisclosureTrigger as-child>
        <div>Trigger</div>
      </VDisclosureTrigger>
      <VDisclosureContent as-child unmount-on-hide>
        <article>Content: Unmount on hide</article>
      </VDisclosureContent>
    </VDisclosure>
  </div>
</template>
