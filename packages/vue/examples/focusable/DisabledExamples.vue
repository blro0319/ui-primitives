<script setup lang="ts">
import { VFocusable } from "~/components";
</script>

<template>
  <div>
    <VFocusable disabled>
      No native focusable
    </VFocusable>
    <VFocusable as="a" href="https://github.com" disabled>
      Not support disabled
    </VFocusable>
    <VFocusable as="button" disabled>
      Native disabled
    </VFocusable>
    <VFocusable disabled contenteditable="true">
      Contenteditable
    </VFocusable>
    <VFocusable :focusable="false" disabled>
      Not focusable
    </VFocusable>
    <section>
      <h4>Accessible</h4>
      <VFocusable disabled accessible-when-disabled>
        No native focusable
      </VFocusable>
      <VFocusable as="a" href="https://github.com" disabled accessible-when-disabled>
        Not support disabled
      </VFocusable>
      <VFocusable as="button" disabled accessible-when-disabled>
        Native disabled
      </VFocusable>
      <VFocusable contenteditable="true" accessible-when-disabled>
        Contenteditable
      </VFocusable>
      <VFocusable :focusable="false" disabled accessible-when-disabled>
        Not focusable
      </VFocusable>
    </section>
  </div>
</template>
