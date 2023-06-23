<script setup>
  import $ from 'jquery'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
  const { mobile } = useDisplay()
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)

  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const loadingData = ref(false)
  const loading = ref(false)
  const dialogPreview = ref(false)
  const urlPreview = ref('')
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
      "title": "Tên giấy tờ",
      "align": "left",
      "key": "tepDinhKem",
      "class": "td-left"
    }
  ])
  const viewFileUpload = function () {

  }
  const taiXuongFile = function (file, action) {
    if (loading.value) {
      return
    }
    loading.value = true
    hosoDvcStore.taiTep(file).then(function(result) {
      console.log('resultFile', result)
      loading.value = false
      if (action == 'preview') {
        urlPreview.value = result
        dialogPreview.value = true
      } else {
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = result
        a.download = file.TenTep
        a.click()
      }
    }).catch(function(error){
      console.log('error-resultFile', error)
      loading.value = false
    })
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
    <v-row v-if="!mobile" class="mx-0 my-0 mt-2">
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
            <td class="align-left" width="350">
              <div class="py-1" @click="taiXuongFile(item.raw.TepDuLieu, 'preview')" v-if="item.raw.TepDuLieu.KichThuocTep">
                <v-icon size="18" color="green" v-if="item.raw.TepDuLieu.DinhDangTep === 'xls' || item.raw.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'doc' || item.raw.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'png' || item.raw.TepDuLieu.DinhDangTep === 'jpg' || item.raw.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.raw.TepDuLieu.TenTep}}.{{item.raw.TepDuLieu.Ext}}</a>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="taiXuongFile(item.raw.TepDuLieu, 'download')">
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
    <v-row v-else class="mx-0 my-0 mt-2">
      <v-data-table
        :headers="headersMobile"
        :items="thanhPhanHoSo"
        items-per-page="20"
        item-value="primKey"
        hide-default-footer
        class="table-base table-tphs"
        no-data="Không có dữ liệu"
        :loading="loadingData"
        loading-text="Đang tải... "
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td class="align-center" width="30">{{ index + 1 }}</td>
            <td class="align-left">
              <div class="pt-1">{{ item.raw.TenGiayTo }}</div>
              <div class="py-1" @click="taiXuongFile(item.raw.TepDuLieu, 'preview')" v-if="item.raw.TepDuLieu.KichThuocTep">
                <v-icon size="18" color="green" v-if="item.raw.TepDuLieu.DinhDangTep === 'xls' || item.raw.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'doc' || item.raw.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'png' || item.raw.TepDuLieu.DinhDangTep === 'jpg' || item.raw.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.raw.TepDuLieu.TenTep}}.{{item.raw.TepDuLieu.Ext}}</a>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="taiXuongFile(item.raw.TepDuLieu, 'download')">
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

    <v-dialog
      max-width="1000"
      v-model="dialogPreview"
      persistent
    >
      <v-card>
        <v-toolbar
          dark
          :color="baseColor" class="px-0"
        >
          <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
            <div class="sub-header-content">
              Tệp tin đính kèm
            </div>
            <div class="triangle-header"></div>
          </v-col>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="flat" size="small" icon color="#E9FFF2" @click="dialogPreview = false" >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="my-0 px-0 py-0">
          <iframe :src="urlPreview" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
          </iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
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
