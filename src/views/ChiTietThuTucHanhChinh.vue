<script setup>
import { ref, onMounted, reactive } from "vue";

import AddressBanner from "../containerComponents/AddressBanner.vue";
import TabWrapper from "../containerComponents/TabWrapper.vue";
import Tab from "../containerComponents/Tab.vue";

const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR);
const dataGeneralInform = ref([]);
const itemsPerPage = ref(10);
dataGeneralInform.value = [
  {
    title: "Mã thủ tục",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Tên thủ tục",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Lĩnh vực",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Mức độ",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Cơ quan thực hiện",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Thời hạn giải quyết",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Đối tượng thực hiện",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Cách thức thực hiện ",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Mã thủ tục",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Phí, lệ phí",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Kết quả thực hiện",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
  {
    title: "Căn cứ pháp lý",
    content:
      "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao, Bộ Công an.",
  },
];
const headers = reactive([
  {
    sortable: false,
    title: "Tên giấy tờ",
    align: "center",
    width: '65%',
    key: "1",
  },
  {
    sortable: false,
    title: "Bản chính",
    align: "center",
    key: "2",
  },
  {
    sortable: false,
    title: "Bản sao",
    align: "center",
    key: "3",
  },
  {
    sortable: false,
    title: "Mẫu đơn, tờ khai",
    align: "center",
    key: "4",
  },
]);
onMounted(() => {});
</script>

<template>
  <div class="d-flex mt-4" style="padding-left: 16px">
    Trang chủ > Thủ tục hành chính >
    <p class="text-name">
      Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân
    </p>
  </div>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="9">
        <div class="d-flex justify-space-between align-center">
          <p class="title-text">
            Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân
          </p>
          <v-btn class="ml-4" size="small" :color="baseColor" @click.stop="">
            Nộp hồ sơ
          </v-btn>
        </div>
        <TabWrapper>
          <Tab title="Thông tin chung">
            <div
              class="wrap-general-inform d-flex"
              v-for="(item, index) in dataGeneralInform"
              :key="index"
            >
              <p>{{ item.title }}</p>
              <p>{{ item.content }}</p>
            </div>
          </Tab>
          <Tab title="Trình thực hiện">
            <div class="wrap-implementation">
              <p>Bước 1:</p>
              <p class="my-3">
                Tổ chức, cá nhân gửi thông báo thông tin qua Cổng thông tin quốc
                gia về bảo vệ dữ liệu cá nhân hoặc gửi văn bản đã khai báo thông
                tin về Cục An ninh mạng và phòng, chống tội phạm sử dụng công
                nghệ cao, Bộ Công an.
              </p>
            </div>
            <div class="wrap-implementation">
              <p>Bước 2:</p>
              <p class="my-3">
                Tổ chức, cá nhân gửi thông báo thông tin qua Cổng thông tin quốc
                gia về bảo vệ dữ liệu cá nhân hoặc gửi văn bản đã khai báo thông
                tin về Cục An ninh mạng và phòng, chống tội phạm sử dụng công
                nghệ cao, Bộ Công an.
              </p>
            </div>
          </Tab>
          <Tab title="Thành phần hồ sơ">


            <v-data-table
          :headers="headers"
          :items="[]"
          v-model:items-per-page="itemsPerPage"
          item-value="PrimKey"
          hide-default-footer
          class="table-base"
          no-data="Không có dữ liệu"
          loading-text="Đang tải... "
        >
        </v-data-table>

          </Tab>
          <Tab title="Yêu cầu thực hiện">
            <div class="wrap-request d-flex align-center">
              <p><img src="../assets/images/check-mark.png" alt="img" /></p>
              <p>
                Trong thời gian 60 ngày kể từ ngày chuyển dữ liệu cá nhân ra
                nước ngoài.
              </p>
            </div>
          </Tab>
        </TabWrapper>
      </v-col>
      <v-col cols="12" sm="3">
        <AddressBanner />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-name {
  font-weight: 400;
  font-size: 14px;
  padding: 0;
  text-decoration-line: underline;
  color: #1e7d30;
}
.title-text {
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #1e7d30;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
}

.wrap-general-inform p:first-child {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  border: 1px solid #dadada;
  width: 22%;
  padding: 10px 18px;
}
.wrap-general-inform p:last-child {
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  border: 1px solid #dadada;
  flex: 1;
  padding: 10px;
}

.wrap-implementation p:first-child {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;

  color: #1e7d30;
}
.wrap-implementation p:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.wrap-request p {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-left: 10px;
}
</style>
