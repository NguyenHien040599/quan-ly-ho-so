<template>
  <div class="wrap-content">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12">
          <div class="header-directional">
            <span>Trang chủ &nbsp; > &nbsp; </span>
            <span>&nbsp;Thông tin hỗ trợ</span>
            <span>&nbsp; > &nbsp;</span>
            <span>&nbsp;Hỏi đáp tư vấn</span>
          </div>
          <div class="title-result mt-5">
            <p>Kết quả trả lời</p>
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
                chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo
                quy định của pháp luật.
              </p>
            </div>
          </div>

          <div class="wrap-result-item">
            <div class="answed">
              <v-icon>mdi-message-reply-text</v-icon>
            </div>
            <div>
              <p>Vũ Thị Anh - 10:18 15/06/2023 <span>Đã trả lời</span></p>
              <p>Bảo vệ dữ liệu cá nhân là gì?</p>
              <p>
                Bảo vệ dữ liệu cá nhân là hoạt động phòng ngừa, phát hiện, ngăn
                chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo
                quy định của pháp luật.
              </p>
            </div>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.header-directional > span:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;

  color: #1e7d30;
}

.wrap-search-result p {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-transform: uppercase;

  color: #1e7c30;
}

.title-result > p {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-transform: uppercase;

  color: #1e7c30;
}

.wrap-result-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 22px;
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

.answed {
  background: #FFE9E9 !important;
  border: 1px solid #FDD3D3 !important
;
}
.wrap-result-item > div:first-child i {
  color: #1e7c30;
  font-size: 40px;
}
</style>


