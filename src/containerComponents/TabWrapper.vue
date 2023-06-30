<template>
  <ul class="header-tab mt-4">
    <li
      :class="title === tabName ? 'active' : ''"
      v-for="(title, index) in slotHeader"
      :key="index"
      @click="handleClick(title)"
    >
      {{ title }}
    </li>
  </ul>
  <div class="wrapper-tabs">
    <slot />
  </div>
</template>

<script setup>
import { ref, useSlots, provide } from "vue";

const slots = useSlots();
const slotHeader = ref(slots.default().map((title) => title.props.title));
const tabName = ref(slotHeader.value[0]);

const handleClick = (title) => {
  tabName.value = title;
};

provide("tabName", tabName);
</script>

<style scoped>
.wrapper-tabs {
  border: 1px solid #dadada;
  padding: 8px 10px 10px 10px;
  border-top: none;
}
.header-tab {
  padding: 0;
  display: flex;
  background: #e9fff2;
  width: 100%;
  border: 1px solid #dadada;
}
.header-tab li {
  cursor: pointer;
  list-style: none;
  padding: 6px 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #777777;
}

.active {
  color: #1e7d30 !important;
  border-bottom: 3px solid #1e7d30;
}
</style>