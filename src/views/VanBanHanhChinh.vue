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
  const vanBanHanhChinh = computed(function () {
    return appStore.thongTinHoSo.GiayToHanhChinh
  })
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
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
    <v-row class="mx-0 my-0" v-if="vanBanHanhChinh && vanBanHanhChinh.length" style="border-left: 1px solid #DADADA; border-top: 1px solid #DADADA">
      <v-row v-for="(item, index) in vanBanHanhChinh" :key="index" class="mx-0 my-0 px-0 py-1"
        style="width: 100%;border-bottom: 1px solid #DADADA; border-right: 1px solid #DADADA;align-items: center;min-height: 42px">
        <v-col style="max-width: 50px">
          <v-icon size="30" color="#1E7D30" class="mr-1">mdi-file-document-outline</v-icon>
        </v-col>
        <v-col class="py-0">
          <div style="width: 100%;color: #1E7D30">
            <span>{{ item.TenTep }}</span>
            <i> ({{ item.NgayTao ? dateLocaleTime(item.NgayTao) : '' }})</i>
          </div>
          <div class="py-0" @click="taiXuongFile(item, 'preview')" style="width: 100%; cursor: pointer;">
            <v-icon size="18" color="green" v-if="item.Ext === 'xls' || item.Ext === 'xlsx'">mdi-file-excel-outline</v-icon>
            <v-icon size="18" color="blue" v-else-if="item.Ext === 'doc' || item.Ext === 'docx'">mdi-file-word-outline</v-icon>
            <v-icon size="18" color="red" v-else-if="item.Ext === 'pdf'">mdi-file-pdf-box</v-icon>
            <v-icon size="18" color="blue" v-else-if="item.Ext === 'png' || item.Ext === 'jpg' || item.Ext === 'jpeg'">mdi-file-image</v-icon>
            <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
            <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.TenTep}}.{{item.Ext}}</a>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-btn icon variant="flat" size="small" v-bind="props" class="mr-0" @click.stop="taiXuongFile(item, 'download')">
                  <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                </v-btn>
              </template>
              <span>Tải xuống</span>
            </v-tooltip>
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
