<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, onMounted, watch, computed, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import jsondata from '../stores/mock-data.json'
  const router = useRouter()
  const { cookies } = useCookies()
  const hosoDvcStore = useHosoDvcStore()
  const appStore = useAppStore()
  const route = useRoute()
  const props = defineProps({
    thutuc: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  })
  const typeAction = ref('create')
  const menuSelected = computed(() => appStore.getMenuSelected)
  const BieuMauDienTu_XLDL = defineAsyncComponent(() =>
    import('./BieuMauDienTu_XLDL.vue')
  )
  const BieuMauDienTu_CHUYENDL = defineAsyncComponent(() =>
    import('./BieuMauDienTu_CHUYENDL.vue')
  )
  const BieuMauDienTu_TBVP = defineAsyncComponent(() =>
    import('./BieuMauDienTu_TBVP.vue')
  )

  const getThongTinHoSo = function (id) {
    let filter = {
      primKey: id
    }
    hosoDvcStore.getChiTietHoSo(filter).then(function(result) {
      if (result.resp) {
        if (typeAction.value !== 'hosothaydoi' && result.resp && result.resp.TrangThaiHoSo['MaMuc'] !== '' && result.resp.TrangThaiHoSo['MaMuc'] !== '05') {
          router.push({ path: '/thong-tin-ho-so/' + result.resp.primKey })
          return
        }
        
        let dataHoSo = Object.assign({}, result.resp)
        if (typeAction.value === 'hosothaydoi') {
          let thuTucTaoMoi = jsondata.thuTucHanhChinh.find(function (item) {
            return item.maThuTuc == menuSelected.value.thuTucThayDoi.maThuTuc
          })
          dataHoSo = Object.assign(dataHoSo, {
            primKey: '',
            MaDinhDanh: '',
            TrangThaiDuLieu: {MaMuc: '01', TenMuc: 'Sơ bộ'},
            TrangThaiHoSo: {MaMuc: '', TenMuc: 'Chưa gửi'},
            DonViXuLy: {"MaDinhDanh": "G01.105", "TenGoi": "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},
            TrichYeuHoSo: 'Thay đổi nội dung ' + result.resp.TrichYeuHoSo,
            ThanhPhanHoSo: thuTucTaoMoi.thongTinHoSo['ThanhPhanHoSo'],
            ThuTucHanhChinh: {
              MaMuc: menuSelected.value.thuTucThayDoi.maThuTuc,
              TenMuc: menuSelected.value.thuTucThayDoi.tenThuTuc
            },
            NhatKiSuaDoi: [],
            uuid: '',
            MaHoSoThayDoi: result.resp.MaDinhDanh,
            NgayNopHoSo: '',
            ThoiGianTao: '',
            ThoiGianCapNhat: ''
          })
        }
        console.log('dataHoSo', dataHoSo)
        appStore.SET_THONGTINHOSO(dataHoSo)
        let tpbm = result.resp.ThanhPhanHoSo.find(function (item) {
          return item.DuLieuDienTu.hasOwnProperty('MaDinhDanh') && item.DuLieuDienTu['MaDinhDanh']
        })
        if (tpbm) {
          getDLDT(tpbm.DuLieuDienTu['MaDinhDanh'], result.resp.MaDinhDanh)
        }
      } else {
        appStore.SET_THONGTINHOSO(null)
      }
      
    }).catch(function(){
    })
  }
  const getDLDT = function (id, maHoSoThayDoi) {
    let filter = {
      maDinhDanh: id
    }
    hosoDvcStore.getChiTietBieuMauDienTu(filter).then(function(result) {
      if (result.resp) {
        if (result.resp['BieuMauDienTu']['MaMuc'] == 'BM_DGTDDLCN') {
          let dataBm = Object.assign({}, result.resp)
          if (typeAction.value == 'hosothaydoi') {
            dataBm = Object.assign(dataBm, {MaHoSoThayDoi: maHoSoThayDoi})
          }
          appStore.SET_DATA_FORM_BIEUMAU_XLDL(dataBm)
          appStore.SET_DATA_FORM_BIEUMAU_CDL(dataBm)
        } else if (result.resp['BieuMauDienTu']['MaMuc'] == 'BM_TBVP') {
          let dataBm = Object.assign({}, result.resp)
          if (typeAction.value == 'hosothaydoi') {
            dataBm = Object.assign(dataBm, {MaHoSoThayDoi: maHoSoThayDoi})
          }
          appStore.SET_DATA_FORM_BIEUMAU_TBVP(dataBm)
        } else {
        }
      }
    }).catch(function(){
    })
  }
  if (props.id && props.id != '0') {
    typeAction.value = 'update'
    getThongTinHoSo(props.id)
  } else {
    if (route.query && route.query.hasOwnProperty('id_update') && route.query.id_update) {
      typeAction.value = 'hosothaydoi'
      getThongTinHoSo(route.query.id_update)
    } else {
      typeAction.value = 'create'
      if (menuSelected.value.thuTuc) {
        console.log('menuSelected', menuSelected)
        let thuTucTaoMoi = jsondata.thuTucHanhChinh.find(function (item) {
          return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
        })
        if (thuTucTaoMoi && thuTucTaoMoi.thongTinHoSo) {
          appStore.$patch((state) => {
            state.thongTinHoSo = Object.assign(thuTucTaoMoi.thongTinHoSo, {
              TrangThaiDuLieu: {MaMuc: '01', TenMuc: 'Sơ bộ'},
              DonViXuLy: {"MaDinhDanh": "G01.105", "TenGoi": "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},
              TrichYeuHoSo: thuTucTaoMoi.tenThuTuc
            })
          })
        }
      }
    }
  }
  watch(route, async (val) => {
    // console.log('run watch-routes BMDT:', val.name)
    if (props.id && props.id != '0') {
      typeAction.value = 'update'
      getThongTinHoSo()
    } else {
      if (route.query && route.query.hasOwnProperty('id_update') && route.query.id_update) {
        typeAction.value = 'hosothaydoi'
        getThongTinHoSo(route.query.id_update)
      } else {
        typeAction.value = 'create'
        if (menuSelected.value) {
          let thuTucTaoMoi = jsondata.thuTucHanhChinh.find(function (item) {
            return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
          })
          if (thuTucTaoMoi && thuTucTaoMoi.thongTinHoSo) {
            appStore.$patch((state) => {
              state.thongTinHoSo = Object.assign(thuTucTaoMoi.thongTinHoSo, {
                TrangThaiDuLieu: {MaMuc: '01', TenMuc: 'Sơ bộ'},
                DonViXuLy: {"MaDinhDanh": "G01.105", "TenGoi": "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},
                TrichYeuHoSo: thuTucTaoMoi.tenThuTuc
              })
            })
          }
        }
      }
    }
  })
  watch(menuSelected, async (val) => {
    console.log('watch menuSelected', val)
    if (props.id && props.id != '0') {
      typeAction.value = 'update'
      getThongTinHoSo()
    } else {
      if (route.query && route.query.hasOwnProperty('id_update') && route.query.id_update) {
        typeAction.value = 'hosothaydoi'
        getThongTinHoSo(route.query.id_update)
      } else {
        typeAction.value = 'create'
        if (menuSelected.value) {
          let thuTucTaoMoi = jsondata.thuTucHanhChinh.find(function (item) {
            return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
          })
          if (thuTucTaoMoi && thuTucTaoMoi.thongTinHoSo) {
            appStore.$patch((state) => {
              state.thongTinHoSo = Object.assign(thuTucTaoMoi.thongTinHoSo, {
                TrangThaiDuLieu: {MaMuc: '01', TenMuc: 'Sơ bộ'},
                DonViXuLy: {"MaDinhDanh": "G01.105", "TenGoi": "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao"},
                TrichYeuHoSo: thuTucTaoMoi.tenThuTuc
              })
            })
          }
        }
      }
    }
  })
  onMounted(() => {
    if (cookies.get('Token')) {
      appStore.SET_ISSIGNED(true)
    } else {
      appStore.SET_ISSIGNED(false)
      appStore.SET_USERINFO('')
      router.push({ path: '/login' })
    }
  })
</script>
<template>
  <BieuMauDienTu_TBVP :action="typeAction" v-if="props.thutuc === 'thong-bao-vi-pham'"></BieuMauDienTu_TBVP>
  <BieuMauDienTu_XLDL :action="typeAction" v-if="props.thutuc === 'xu-ly-du-lieu' || props.thutuc === 'chuyen-du-lieu'"></BieuMauDienTu_XLDL>
  <!-- <BieuMauDienTu_CHUYENDL :action="typeAction" v-if="props.thutuc === 'chuyen-du-lieu'"></BieuMauDienTu_CHUYENDL> -->
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
