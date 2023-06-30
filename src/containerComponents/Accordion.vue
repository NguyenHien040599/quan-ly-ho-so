<template>
  <AccordionItem
    v-for="(item, index) in data"
    :data="item"
    :key="index"
    :index="index"
  />
</template>

<script setup>
import { ref } from "vue";
import AccordionItem from "./AccordionItem.vue";
const data = ref([
  {
    title: "Bảo vệ dữ liệu cá nhân là gì?",
    content:
      "Bảo vệ dữ liệu cá nhân là hoạt động phòng ngừa, phát hiện, ngăn chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo quy định của pháp luật.",
  },
  {
    title:
      " Loại dữ liệu cá nhân cơ bản nào được coi là thông tin được bảo vệ? ",
    content: `
      Theo nghị đinh 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân quy định dữ liệu cá nhân cơ bản gồm
 - Họ, chữ đệm và tên khai sinh, tên gọi khác (nếu có)
- Ngày, tháng, năm sinh; ngày, tháng, năm chết hoặc mất tích
-  Giới tính
-  Nơi sinh, nơi đăng ký khai sinh, nơi thường trú, nơi tạm trú, nơi ở hiện tại, quê quán, địa chỉ liên hệ
-  Quốc tịch
- Hình ảnh của cá nhân
- Số điện thoại, số chứng minh nhân dân, số định danh cá nhân, số hộ chiếu, số giấy phép lái xe, số biển số xe, số mã số thuế cá nhân, số bảo hiểm xã hội, số thẻ bảo hiểm y tế
- Tình trạng hôn nhân
- Thông tin về mối quan hệ gia đình (cha mẹ, con cái)
- Thông tin về tài khoản số của cá nhân; dữ liệu cá nhân phản ánh hoạt động, lịch sử hoạt động trên không gian mạng
- Các thông tin khác gắn liền với một con người cụ thể hoặc giúp xác định một con người
      `,
  },
]);
</script>

<style scoped>
</style>