<template>
  <div>
    <v-form>
      <div class="warp-content-form-main">
        <div
          class="row-header d-flex align-center justify-start py-0 px-0 mt-4 mb-6"
          style="border: none"
        >
          <div class="header-content">Thông tin cơ bản</div>
          <div class="triangle-header"></div>
        </div>
        <slot name="content-form"></slot>
      </div>

      <div>
        <div
          class="row-header d-flex align-center justify-start py-0 px-0 mt-4 mb-6"
          style="border: none"
        >
          <div class="header-content">Thông tin khác</div>
          <div class="triangle-header"></div>
        </div>
        <slot name="content-form-extra"></slot>
      </div>

      <div class="form-footer mt-5 mb-16">
        <v-btn
          size="small"
          :color="baseColor"
          prepend-icon="mdi-content-save"
          class="me-5"
          @click="handleSubmit"
        >
          Lưu
        </v-btn>
        <v-btn size="small" :color="baseColor" @click="handleGoBack">
          Quay lại
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR);
const emit = defineEmits(["emit-submit"]);
const router = useRouter();

const handleSubmit = () => {
  emit("emit-submit");
};
const handleGoBack = () => {
  router.push({ name: "Home" });
};
</script>

<style>
.warp-content-form-main .v-input--disabled {
  background: #dadada !important;
  border: 1px solid #dadada;
}
.warp-content-form-main .header-content::before {
  bottom: -48% !important;
}
</style>