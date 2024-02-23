<script setup lang="ts">
import { VFocusable } from "~/components";
</script>

<template>
  <main>
    <h1>VFocusable</h1>
    <section>
      <h2>Focusable Prop</h2>
      <VFocusable as="button" data-testid="focusable:native">
        Native
      </VFocusable>
      <VFocusable data-testid="focusable:non-native">
        Non-Native
      </VFocusable>
      <VFocusable
        as="button" :focusable="false"
        data-testid="focusable:native:not-focusable"
      >
        Native Not Focusable
      </VFocusable>
      <VFocusable :focusable="false" data-testid="focusable:non-native:not-focusable">
        Non-Native Not Focusable
      </VFocusable>
    </section>
    <section>
      <h2>Focus Visible Attribute</h2>
      <VFocusable as="button" data-testid="focus-visible:basic">
        Basic
      </VFocusable>
      <VFocusable
        as="input" type="text" value="Always focus visible"
        data-testid="focus-visible:always"
      />
    </section>
    <section>
      <h2>Disabled Prop (Not Accessible)</h2>
      <VFocusable as="button" disabled data-testid="disabled:native">
        Native
      </VFocusable>
      <VFocusable as="a" href="#" disabled data-testid="disabled:not-supported">
        Not Native Supported
      </VFocusable>
      <VFocusable disabled data-testid="disabled:non-native">
        Non-Native
      </VFocusable>
      <VFocusable
        disabled contenteditable="true"
        data-testid="disabled:contenteditable"
      >
        Content Editable
      </VFocusable>
      <VFocusable
        :focusable="false" disabled
        data-testid="disabled:not-focusable"
      >
        Not Focusable
      </VFocusable>
    </section>
    <section>
      <h2>Disabled Prop (Accessible)</h2>
      <VFocusable
        as="button" disabled accessible-when-disabled
        data-testid="acc-disabled:native"
      >
        Native
      </VFocusable>
      <VFocusable
        as="a" href="#" disabled accessible-when-disabled
        data-testid="acc-disabled:not-supported"
      >
        Not Native Supported
      </VFocusable>
      <VFocusable
        disabled accessible-when-disabled
        data-testid="acc-disabled:non-native"
      >
        Non-Native
      </VFocusable>
      <VFocusable
        disabled accessible-when-disabled contenteditable="true"
        data-testid="acc-disabled:contenteditable"
      >
        Content Editable
      </VFocusable>
      <VFocusable
        :focusable="false" disabled accessible-when-disabled
        data-testid="acc-disabled:not-focusable"
      >
        Not Focusable
      </VFocusable>
    </section>
  </main>
</template>
