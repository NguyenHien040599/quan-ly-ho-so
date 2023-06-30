<template>
  <vue-awesome-paginate
    :total-items="50"
    v-model="currentPage"
    :items-per-page="5"
    :max-pages-shown="2"
    paginate-buttons-class="btn-paginate"
    active-page-class="btn-active-pginate"
    back-button-class="back-btn-paginate"
    next-button-class="next-btn-paginate"
    :on-click="handleClick"
    paginationContainerClass="wrapper-paginate"
  >
    <template #prev-button>
      <span :class="currentPage === 1 ? 'hidden-prev-paginate' : ''">
        <v-icon icon="mdi-chevron-left"></v-icon>
      </span>
    </template>
    <template #next-button>
      <span :class="currentPage === 10 ? 'hidden-prev-paginate' : ''">
        <v-icon icon="mdi-chevron-right"></v-icon
      ></span>
    </template>
  </vue-awesome-paginate>
</template>
  
  
  <script setup>
import { ref } from "vue";

const currentPage = ref(1);

const handleClick = (params) => {
  console.log("click", params);
};
</script>
  
  
  <style>
.btn-paginate {
  height: 32px;
  width: 32px;
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 4px;
  cursor: pointer;
  color: #777777;
  margin: 0 8px;
}
.back-btn-paginate {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: #777777;
}
.next-btn-paginate {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: #777777;
}
.btn-active-pginate {
  background: #ffffff;
  border: 1px solid #1e7d30;
  color: #1e7d30;
}
.hidden-prev-paginate {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #919eab;
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.wrapper-paginate {
  margin-top: 18px;
  display: flex !important;
  justify-content: center;
}
</style>