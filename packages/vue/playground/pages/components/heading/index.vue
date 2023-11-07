<script setup lang="ts">
import { VHeading, VHeadingLevel } from "@blro/ui-primitives-vue";
</script>

<template>
  <div>
    <button @click="$router.back()">Back</button>
    <h1>VHeading</h1>
    <VHeading>Heading 1</VHeading>
    <VHeadingLevel>
      <VHeading>Heading 1</VHeading>
      <VHeadingLevel>
        <VHeading>Heading 2</VHeading>
        <VHeadingLevel>
          <VHeading>Heading 3</VHeading>
          <VHeadingLevel>
            <VHeading>Heading 4</VHeading>
            <VHeadingLevel>
              <VHeading>Heading 5</VHeading>
              <VHeadingLevel>
                <VHeading>Heading 6</VHeading>
                <VHeadingLevel>
                  <VHeading>Heading 6 (Max)</VHeading>
                </VHeadingLevel>
              </VHeadingLevel>
            </VHeadingLevel>
          </VHeadingLevel>
        </VHeadingLevel>
      </VHeadingLevel>
    </VHeadingLevel>
    <VHeading as="div">Heading 1 (as div)</VHeading>
    <VHeading as="h2">Heading 2 (as h2)</VHeading>
    <VHeadingLevel :level="3">
      <VHeading>Heading 3 (set by prop)</VHeading>
    </VHeadingLevel>
  </div>
</template>
