<script setup>
import { ref, onMounted, reactive, defineAsyncComponent } from "vue";
import AddressBanner from "../containerComponents/AddressBanner.vue";
import { storeToRefs } from "pinia";
import { thuTucHanhChinhStore } from "../stores/thuTucHanhChinh";

const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR);
const Pagination = defineAsyncComponent(() => import("./Pagination.vue"));
const page = ref(1);
const pageCount = ref(3);
const total = ref(10);
const itemsPerPage = ref(10);
const data = ref([
  { stt: 1, nameTT: "Tên thủ tục 1", PrimKey: 1 },
  { stt: 1, nameTT: "Tên thủ tục 2", PrimKey: 2 },
]);
const headers = reactive([
  {
    sortable: false,
    title: "STT",
    align: "center",
    key: "stt",
  },
  {
    sortable: false,
    title: "Tên thủ tục",
    align: "center",
    key: "nameTT",
  },
  {
    sortable: false,
    title: "Thao tác",
    align: "center",
    key: "thaotac",
  },
]);
const { getItemsApi } = thuTucHanhChinhStore();
getItemsApi({
  type: "publicadministrativemgt/internal/thutuchanhchinh/1.0/filter",
});

const changePage = function (page) {
  console.log("page_pagination", page.value);
};

onMounted(() => {});
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="9">
        <v-data-table
          :headers="headers"
          :items="data"
          v-model:items-per-page="itemsPerPage"
          item-value="PrimKey"
          hide-default-footer
          class="table-base"
          no-data="Không có dữ liệu"
          loading-text="Đang tải... "
        >
          <template v-slot:item="{ item, index }">
            <tr>
              <td class="align-center" width="70">{{ index + 1 }}</td>
              <td class="align-left">{{ item.columns.nameTT }}</td>
              <td class="align-center" width="150">
                <div>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        size="small"
                        v-bind="props"
                        class="mr-2"
                        @click.stop="showDialog('update', item.columns)"
                      >
                        <v-icon size="22" :color="baseColor">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Sửa</span>
                  </v-tooltip>

                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        variant="flat"
                        size="small"
                        v-bind="props"
                        @click.stop="showConfirm"
                      >
                        <v-icon size="22" color="error">mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
        <Pagination
          :pageInput="page"
          :pageCount="pageCount"
          :total="total"
          @changePage="changePage"
          style="margin-bottom: 50px"
        />
      </v-col>
      <v-col cols="12" sm="3">
        <AddressBanner />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
