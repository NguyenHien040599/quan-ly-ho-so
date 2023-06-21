<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import jsondata from '../stores/mock-data.json'
  const thongTinBieuMau = computed(function () {
    return appStore.dataFormBieuMauXldl
  })
  const ThanhPhanHoSo = defineAsyncComponent(() =>
    import('./ThanhPhanHoSo.vue')
  )
  const router = useRouter()
  console.log('routes', router.currentRoute.value)
  const appStore = useAppStore()
  const menuSelected = computed(() => appStore.getMenuSelected)
  const loading = ref(false)
  const tab = ref(null)
  const mauHienThi = ref(null)
  let thuTuc = jsondata.thuTucHanhChinh.find(function (item) {
    return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
  })
  if (thuTuc && thuTuc.mauHienThiBieuMau) {
    mauHienThi.value = thuTuc.mauHienThiBieuMau
  }
  
  const dateLocale = function (dateInput) {
		if (!dateInput) return ''
		let date = new Date(dateInput)
		return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
	}
  const currency = function (value) {
    if (value) {
      let moneyCur = (value / 1).toFixed(0).replace('.', ',')
      return moneyCur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    return ''
  }
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  const convertDataView = function (itemHeader, item) {
    let output = ''
    try {
      let calu = itemHeader['calculator'].replace(/dataInput/g, 'item')
      output = eval(calu)
    } catch (error) {
      output = ''
    }
    return output
  }
  const convertDataArray = function (itemHeader, array) {
    let output = ''
    if (array) {
      output = Array.from(array, function (item) {
        return item[itemHeader['mapping']]
      })
    }
    output = output.toString().replace(/,/g, ', ')
    return output
  }
  onMounted(() => {

  })
</script>
<template>
  <v-card class="mx-auto pa-0 thongtinhoso" style="box-shadow: none !important; overflow: inherit;">
    <v-row  class="thongtinchung mx-0 my-0">
      <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 px-0">
        <div class="sub-header-content">
          <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header">{{ mauHienThi['thongTinChuHoSo'].title }}</div>
      </v-col>
      <v-col v-for="(itemChild, indexChild) in mauHienThi['thongTinChuHoSo'].content" v-bind:key="indexChild" :class="itemChild['class']">
        <span class="label-text">{{itemChild.title}}: </span>
        <span class="content-text" v-if="itemChild.type == 'date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? dateLocale(thongTinBieuMau.DoiTuongThucHien[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-if="itemChild.type == 'obj-date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? dateLocale(thongTinBieuMau.DoiTuongThucHien[itemChild.value][itemChild.mapping]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'datetime'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? dateLocaleTime(thongTinBieuMau.DoiTuongThucHien[itemChild.value]) : ''}}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'object'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? thongTinBieuMau.DoiTuongThucHien[itemChild.value][itemChild.mapping] : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'object-2'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? thongTinBieuMau.DoiTuongThucHien[itemChild.value][itemChild.mapping][itemChild.mapping2] : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'money'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? currency(thongTinBieuMau.DoiTuongThucHien[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'array'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? convertDataArray(itemChild, thongTinBieuMau.DoiTuongThucHien[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'calculator'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ convertDataView(itemChild, thongTinBieuMau.DoiTuongThucHien) }}
        </span>
        <span class="content-text" v-else :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ itemChild.value ? thongTinBieuMau.DoiTuongThucHien[itemChild.value] : '' }}
        </span>
      </v-col>
    </v-row>
    <v-row class="thongtinchung mx-0 my-0 mt-2">
      <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 px-0 mt-2">
        <div class="sub-header-content">
          <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header">{{ mauHienThi['nguoiLienHe'].title }}</div>
      </v-col>
      <v-col v-for="(itemChild, indexChild) in mauHienThi['nguoiLienHe'].content" v-bind:key="indexChild" :class="itemChild['class']">
        <span class="label-text">{{itemChild.title}}: </span>
        <span class="content-text" v-if="itemChild.type == 'date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.NguoiLienHe && thongTinBieuMau.NguoiLienHe.hasOwnProperty(itemChild.value) ? dateLocale(thongTinBieuMau.NguoiLienHe[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-if="itemChild.type == 'obj-date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.NguoiLienHe && thongTinBieuMau.NguoiLienHe.hasOwnProperty(itemChild.value) ? dateLocale(thongTinBieuMau.NguoiLienHe[itemChild.value][itemChild.mapping]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'datetime'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.NguoiLienHe && thongTinBieuMau.NguoiLienHe.hasOwnProperty(itemChild.value) ? dateLocaleTime(thongTinBieuMau.NguoiLienHe[itemChild.value]) : ''}}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'object'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.NguoiLienHe.hasOwnProperty(itemChild.value) ? thongTinBieuMau.NguoiLienHe[itemChild.value][itemChild.mapping] : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'object-2'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.NguoiLienHe && thongTinBieuMau.NguoiLienHe.hasOwnProperty(itemChild.value) ? thongTinBieuMau.NguoiLienHe[itemChild.value][itemChild.mapping][itemChild.mapping2] : '' }}
        </span>
        <span class="content-text" v-else :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ itemChild.value && thongTinBieuMau.NguoiLienHe ? thongTinBieuMau.NguoiLienHe[itemChild.value] : '' }}
        </span>
      </v-col>
    </v-row>
    <v-row  class="thongtinchung mx-0 my-0 mt-2">
      <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 px-0 mt-2">
        <div class="sub-header-content">
          <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header">{{ mauHienThi['noiDungDanhGia'].title }}</div>
      </v-col>
      <v-col v-for="(itemChild, indexChild) in mauHienThi['noiDungDanhGia'].content" v-bind:key="indexChild" :class="itemChild['class']">
        <span class="label-text">{{itemChild.title}}: </span>
        <span class="content-text" v-if="itemChild.type == 'date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? dateLocale(thongTinBieuMau[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'obj-date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? dateLocale(thongTinBieuMau[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'datetime'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? dateLocaleTime(thongTinBieuMau[itemChild.value]) : ''}}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'object'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? thongTinBieuMau[itemChild.value][itemChild.mapping] : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'object-2'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? thongTinBieuMau[itemChild.value][itemChild.mapping][itemChild.mapping2] : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'money'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? currency(thongTinBieuMau[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'array'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) ? convertDataArray(itemChild, thongTinBieuMau[itemChild.value]) : '' }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'calculator'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ convertDataView(itemChild, thongTinBieuMau) }}
        </span>
        <span class="content-text" v-else-if="itemChild.type == 'boolean'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.hasOwnProperty(itemChild.value) && thongTinBieuMau[itemChild.value] ? 'Có' : 'Không' }}
        </span>
        <div class="pl-2" v-else-if="itemChild.type == 'danhmuc'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          <div class="my-1" v-for="(item1, index1) in thongTinBieuMau[itemChild.value]" v-bind:key="index1">
            <v-icon size="18" color="#1E7D30" class="mr-2">mdi-check</v-icon>
            <span>{{ item1[itemChild.mapping] }}</span>
          </div>
        </div>
        <span class="content-text" v-else :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ itemChild.value ? thongTinBieuMau[itemChild.value] : '' }}
        </span>
      </v-col>
    </v-row>
    
    <ThanhPhanHoSo></ThanhPhanHoSo>
  </v-card>
</template>

<style scoped>
  .btn-nophoso {
    width: 100%;
    border-radius: 0px;
    height: 34px !important;
  }
  .btn-nophoso .v-btn__content {
    font-weight: 700 !important
  }
  .menu-drawer .text-list {
    color: #1E7D30;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
  .v-list-item__prepend > .v-icon {
    margin-inline-end: 15px !important;
  }
  .item-active {
    background: #E9FFF2;
    border-left: 6px solid #1E7D30;
    padding: 0 8px !important
  }
  .icon-draw {
    color: #1E7D30 !important
  }
  .menu-drawer .list-menu {
    min-height: 36px !important;
  }
  .menu-drawer .label-counter {
    height: 20px; 
    width: 30px; 
    background-color: #1E7D30; 
    color: #ffffff; 
    border-radius: 5px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
  }
  .thongtinchung .label-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
  }
  .thongtinchung .content-text {
    font-family: 'Roboto';
    font-style: normal;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
  }
  .thongtinhoso .v-tabs {
    transition: none !important;
  }
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
