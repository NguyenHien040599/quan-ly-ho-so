<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import jsondata from '../stores/mock-data.json'
  const { mobile } = useDisplay()
  const hosoDvcStore = useHosoDvcStore()
  const props = defineProps({
    id: {
      type: String,
      default: ''
    }
  })
  const route = useRoute()
  const viewChiTietHoSo = ref(false)
  const thongTinHoSo = computed(function () {
    return appStore.thongTinHoSo
  })
  const thongTinBieuMau = computed(function () {
    return appStore.dataFormBieuMauXldl
  })
  const ThanhPhanHoSo = defineAsyncComponent(() =>
    import('./ThanhPhanHoSo.vue')
  )
  const appStore = useAppStore()
  console.log('route', route.name)
  const menuSelected = computed(() => appStore.getMenuSelected)
  const mauHienThi = ref(null)
  const getThongTinHoSo = function () {
    let filter = {
      primKey: props.id
    }
    hosoDvcStore.getChiTietHoSo(filter).then(function(result) {
      if (result.resp) {
        appStore.SET_THONGTINHOSO(result.resp)
        let tpbm = result.resp.ThanhPhanHoSo.find(function (item) {
          return item.DuLieuDienTu.hasOwnProperty('MaDinhDanh') && item.DuLieuDienTu['MaDinhDanh']
        })
        if (tpbm) {
          getDLDT(tpbm.DuLieuDienTu['MaDinhDanh'])
        } else {
          appStore.SET_DATA_FORM_BIEUMAU_XLDL(appStore.dataFormBieuMauXldlDefault)
        }
      } else {
        appStore.SET_THONGTINHOSO(null)
      }
      
    }).catch(function(){
    })
  }
  const getDLDT = function (id) {
    let filter = {
      maDinhDanh: id
    }
    hosoDvcStore.getChiTietBieuMauDienTu(filter).then(function(result) {
      if (result.resp) {
        appStore.SET_DATA_FORM_BIEUMAU_XLDL(result.resp)
      }
    }).catch(function(){
    })
  }
  if (route.name == 'ThongTinHoSo') {
    viewChiTietHoSo.value = true
    getThongTinHoSo()
  } else {
    let thuTuc = jsondata.thuTucHanhChinh.find(function (item) {
      return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
    })
    if (thuTuc && thuTuc.mauHienThiBieuMau) {
      mauHienThi.value = thuTuc.mauHienThiBieuMau
    }
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
  const convertAddress = function (item) {
    let output = `${item.SoNhaChiTiet}, ${item.XaPhuong.TenMuc} - ${item.HuyenQuan.TenMuc} - ${item.TinhThanh.TenMuc} `
    return output
  }
  watch(thongTinHoSo, async (val) => {
    if (route.name == 'ThongTinHoSo') {
      viewChiTietHoSo.value = true
      let thuTuc = jsondata.thuTucHanhChinh.find(function (item) {
        return item.maThuTuc == thongTinHoSo.value.ThuTucHanhChinh['MaMuc']
      })
      if (thuTuc && thuTuc.mauHienThiBieuMau) {
        mauHienThi.value = thuTuc.mauHienThiBieuMau
      }
      console.log('mauHienThi', mauHienThi.value)
    } else {
      let thuTuc = jsondata.thuTucHanhChinh.find(function (item) {
        return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
      })
      if (thuTuc && thuTuc.mauHienThiBieuMau) {
        mauHienThi.value = thuTuc.mauHienThiBieuMau
      }
    }
  })
  
  onMounted(() => {

  })
</script>
<template>
  <v-card class="mx-auto pa-0 thongtinhoso" style="box-shadow: none !important; overflow: inherit;" v-if="mauHienThi"
    :style="viewChiTietHoSo? 'border: 1px solid #dadada' : ''"
  >
    <v-row v-if="viewChiTietHoSo" class="mt-0 mx-0" style="margin-bottom: 20px;">
      <v-col class="row-header d-flex align-center justify-start py-0 px-0" style="border: none">
        <div class="header-content" style="text-transform: uppercase;">
          Thông tin hồ sơ
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header pl-2" style="text-transform: uppercase;" v-if="!mobile">{{ menuSelected.dossierName }}</div>
      </v-col>
    </v-row>
    <div :class="viewChiTietHoSo ? 'px-3 pb-3' : ''">
      <div class="text-sub-header mx-0 mb-2" style="text-transform: uppercase;" v-if="mobile">{{ menuSelected.dossierName }}</div>
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
        <span class="content-text" v-else-if="itemChild.type == 'fulladdress'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
          {{ thongTinBieuMau.DoiTuongThucHien.hasOwnProperty(itemChild.value) ? convertAddress(thongTinBieuMau.DoiTuongThucHien[itemChild.value]) : '' }}
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
    </div> 
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
