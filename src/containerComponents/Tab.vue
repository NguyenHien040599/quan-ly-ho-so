<template>
  <div class="content-tab" v-if="props.title === titleTab">
    <slot />
  </div>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps(["title"]);
const titleTab = inject("tabName");
</script>