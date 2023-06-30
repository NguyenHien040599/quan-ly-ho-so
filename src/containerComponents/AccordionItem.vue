<template>
  <div class="wrap-item" @click="handleClick">
    <div
      :class="
        isActive ? 'wrap-item__header spacing-bottom' : 'wrap-item__header'
      "
    >
      <div>
        <p class="mb-2">Câu hỏi {{ props.index + 1 }}:</p>
        <p>{{ props.data.title }}</p>
      </div>
      <span :class="isActive ? 'down-icon' : ''"
        ><v-icon icon="mdi-chevron-up"></v-icon
      ></span>
    </div>

    <div
      :class="isActive ? 'wrap-item__content display' : 'wrap-item__content'"
    >
      <p class="my-2">Trả lời:</p>
      <p>
        {{ props.data.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["data", "index"]);
const isActive = ref(false);

const handleClick = () => {
  isActive.value = !isActive.value;
};
</script>

<style scoped>
.wrap-item__header {
  cursor: pointer;
  margin: 10px 0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrap-item__header > span {
  transform: rotateZ(0);
  transition: all 0.3s linear;
}

.wrap-item__header > div {
  padding: 0 12px;
  margin-top: 10px;
}

.wrap-item__header > div > p:first-child,
.wrap-item__content > p:first-child {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;

  color: #1e7d30;
}

.wrap-item__header > div > p:last-child,
.wrap-item__content > p:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
}

.wrap-item__header > span {
  font-size: 18px;
  color: #939393;
  margin-right: 12px;
}

.spacing-bottom {
  border-end-end-radius: 0 !important ;
  border-end-start-radius: 0 !important ;
  padding-bottom: 8px;
  margin-bottom: 0;
  border-bottom: 1px solid #dadada;
}

.wrap-item__content {
  background: #fff;
  max-height: 0;
  transform: translateY(-100%);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  padding: 0 12px;
  visibility: visible;
  transition: all 0.3s linear;
}

.display {
  opacity: 1;
  padding: 10px 12px;
  max-height: 100vh;
  transform: translateY(0);
  border-start-end-radius: 0 !important ;
  border-start-start-radius: 0 !important ;
}

.down-icon {
  transform: rotateZ(180deg) !important;
  transition: all 0.3s linear;
}
</style>