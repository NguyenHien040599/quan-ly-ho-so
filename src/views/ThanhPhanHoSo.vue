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
  const loadingData = ref(false)
  const loading = ref(false)
  const dialogPreview = ref(false)
  const urlPreview = ref('')
  const thanhPhanHoSo = computed(function () {
    let tp = appStore.thongTinHoSo.ThanhPhanHoSo.filter(function (item) {
      return !item.MaThanhPhanHoSo || (item.MaThanhPhanHoSo && item.MaThanhPhanHoSo.MaMuc.split('_')[0] !== 'BMDT')
    })
    tp.forEach((element, index) => {
      // if (element.HinhThucGiayTo['MaMuc'] == 'true') {
        tp[index]['itemsGiayTo'] = tp.filter(function (e) {
          let j = e.IDGiayTo.split('-')
          return (j[0] == 'GTK' || j[0] == 'GTBS') && j[1] == element['IDGiayTo']
        })
      // }
    })
    // console.log('tp', tp)
    return tp.filter(function (item) {
      return String(item.IDGiayTo).split('-')[0] !== 'GTK' && String(item.IDGiayTo).split('-')[0] !== 'GTBS'
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
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  onMounted(() => {

  })
</script>
<template>
  <v-card class="pa-0 thanhphanhoso" style="box-shadow: none !important;width: 100%;">
    <v-row class="mx-0 my-0 mt-3 mb-2" v-if="!chiTietHoSo">
      <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
        <div class="sub-header-content">
          <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header">Thành phần hồ sơ</div>
      </v-col>
    </v-row>
    <v-row class="mx-0 my-0" style="border-top: 1px solid #DADADA; border-left: 1px solid #DADADA;">
      <v-row v-for="(item, index) in thanhPhanHoSo" :key="item.IDGiayTo" class="mx-0 my-0 px-2 py-2"
        style="width: 100%;border-bottom: 1px solid #DADADA; border-right: 1px solid #DADADA;align-items: center;min-height: 42px">
        <div style="font-weight: 600;width: 100%">
          <span>{{ index + 1 }}. </span><span>{{ item.TenGiayTo }}</span> <span style="color:red" v-if="item.HinhThucGiayTo['TenMuc'] == 'true'">(*)</span>
        </div>
        <div class="py-1" @click="taiXuongFile(item.TepDuLieu, 'preview')" v-if="item.TepDuLieu.KichThuocTep" style="width: 100%; cursor: pointer;">
          <v-icon size="18" color="green" v-if="item.TepDuLieu.Ext === 'xls' || item.TepDuLieu.Ext === 'xlsx'">mdi-file-excel-outline</v-icon>
          <v-icon size="18" color="blue" v-else-if="item.TepDuLieu.Ext === 'doc' || item.TepDuLieu.Ext === 'docx'">mdi-file-word-outline</v-icon>
          <v-icon size="18" color="red" v-else-if="item.TepDuLieu.Ext === 'pdf'">mdi-file-pdf-box</v-icon>
          <v-icon size="18" color="blue" v-else-if="item.TepDuLieu.Ext === 'png' || item.TepDuLieu.Ext === 'jpg' || item.TepDuLieu.Ext === 'jpeg'">mdi-file-image</v-icon>
          <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
          <a class="ml-2" :style="item.DaHuyBoThayThe ? 'color: grey;text-decoration: underline;cursor: pointer' : 'text-decoration: underline;color: #1E7D30;cursor: pointer'">
            {{item.TepDuLieu.TenTep}}.{{item.TepDuLieu.Ext}}
          </a>
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon variant="flat" size="small" v-bind="props" class="mr-0" @click.stop="taiXuongFile(item.TepDuLieu, 'download')">
                <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
              </v-btn>
            </template>
            <span>Tải xuống</span>
          </v-tooltip>
          <i>{{ item.DaHuyBoThayThe ? '(Đã hủy bỏ/thay thế)' : '' }}</i>
        </div>
        <div v-if="item.HinhThucGiayTo['MaMuc'] == 'true' || (item.hasOwnProperty('itemsGiayTo') && item['itemsGiayTo'])" style="width: 100%">
          <div v-for="(item2, index2) in item['itemsGiayTo']" :key="index2">
            <div style="width: 100%" class="">
              <span v-if="item.HinhThucGiayTo['MaMuc'] == 'true'">- {{ item2.TenGiayTo }}: </span>
              <span class="py-1" @click="taiXuongFile(item2.TepDuLieu, 'preview')" v-if="item2.TepDuLieu.KichThuocTep">
                <v-icon size="18" color="green" v-if="item2.TepDuLieu.Ext === 'xls' || item2.TepDuLieu.Ext === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="item2.TepDuLieu.Ext === 'doc' || item2.TepDuLieu.Ext === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="item2.TepDuLieu.Ext === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="item2.TepDuLieu.Ext === 'png' || item2.TepDuLieu.Ext === 'jpg' || item2.TepDuLieu.Ext === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item2.TepDuLieu.TenTep}}.{{item2.TepDuLieu.Ext}}</a>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-0" @click.stop="taiXuongFile(item2.TepDuLieu, 'download')">
                      <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Tải xuống</span>
                </v-tooltip>
                <i v-if="item2.NgayBoSung">(Ngày bổ sung: {{ dateLocaleTime(item2.NgayBoSung)}})</i>
              </span>
            </div>
          </div>
        </div>
      </v-row>
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
