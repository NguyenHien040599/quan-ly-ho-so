<script setup>
  import $ from 'jquery'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
  const { mobile } = useDisplay()
  const props = defineProps({
    chiTietHoSo: {
      type: Boolean,
      default: false
    }
  })
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)

  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const loading = ref(false)
  const dialogPreview = ref(false)
  const urlPreview = ref('')
  // const nhatKyHoSo = computed(function () {
  //   return appStore.thongTinHoSo.NhatKyHoSo
  // })
  const headers = reactive([
  {
      "sortable": false,
      "title": "TT",
      "align": "center",
      "key": "index",
      "class": "td-center",
      "width": 50
    },
    {
      "sortable": false,
      "title": "Người xử lý",
      "align": "left",
      "key": "NguoiXuLy",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Chức vụ",
      "align": "left",
      "key": "ChucDanh",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Nội dung",
      "align": "left",
      "key": "NoiDungXuLy",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Ngày bắt đầu - Hạn xử lý",
      "align": "left",
      "key": "ThoiGian",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Thời điểm xử lý",
      "align": "left",
      "key": "ThoiDiemXuLy",
      "class": "td-left"
    }
  ])
  const headersMobile = reactive([
    {
      "sortable": false,
      "title": "TT",
      "align": "center",
      "key": "index",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Thông tin",
      "align": "left",
      "key": "tepDinhKem",
      "class": "td-left"
    }
  ])
  const nhatKyHoSo = ref([
    {
      "NguoiXuLy": "Nguyễn Trưởng Phòng",
      "ChucDanh": "Trưởng phòng",
      "NoiDungXuLy": "Ký duyệt",
      "NgayBatDau": "2023-06-26T17:05:06",
      "NgayKetThucTheoQuyDinh": "2023-06-26T17:05:06",
      "ThoiDiemXuLy": "2023-06-26T17:05:06",
      "TrangThai": null,
      "PhongBanXuLy": "Đang xử lý"
    },
    {
      "NguoiXuLy": "Trần Chuyên Viên",
      "ChucDanh": "Chuyên viên phụ trách",
      "NoiDungXuLy": "Rà soát hồ sơ",
      "NgayBatDau": "2023-06-26T17:05:06",
      "NgayKetThucTheoQuyDinh": "2023-06-26T17:05:06",
      "ThoiDiemXuLy": "2023-06-26T17:05:06",
      "TrangThai": "Đang xử lý",
      "PhongBanXuLy": ""
    },
    {
      "NguoiXuLy": "Trần Tiếp Nhân",
      "ChucDanh": "Cán bộ tiếp nhận",
      "NoiDungXuLy": "Tiếp nhận hồ sơ",
      "NgayBatDau": "2023-06-26T17:05:06",
      "NgayKetThucTheoQuyDinh": "2023-06-26T17:05:06",
      "ThoiDiemXuLy": "2023-06-26T17:05:06",
      "TrangThai": "Đã tiếp nhận",
      "PhongBanXuLy": ""
    },
  ])
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  onMounted(() => {

  })
</script>
<template>
  <v-card class="pa-0 thanhphanhoso" style="box-shadow: none !important;width: 100%;">
    <v-row v-if="!mobile" class="mx-0 my-0">
      <v-data-table
        :headers="headers"
        :items="nhatKyHoSo"
        items-per-page="50"
        item-value="primKey"
        hide-default-footer
        class="table-base table-tphs"
        no-data-text="Không có dữ liệu"
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td class="align-center">{{ index + 1 }}</td>
            <td class="align-left">{{ item.raw.NguoiXuLy }}</td>
            <td class="align-left">
              {{ item.raw.ChucDanh }}
            </td>
            <td class="align-left">
              {{ item.raw.NoiDungXuLy }}
            </td>
            <td class="align-left py-2">
              <div class="mb-1">Ngày bắt đầu: <span>{{ item.raw.NgayBatDau ? dateLocaleTime(item.raw.NgayBatDau) : '' }}</span></div>
              <div>Hạn xử lý: <span>{{ item.raw.NgayKetThucTheoQuyDinh ? dateLocaleTime(item.raw.NgayKetThucTheoQuyDinh) : '' }}</span></div>
            </td>
            <td class="align-left">
              <div><span>{{ item.raw.ThoiDiemXuLy ? dateLocaleTime(item.raw.ThoiDiemXuLy) : '' }}</span></div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
    <v-row v-else class="mx-0 my-0 mt-2">
      <v-data-table
        :headers="headersMobile"
        :items="nhatKyHoSo"
        items-per-page="50"
        item-value="primKey"
        hide-default-footer
        class="table-base table-tphs"
        no-data-text="Không có dữ liệu"
        loading-text="Đang tải... "
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td class="align-center" width="30">{{ index + 1 }}</td>
            <td class="align-left py-1">
              <div class="pt-1" style="font-weight: 600;color: #1E7D30">{{ item.raw.NoiDungXuLy }}</div>
              <div class="pt-1">
                <span>Người xử lý: </span><span style="font-weight: 600">{{ item.raw.NguoiXuLy }}</span>
              </div>
              <div class="pt-1">
                <span>Chức vụ: </span><span style="font-weight: 600">{{ item.raw.ChucDanh }}</span>
              </div>
              <div class="pt-1">
                <span>Ngày bắt đầu: </span><span style="font-weight: 600">{{ item.raw.NgayBatDau ? dateLocaleTime(item.raw.NgayBatDau) : '' }}</span>
              </div>
              <div class="pt-1">
                <span>Hạn xử lý: </span><span style="font-weight: 600">{{ item.raw.NgayKetThucTheoQuyDinh ? dateLocaleTime(item.raw.NgayKetThucTheoQuyDinh) : '' }}</span>
              </div>
              <div class="pt-1">
                <span>Thời điểm xử lý: </span><span style="font-weight: 600">{{ item.raw.ThoiDiemXuLy ? dateLocaleTime(item.raw.ThoiDiemXuLy) : '' }}</span>
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
