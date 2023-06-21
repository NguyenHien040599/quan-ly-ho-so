<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)

  const appStore = useAppStore()
  const loadingData = ref(false)
  const loading = ref(false)
  const thanhPhanHoSo = computed(function () {
    return appStore.thongTinHoSo.ThanhPhanHoSo.filter(function (item) {
      return !item.MaThanhPhanHoSo || (item.MaThanhPhanHoSo && item.MaThanhPhanHoSo.MaMuc.split('_')[0] !== 'BMDT')
    })
  })
  const headers = reactive([
    {
      "sortable": false,
      "title": "Tên giấy tờ",
      "align": "left",
      "key": "tenGiayTo",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Tệp đính kèm",
      "align": "left",
      "key": "tepDinhKem",
      "class": "td-left"
    }
  ])
  const viewFileUpload = function () {

  }
  const downloadFile = function () {

  }
  onMounted(() => {

  })
</script>
<template>
  <v-card class="pa-0 thanhphanhoso" style="box-shadow: none !important;width: 100%;">
    <v-row class="mx-0 my-0 mt-3">
      <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
        <div class="sub-header-content">
          <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header">Thành phần hồ sơ</div>
      </v-col>
    </v-row>
    <v-row class="mx-0 my-0 mt-2">
      <v-data-table
        :headers="headers"
        :items="thanhPhanHoSo"
        items-per-page="20"
        item-value="primKey"
        hide-default-footer
        class="table-base table-tphs"
        no-data="Không có dữ liệu"
        :loading="loadingData"
        loading-text="Đang tải... "
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="align-left">{{ item.raw.TenGiayTo }}</td>
            <td class="align-center" width="350">
              <div class="py-1" @click="viewFileUpload()" v-if="item.raw.TepDuLieu.KichThuocTep">
                <v-icon size="18" color="green" v-if="item.raw.TepDuLieu.DinhDangTep === 'xls' || item.raw.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'doc' || item.raw.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'png' || item.raw.TepDuLieu.DinhDangTep === 'jpg' || item.raw.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.raw.TepDuLieu.TenTep}}</a>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="downloadFile(item.raw.TepDuLieu)">
                      <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Tải xuống</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
  </v-card>
</template>

<style scoped>
  .table-tphs tr td {
    height: 42px !important;
    min-height: 42px
  }
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
