<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'

  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import toastr from 'toastr'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const dataFormBieuMau = computed(() => appStore.dataFormBieuMauXldl)
  const thongTinHoSo = computed(function () {
    return appStore.thongTinHoSo
  })
  const menuSelected = computed(() => appStore.getMenuSelected)
  const hoSoThayDoiNoiDung = ref(false)
  const dossierName = ref('Đánh giá tác động xử lý dữ liệu cá nhân')
  const tabSelected = ref(null)
  if (router.currentRoute.value.query && router.currentRoute.value.query.hasOwnProperty('id_update')) {
    console.log('router', router)
    hoSoThayDoiNoiDung.value = true
    dossierName.value = 'Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu cá nhân'
    tabSelected.value = 'thongtinthaydoi'
  } else {
    hoSoThayDoiNoiDung.value = false
    dossierName.value = 'Đánh giá tác động xử lý dữ liệu cá nhân'
    tabSelected.value = 'nhapdon'
  }
  const ThongTinChuHoSo = defineAsyncComponent(() =>
    import('./ThongTinChuHoSo.vue')
  )
  const thongtinchuhoso = ref(null)
  const TableSelect = defineAsyncComponent(() =>
    import('./TableSelect.vue')
  )
  const TepTinDinhKem = defineAsyncComponent(() =>
    import('./TepTinDinhKem.vue')
  )
  const ThongTinBieuMau = defineAsyncComponent(() =>
    import('./ThongTinBieuMau.vue')
  )
  const formTomTatNoiDung = ref(null)
  const formNoiDungThayDoi = ref(null)
  const props = defineProps({
    dataInput: {
      type: Object,
      default: {}
    }
  })
  const loainguycoruiroRef = ref(null)
  const loaibienphapbvdlcnRef = ref(null)
  const loaidlcnnhaycamRef = ref(null)
  const loaidlcncobanRef = ref(null)
  const dsLoaiDoiTuongBVDLCN = ref([])
  
  const dsDieuKienXuLyDLCN = ref([])
  const camKet = ref(false)

  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)
  
  // 
  const getData = function () {
    let filter = {
      maDanhMuc: 'LoaiBenDGTD'
    }
    hosoDvcStore.getDanhMuc(filter).then(function(result) {
      dsLoaiDoiTuongBVDLCN.value = result.content
    }).catch(function(){
      dsLoaiDoiTuongBVDLCN.value = [
        {'TenMuc': 'Bên kiểm soát dữ liệu cá nhân', 'MaMuc': 'ks'},
        {'TenMuc': 'Bên xử lý dữ liệu cá nhân', 'MaMuc': 'xl'},
        {'TenMuc': 'Bên kiểm soát và xử lý dữ liệu cá nhân', 'MaMuc': 'ksxl'},
        {'TenMuc': 'Bên thứ ba', 'MaMuc': 'khac'}
      ]
    })
  }
  getData()
  const changeDatePicker = (key, data) => {
    appStore.$patch((state) => {
      state.dataFormBieuMauXldl[key] = dateIsoLocal(data)
    })
  }
  const nextTab = async function (tabSelect) {
    if (tabSelect == 'nhapdon') {
      const { valid } = await formNoiDungThayDoi.value.validate()
      console.log('formNoiDungThayDoi', valid)
      if (!valid) {
        document.getElementById("top-menu").scrollIntoView()
        return
      }
    }
    if (tabSelect == 'noidung') {
        let doiTuongThucHien = thongtinchuhoso.value.doiTuongThucHien
        let nguoiLienHe = thongtinchuhoso.value.nguoiLienHe
        let validThongTinCaNhan = await thongtinchuhoso.value.validateForm()
        if (validThongTinCaNhan && doiTuongThucHien.GiayChungNhan.NgayCap) {
          console.log('doiTuongThucHienCaNhan', doiTuongThucHien)
          appStore.$patch((state) => {
            state.thongTinHoSo['ChuHoSo'] = doiTuongThucHien
          })
          appStore.$patch((state) => {
            state.dataFormBieuMauXldl['DoiTuongThucHien'] = doiTuongThucHien
          })
          appStore.$patch((state) => {
            state.dataFormBieuMauXldl['NguoiLienHe'] = nguoiLienHe
          })
        } else {
          if (validThongTinCaNhan && !doiTuongThucHien.GiayChungNhan.NgayCap) {
            toastr.error('Vui lòng nhập "Ngày cấp"')
          }
          return
        }
    }
    if (tabSelect == 'dinhkem') {
      console.log('LoaiBenDGTD', dataFormBieuMau.value['LoaiBenDGTD'])
      if (!dataFormBieuMau.value['LoaiBenDGTD']) {
        toastr.error('Vui lòng chọn "Đối tượng bảo vệ DLCN"')
        document.getElementById("top-menu").scrollIntoView()
        return
      }
      const { valid } = await formTomTatNoiDung.value.validate()
      console.log('validFormTomTat', valid)
      if (!valid) {
        document.getElementById("top-menu").scrollIntoView()
        return
      }
      console.log('loaidlcncobanRef', loaidlcncobanRef.value.danhSachDanhMuc)
      console.log('loaidlcnnhaycamRef', loaidlcnnhaycamRef.value.danhSachDanhMuc)
      console.log('loaibienphapbvdlcnRef', loaibienphapbvdlcnRef.value.danhSachDanhMuc)
      console.log('loainguycoruiroRef', loainguycoruiroRef.value.danhSachDanhMuc)
      let exitsDlcb = loaidlcncobanRef.value.danhSachDanhMuc.filter(function (item) {
        return item['Selected']
      })
      if (!exitsDlcb.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Phạm vi xử lý các loại dữ liệu cá nhân cơ bản"')
        return
      }
      let exitsDlnc = loaidlcnnhaycamRef.value.danhSachDanhMuc.filter(function (item) {
        return item['Selected']
      })
      if (!exitsDlnc.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Phạm vi xử lý các loại dữ liệu cá nhân nhạy cảm"')
        return
      }
      let exitsBpbv = loaibienphapbvdlcnRef.value.danhSachDanhMuc.filter(function (item) {
        return item['Selected']
      })
      if (!exitsBpbv.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Biện pháp bảo vệ dữ liệu cá nhân được áp dụng"')
        return
      }
      let exitsNguyCo = loainguycoruiroRef.value.danhSachDanhMuc.filter(function (item) {
        return item['Selected']
      })
      if (!exitsNguyCo.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Loại đánh giá tác động đã thực hiện"')
        return
      }
      if (!dataFormBieuMau.value['ThoiGianXuLy']) {
        toastr.error('Vui lòng chọn "Thời gian xử lý"')
        return
      }
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiDLCNCoBan'] = exitsDlcb
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiDLCNNhayCam'] = exitsDlnc
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiBienPhapBVDLCN'] = exitsBpbv
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiDanhGiaTacDong'] = exitsNguyCo
      })
      
    }
    tabSelected.value = tabSelect
    document.getElementById("top-menu").scrollIntoView()
  }
  const prevTab = function (currentTab) {
    tabSelected.value = currentTab
    document.getElementById("top-menu").scrollIntoView()
  }
  const submitNopHoSo = function () {
    if (!camKet.value) {
      toastr.error('Vui lòng xác nhận cam kết')
      return
    }
    console.log('dataFormBieuMau', dataFormBieuMau.value)
    console.log('thongTinHoSo', thongTinHoSo.value)
    let dataBm = Object.assign(dataFormBieuMau.value, {"BieuMauDienTu": {"MaMuc": "BM_DGTD_XLDLCN", "TenMuc": "Biểu mẫu DGTD_XLDLCN"}})
    let filter = {
      data: dataBm
    }
    hosoDvcStore.themMoiDLDT(filter).then(function(result) {
      let dataDldt = result.resp
      appStore.thongTinHoSo.ThanhPhanHoSo.forEach((element, index) => {
        if (element.MaThanhPhanHoSo && element.MaThanhPhanHoSo.MaMuc.split('_')[0] !== 'BMDT') {
          appStore.$patch((state) => {
            state.thongTinHoSo['ThanhPhanHoSo'][index]['DuLieuDienTu'] = dataDldt['MaDinhDanh']
          })
        }
      })
      console.log('thongTinHoSo', thongTinHoSo.value)
      let filterHs = {
        data: thongTinHoSo.value
      }
      hosoDvcStore.capNhatHoSo(filterHs).then(function(result) {
        let dataDldt = result.resp
        toastr.success('Gửi hồ sơ thành công')
        router.push({ path: menuSelected.value.to })
      }).catch(function(){
        toastr.error('Cập nhật hồ sơ thất bại')
      })
    }).catch(function(){
      toastr.error('Thêm mới dữ liệu thất bại')
    })
  }
  // 
  const dateIsoLocal = function (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  const dateLocale = function (dateInput) {
		if (!dateInput) return ''
		let date = new Date(dateInput)
		return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
	}
  const formatDatePicker = (date) => {
    try {
      if (date.getDate()) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      } else {
        
      }
    } catch (error) {
    }
  }
  const textInputOptions = ref({
    format: 'dd/MM/yyyy'
  })
	const formatBirthDate = function (name) {
		let lengthDate = String(data.value[name]).trim().length
		let splitDate = String(data.value[name]).split('/')
		let splitDate2 = String(data.value[name]).split('-')
		if (lengthDate && lengthDate > 4 && splitDate.length === 3 && splitDate[2]) {
			data.value[name] = translateDate(data.value[name])
		} else if (lengthDate && lengthDate === 8) {
			let date = String(data.value[name])
			data.value[name] = date.slice(0,2) + '/' + date.slice(2,4) + '/' + date.slice(4,8)
		} else if (splitDate2[1]) {
			data.value[name] = dateLocale(data.value[name])
		} else {
			// data[name] = ''
		}
	}
	const translateDate = function (date) {
		if (!date) return null
		const [day, month, year] = date.split('/')
		return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
	}
	const convertDate = function (date) {
		if (!date) return ''
		const [day, month, year] = date.split('/')
		let ddd = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		return (new Date(ddd)).getTime()
	}
  
  // 
  watch(route, async (val) => {
    getData()
    if (val.query && val.query.hasOwnProperty('id_update')) {
      hoSoThayDoiNoiDung.value = true
      dossierName.value = 'Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu cá nhân'
      tabSelected.value = 'thongtinthaydoi'
    } else {
      hoSoThayDoiNoiDung.value = false
      dossierName.value = 'Đánh giá tác động xử lý dữ liệu cá nhân'
      tabSelected.value = 'nhapdon'
    }
  })
  onMounted(() => {

  })
</script>
<template>
  <!-- file-document-edit-outline; list-status; paperclip-plus; file-document-check-outline -->
  <v-card class="mx-auto pa-0 bieumau" style="box-shadow: none !important; overflow: inherit;">
    <v-row class="my-0 mb-5 mx-0">
      <v-col class="row-header d-flex align-center justify-start py-0 px-0" style="border: none">
        <div class="header-content" style="text-transform: uppercase;">
          Thêm mới hồ sơ
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header pl-2" style="text-transform: uppercase;">{{ dossierName }}</div>
      </v-col>
    </v-row>

    <v-tabs
      v-if="!hoSoThayDoiNoiDung"
      v-model="tabSelected"
      bg-color="#00000000"
      :hide-slider="true"
    >
      <v-tab :hide-slider="true"  value="nhapdon" id="top-menu">
        <span style="font-size: 18px;">1.</span> Chủ hồ sơ
      </v-tab>
      <v-tab :hide-slider="true"  value="noidung"><span style="font-size: 18px;">2.</span> Nội dung hồ sơ</v-tab>
      <v-tab :hide-slider="true"  value="dinhkem"><span style="font-size: 18px;">3.</span> Thành phần hồ sơ</v-tab>
      <v-tab :hide-slider="true"  value="xemlai"><span style="font-size: 18px;">4.</span> Gửi hồ sơ</v-tab>
    </v-tabs>

    <v-tabs
      v-else
      v-model="tabSelected"
      bg-color="#00000000"
      :hide-slider="true"
    >
      <v-tab :hide-slider="true"  value="thongtinthaydoi" id="top-menu">
        <span style="font-size: 18px;">1.</span> Thông tin thay đổi
      </v-tab>
      <v-tab :hide-slider="true"  value="nhapdon" id="top-menu">
        <span style="font-size: 18px;">2.</span> Chủ hồ sơ
      </v-tab>
      <v-tab :hide-slider="true"  value="noidung"><span style="font-size: 18px;">3.</span> Nội dung hồ sơ</v-tab>
      <v-tab :hide-slider="true"  value="dinhkem"><span style="font-size: 18px;">4.</span> Thành phần hồ sơ</v-tab>
      <v-tab :hide-slider="true"  value="xemlai"><span style="font-size: 18px;">5.</span> Gửi hồ sơ</v-tab>
    </v-tabs>

    <v-card-text class="px-0 py-0">
      <v-window v-model="tabSelected" >
        <v-window-item :transition="false" value="thongtinthaydoi" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;padding-left: 5px;">
          <v-form ref="formNoiDungThayDoi" lazy-validation class="py-0">
            <v-row class="mx-0 my-0">
              <v-col cols="12" class="py-0 mb-10">
                <div class="text-label">Mã hồ sơ thay đổi <span style="color: red">(*)</span></div>
                <v-text-field
                  class="flex input-form"
                  v-model="dataFormBieuMau.MaHoSoThayDoi"
                  solo
                  dense
                  hide-details="auto"
                  required
                  :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0 mb-10">
                <div class="text-label">Nội dung thay đổi <span style="color: red">(*)</span></div>
                <v-textarea
                  rows="3"
                  class="flex input-form"
                  v-model="dataFormBieuMau.NoiDungThayDoi"
                  solo
                  dense
                  hide-details="auto"
                  required
                  :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="py-0 mb-10">
                <div class="text-label">Lý do thay đổi <span style="color: red">(*)</span></div>
                <v-textarea
                  rows="3"
                  class="flex input-form"
                  v-model="dataFormBieuMau.LyDoThayDoi"
                  solo
                  dense
                  hide-details="auto"
                  required
                  :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="mx-0 my-2" justify="center">
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="nextTab('nhapdon')"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Tiếp tục</span>
            </v-btn>
          </v-row>
        </v-window-item>

        <v-window-item :transition="false" value="nhapdon" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;padding-left: 5px;">
          <v-row class="mx-0 my-0">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">THÔNG TIN CÁ NHÂN, TỔ CHỨC THỰC HIỆN ĐÁNH GIÁ TÁC ĐỘNG XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <ThongTinChuHoSo ref="thongtinchuhoso"></ThongTinChuHoSo>
          </v-row>
          <v-row class="mx-0 my-2" justify="center">
            <v-btn
              v-if="hoSoThayDoiNoiDung"
              class="mr-3"
              size="small"
              variant="outlined"
              color="#1E7D30"
              @click.stop="prevTab('thongtinthaydoi')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="nextTab('noidung')"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Tiếp tục</span>
            </v-btn>
          </v-row>
        </v-window-item>

        <v-window-item :transition="false" value="noidung" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;padding-left: 5px;">
          <v-form ref="formTomTatNoiDung" lazy-validation class="py-0">
          <v-row class="mx-0 my-0">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">TÓM TẮT NỘI DUNG ĐÁNH GIÁ TÁC ĐỘNG XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="text-label">Đối tượng bảo vệ DLCN <span style="color: red">(*)</span></div>
              <v-radio-group v-model="dataFormBieuMau['LoaiBenDGTD']">
                <v-radio v-for="(item, index) in dsLoaiDoiTuongBVDLCN" :key="index" 
                :label="item['TenMuc']" :value="item" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Mô tả mục đích, hoạt động xử lý dữ liệu cá nhân <span style="color: red">(*)</span></div>
              <v-textarea
                class="flex input-form"
                rows="3"
                v-model="dataFormBieuMau['MucDichXLDLCN']"
                solo
                dense
                hide-details="auto"
                clearable
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Hoạt động xử lý dữ liệu cá nhân <span style="color: red">(*)</span></div>
              <v-textarea
                class="flex input-form"
                rows="3"
                v-model="dataFormBieuMau['HoatDongXLDLCN']"
                solo
                dense
                hide-details="auto"
                clearable
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Phạm vi xử lý các loại dữ liệu cá nhân cơ bản <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect ref="loaidlcncobanRef" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại dữ liệu cá nhân cơ bản',key: 'TenMuc' }]" 
              :maDanhMuc="'loaidlcncoban'" :selected="dataFormBieuMau['LoaiDLCNCoBan']"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Phạm vi xử lý các loại dữ liệu cá nhân nhạy cảm <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect ref="loaidlcnnhaycamRef" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại dữ liệu cá nhân nhạy cảm',key: 'TenMuc' }]" 
              :maDanhMuc="'loaidlcnnhaycam'" :selected="dataFormBieuMau['LoaiDLCNNhayCam']"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Có sự đồng ý của chủ thể dữ liệu không?</div>
              <v-radio-group inline v-model="dataFormBieuMau['DongYChuTheDLCN']" hide-details>
                <v-radio label="Có" :value="true" color="#1E7D30" class="mr-3"></v-radio>
                <v-radio label="Không" :value="false" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Có liên quan chuyển dữ liệu cá nhân ra nước ngoài không?</div>
              <v-radio-group inline v-model="dataFormBieuMau['ChuyenDLCNRaNuocNgoai']" hide-details>
                <v-radio label="Có" :value="true" color="#1E7D30" class="mr-3"></v-radio>
                <v-radio label="Không" :value="false" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian xử lý <span style="color: red">(*)</span></div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataFormBieuMau['ThoiGianXuLy']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" @update:model-value="changeDatePicker('ThoiGianXuLy', dataFormBieuMau['ThoiGianXuLy'])"
                >
                </VueDatePicker>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian xóa/hủy dữ liệu (nếu có)</div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataFormBieuMau['ThoiGianHuyXoa']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" @update:model-value="changeDatePicker('ThoiGianHuyXoa', dataFormBieuMau['ThoiGianHuyXoa'])"
                >
                </VueDatePicker>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Biện pháp bảo vệ dữ liệu cá nhân được áp dụng <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect ref="loaibienphapbvdlcnRef" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại biện pháp áp dụng',key: 'TenMuc' }]" 
              :maDanhMuc="'loaibienphapbvdlcn'" :selected="dataFormBieuMau['LoaiBienPhapBVDLCN']"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Các loại đánh giá tác động đã thực hiện <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect ref="loainguycoruiroRef" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại đánh giá tác động',key: 'TenMuc' }]" 
              :maDanhMuc="'loainguycoruiro'" :selected="dataFormBieuMau['LoaiDanhGiaTacDong']"></TableSelect>
            </v-col>

            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Có lấy ý kiến đánh giá tác động không?</div>
              <v-radio-group inline v-model="dataFormBieuMau['LayYKienDanhGia']" hide-details>
                <v-radio label="Có" :value="true" color="#1E7D30" class="mr-3"></v-radio>
                <v-radio label="Không" :value="false" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            
          </v-row>
          </v-form>
          <v-row class="mx-0 my-2" justify="center">
            <v-btn
              class="mr-3"
              size="small"
              variant="outlined"
              color="#1E7D30"
              @click.stop="prevTab('nhapdon')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="nextTab('dinhkem')"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Tiếp tục</span>
            </v-btn>
          </v-row>
        </v-window-item>

        <v-window-item :transition="false" value="dinhkem" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;padding-left: 5px;">
          <TepTinDinhKem></TepTinDinhKem>
          <v-row class="mx-0 mb-3 mt-5" justify="center">
            <v-btn
              class="mr-3"
              size="small"
              variant="outlined"
              color="#1E7D30"
              @click.stop="prevTab('noidung')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="nextTab('xemlai')"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Tiếp tục</span>
            </v-btn>
          </v-row>
        </v-window-item>
        <v-window-item :transition="false" value="xemlai" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;margin-top: -5px">
          <ThongTinBieuMau></ThongTinBieuMau>
          <v-row class="mx-0 my-2 mt-5" justify="center">
            <v-col cols="12" class="py-0 mb-10 px-0">
              <div class="text-label mb-0" style="font-weight: 600">CAM KẾT:<span style="color: red">(*)</span></div>
              <v-checkbox
                class="check-cam-ket"
                v-model="camKet"
                label="Chịu trách nhiệm trước pháp luật về tính chính xác, tính hợp pháp của hồ sơ đánh giá tác động xử lý dữ liệu cá nhân và tài liệu đính kèm"
                color="#1E7D30"
                :value="true"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row class="mx-0 my-2" justify="center">
            <v-btn
              class="mr-3"
              size="small"
              variant="outlined"
              color="#1E7D30"
              @click.stop="prevTab('dinhkem')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="submitNopHoSo()"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Nộp hồ sơ</span>
            </v-btn>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .check-cam-ket .v-checkbox .v-selection-control {
    min-height: 0px;
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
