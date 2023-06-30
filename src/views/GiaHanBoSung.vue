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
  // const danhSachGiaHanBoSung = computed(function () {
  //   return appStore.thongTinHoSo.BoSungHoSo
  // })
  const danhSachGiaHanBoSung = ref([
    {
      "NgayBoSung": "2023-06-26T17:05:06",
      "NoiDungBoSung": "Yêu cầu bổ sung thêm hợp đồng ký kết với bên nhà thầu",
      "NgayTiepNhan": "2023-06-26T17:05:06",
      "NgayHenTraTruoc": "2023-06-26T17:05:06",
      "NgayHenTraMoi": "2023-06-26T17:05:06",
      "TrangThaiBoSung": null
    },
    {
      "NgayBoSung": "2023-06-26T17:05:06",
      "NoiDungBoSung": "Yêu cầu bổ sung giấy chứng nhận đăng ký kinh doanh",
      "NgayTiepNhan": "2023-06-26T17:05:06",
      "NgayHenTraTruoc": "2023-06-26T17:05:06",
      "NgayHenTraMoi": "2023-06-26T17:05:06",
      "TrangThaiBoSung": true
    },
    {
      "NgayBoSung": "2023-06-26T17:05:06",
      "NoiDungBoSung": "Yêu cầu bổ sung giấy phép xây dựng",
      "NgayTiepNhan": "2023-06-26T17:05:06",
      "NgayHenTraTruoc": "2023-06-26T17:05:06",
      "NgayHenTraMoi": "2023-06-26T17:05:06",
      "TrangThaiBoSung": false
    }
  ])
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  const trangThaiBs = function(status) {
    let st = ''
    switch (status) {
      case null:
        st = 'Chưa bổ sung'
        break;
      case true:
        st = 'Đã bổ sung'
        break;
      default:
        st = 'Đã quá hạn bổ sung'
        break;
    }
    return st
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
    <v-row class="mx-0 my-0" v-if="danhSachGiaHanBoSung && danhSachGiaHanBoSung.length" style="border-left: 1px solid #DADADA; border-top: 1px solid #DADADA">
      <v-row v-for="(item, index) in danhSachGiaHanBoSung" :key="index" class="mx-0 my-0 pr-2 py-1"
        style="width: 100%;border-bottom: 1px solid #DADADA; border-right: 1px solid #DADADA;align-items: center;min-height: 42px">
        <v-col style="max-width: 50px">
          <v-icon size="28" color="#1E7D30" class="mr-1">mdi-receipt-text-plus-outline</v-icon>
        </v-col>
        <v-col class="py-0">
          <div style="width: 100%;">
            <span style="font-weight: 600;">{{dateLocaleTime(item.NgayBoSung) }}: </span><span>{{ item.NoiDungBoSung }}</span>
          </div>
          <div style="width: 100%">
            <span>Trạng thái:</span> <i style="font-weight: 600;">{{ trangThaiBs(item.TrangThaiBoSung) }}</i>
          </div>
          <div class="my-2" style="width: 100%" v-if="item.TrangThaiBoSung == null">
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop=""
              height="28px"
            >
              <v-icon size="18" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 14px">Cập nhật, bổ sung hồ sơ</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-row>
    <div v-else class="pa-2">
      KHÔNG CÓ
    </div>
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
