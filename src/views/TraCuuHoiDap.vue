<template>
  <v-row>
    <v-col cols="12" sm="12">
      <div class="wrap-search-result mb-5">
        <p class="mb-4">Tra cứu kết quả</p>
        <div class="d-flex">
          <v-text-field
            solo
            dense
            hide-details="auto"
            required
            class="input-form"
            placeholder="Tìm kiếm theo từ khóa/tên công dân/tên doanh nghiệp..."
          ></v-text-field>
          <v-btn
            size="small"
            :color="baseColor"
            prepend-icon="mdi-magnify"
            class="mx-0 white--text"
            style="
              float: right;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            "
          >
            Tra cứu
          </v-btn>
        </div>
      </div>
      <div class="title-result">
        <p>Kết quả trả lời</p>
        <p>Hiển thị tất cả 10 kết quả</p>
      </div>
    </v-col>
    <v-col cols="12" sm="12">
      <div class="wrap-result-item">
        <div>
          <v-icon>mdi-message-outline</v-icon>
        </div>
        <div>
          <p>Vũ Thị Anh - 10:18 15/06/2023 <span>Đã trả lời</span></p>
          <p>Bảo vệ dữ liệu cá nhân là gì?</p>
          <p>
            Bảo vệ dữ liệu cá nhân là hoạt động phòng ngừa, phát hiện, ngăn
            chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo quy
            định của pháp luật.
          </p>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR);
</script>

<style>
.wrap-search-result p {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-transform: uppercase;

  color: #1e7c30;
}

.wrap-search-result
  > div
  button.v-btn--size-small:not(.v-btn--variant-outlined):not(
    .v-btn--variant-flat
  ) {
  height: auto !important;
}

.title-result > p:first-child {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  margin-bottom: 10px;
  color: #1e7c30;
}

.title-result > p:last-child {
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: #777777;
}
.wrap-result-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.wrap-result-item > div:last-child {
  margin-left: 40px;
}
.wrap-result-item > div:last-child > p:first-child {
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;

  text-transform: uppercase;

  color: #939393;
}
.wrap-result-item > div:last-child > p {
  margin-bottom: 8px;
}
.wrap-result-item > div:last-child > p span {
  color: #1e7c30;
  font-style: italic;
  font-weight: 600;
  font-size: 11px;
}
.wrap-result-item > div:last-child > p .not-answer {
  color: #ff0000;
}
.wrap-result-item > div:last-child > p:nth-child(2) {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
}
.wrap-result-item > div:last-child > p:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: #777777;
}
.wrap-result-item > div:first-child {
  background: #e9fff2;
  border-radius: 100%;
  width: 81px;
  height: 81px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1e7c30;
}
.wrap-result-item > div:first-child i {
  color: #1e7c30;
  font-size: 40px;
}
</style>