<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import toastr from 'toastr'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  const { mobile } = useDisplay()
  const route = useRoute()
  const router = useRouter()
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  appStore.SET_DATA_FORM_BIEUMAU_TBVP(appStore.dataFormBieuMauTbvpDefault)
  const dataFormBieuMau = computed(() => appStore.dataFormBieuMauTbvp)
  const thongTinHoSo = computed(function () {
    return appStore.thongTinHoSo
  })
  const menuSelected = computed(() => appStore.getMenuSelected)
  const hoSoThayDoiNoiDung = ref(false)
  const dossierName = ref('Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân')
  const tabSelected = ref(null)
  if (router.currentRoute.value.query && router.currentRoute.value.query.hasOwnProperty('id_update')) {
    hoSoThayDoiNoiDung.value = true
    dossierName.value = 'Thay đổi nội dung hồ sơ thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân'
    tabSelected.value = 'thongtinthaydoi'
  } else {
    hoSoThayDoiNoiDung.value = false
    dossierName.value = 'Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân'
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
  const loaidlcnnhaycamRef = ref(null)
  const loaidlcncobanRef = ref(null)
  const nhomhvvphcRef = ref(null)
  
  const camKet = ref(false)

  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)
  const dsNoiDungVPHC = ref([])
  const dsNhomHanhViVPHC = ref([])
  
  const getData = function () {
    let defData = [
      {'MaMuc': '1', 'TenMuc': 'Vi phạm nguyên tắc bảo vệ dữ liệu cá nhân'},
      {'MaMuc': '2', 'TenMuc': 'Vi phạm quyền của chủ thể dữ liệu'},
      {'MaMuc': '3', 'TenMuc': 'Vi phạm quy định về sự đồng ý của chủ thể dữ liệu'}
    ]
    let filter = {
      maDanhMuc: 'nhomhanhvivphc'
    }
    hosoDvcStore.getDanhMucEform(filter).then(function(result) {
      dsNhomHanhViVPHC.value = result.content && result.content.length ? result.content : defData
      dsNoiDungVPHC.value = dsNhomHanhViVPHC.value.map(function (val, index) {
        return { NhomHanhViVPHC: val, MoTaHanhViVPHC: '' }
      })
    }).catch(function(){
      dsNhomHanhViVPHC.value = []
      dsNoiDungVPHC.value = []
    })
  }
  getData()
  //
  const changeDatePicker = (key, data) => {
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp[key] = dateIsoLocal(data)
    })
  }
  const prevTab = function (currentTab) {
    tabSelected.value = currentTab
    document.getElementById("top-menu").scrollIntoView()
  }
  const nextTab = async function (tabSelect) {
    if (tabSelect == 'nhapdon') {
      const { valid } = await formNoiDungThayDoi.value.validate()
      // console.log('formNoiDungThayDoi', valid)
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
          // console.log('doiTuongThucHienCaNhan', doiTuongThucHien)
          // doiTuongThucHien.MaDinhDanh = doiTuongThucHien['GiayChungNhan']['SoGiay']
          appStore.$patch((state) => {
            state.thongTinHoSo['ChuHoSo'] = {
              DanhBaLienLac: {SoFax: '', ThuDienTu: doiTuongThucHien['ThuDienTu'], SoDienThoai: doiTuongThucHien['SoDienThoai']},
              DiaChi: doiTuongThucHien['DiaChiHoatDong'],
              LoaiDoiTuong: doiTuongThucHien['LoaiDoiTuongThucHien'],
              MaDinhDanh: doiTuongThucHien["MaDinhDanh"],
              MaDoiTuong: '',
              TenGoi: doiTuongThucHien['TenGoi'],
              ThongTinKhac: ''
            }
          })
          appStore.$patch((state) => {
            state.thongTinHoSo['NguoiNopHoSo'] = {
              DanhBaLienLac: {SoFax: '', ThuDienTu: doiTuongThucHien['ThuDienTu'], SoDienThoai: doiTuongThucHien['SoDienThoai']},
              MaDinhDanh: doiTuongThucHien["MaDinhDanh"],
              MaDoiTuong: '',
              TenGoi: doiTuongThucHien['TenGoi'],
              ThongTinKhac: ''
            }
          })
          appStore.$patch((state) => {
            state.dataFormBieuMauTbvp['DoiTuongThucHien'] = doiTuongThucHien
          })
          appStore.$patch((state) => {
            state.dataFormBieuMauTbvp['NguoiLienHe'] = nguoiLienHe
          })
        } else {
          if (validThongTinCaNhan && !doiTuongThucHien.GiayChungNhan.NgayCap) {
            toastr.error('Vui lòng nhập "Ngày cấp"')
          }
          return
        }
    }
    if (tabSelect == 'dinhkem') {
      
      const { valid } = await formTomTatNoiDung.value.validate()
      // console.log('validFormTomTat', valid)
      if (!valid) {
        document.getElementById("top-menu").scrollIntoView()
        return
      }
      
      let exitsNhomhvvp = dsNoiDungVPHC.value.filter(function (item) {
        return item['NhomHanhViVPHC']['Selected']
      })
      if (!exitsNhomhvvp.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Nội dung báo cáo vi phạm"')
        return
      }
      let exitsDlcb = loaidlcncobanRef.value.danhSachDanhMuc.filter(function (item) {
        return item['Selected']
      })
      if (!exitsDlcb.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Các loại dữ liệu cá nhân cơ bản vi phạm liên quan"')
        return
      }
      let exitsDlnc = loaidlcnnhaycamRef.value.danhSachDanhMuc.filter(function (item) {
        return item['Selected']
      })
      if (!exitsDlnc.length) {
        toastr.clear()
        toastr.error('Vui lòng chọn "Các loại dữ liệu cá nhân nhạy cảm vi phạm liên quan"')
        return
      }
      if (!dataFormBieuMau.value['ThoiGianViPham']) {
        toastr.error('Vui lòng chọn "Thời gian vi phạm"')
        return
      }
      appStore.$patch((state) => {
        state.dataFormBieuMauTbvp['LoaiDLCNCoBan'] = exitsDlcb
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauTbvp['LoaiDLCNNhayCam'] = exitsDlnc
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauTbvp['NoiDungViPham'] = exitsNhomhvvp
      })
    }
    tabSelected.value = tabSelect
    document.getElementById("top-menu").scrollIntoView()
  }
  const fillData = function () {
    let doiTuongThucHien = thongtinchuhoso.value.doiTuongThucHien
    let nguoiLienHe = thongtinchuhoso.value.nguoiLienHe
    // doiTuongThucHien.MaDinhDanh = doiTuongThucHien['GiayChungNhan']['SoGiay']
    appStore.$patch((state) => {
      state.thongTinHoSo['ChuHoSo'] = {
        DanhBaLienLac: {SoFax: '', ThuDienTu: doiTuongThucHien['ThuDienTu'], SoDienThoai: doiTuongThucHien['SoDienThoai']},
        DiaChi: doiTuongThucHien['DiaChiHoatDong'],
        LoaiDoiTuong: doiTuongThucHien['LoaiDoiTuongThucHien'],
        MaDinhDanh: doiTuongThucHien["MaDinhDanh"],
        MaDoiTuong: '',
        TenGoi: doiTuongThucHien['TenGoi'],
        ThongTinKhac: ''
      }
    })
    appStore.$patch((state) => {
      state.thongTinHoSo['NguoiNopHoSo'] = {
        DanhBaLienLac: {SoFax: '', ThuDienTu: doiTuongThucHien['ThuDienTu'], SoDienThoai: doiTuongThucHien['SoDienThoai']},
        MaDinhDanh: doiTuongThucHien["MaDinhDanh"],
        MaDoiTuong: '',
        TenGoi: doiTuongThucHien['TenGoi'],
        ThongTinKhac: ''
      }
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['DoiTuongThucHien'] = doiTuongThucHien
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['NguoiLienHe'] = nguoiLienHe
    })
    let exitsNhomhvvp = dsNoiDungVPHC.value.filter(function (item) {
      return item['NhomHanhViVPHC']['Selected']
    })
    let exitsDlcb = loaidlcncobanRef.value ? loaidlcncobanRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    }): []
    let exitsDlnc = loaidlcnnhaycamRef.value ? loaidlcnnhaycamRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    }): []
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['LoaiDLCNCoBan'] = exitsDlcb
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['LoaiDLCNNhayCam'] = exitsDlnc
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['NoiDungViPham'] = exitsNhomhvvp
    })
    console.log('exitsNhomhvvp123', exitsNhomhvvp)
  }
  const reviewTab = function () {
    fillData()
  }
  const submitNopHoSo = async function (type) {
    // validation
    if (hoSoThayDoiNoiDung.value) {
      const { valid } = await formNoiDungThayDoi.value.validate()
      if (!valid) {
        toastr.error('Vui lòng nhập đầy đủ "Nội dung thay đổi"')
        tabSelected.value = 'thongtinthaydoi'
        document.getElementById("top-menu").scrollIntoView()
        return
      }
    }
    // valid chủ hồ sơ
    let doiTuongThucHien = thongtinchuhoso.value.doiTuongThucHien
    let nguoiLienHe = thongtinchuhoso.value.nguoiLienHe
    let validThongTinCaNhan = await thongtinchuhoso.value.validateForm()
    if (validThongTinCaNhan && doiTuongThucHien.GiayChungNhan.NgayCap) {
      // doiTuongThucHien.MaDinhDanh = doiTuongThucHien['GiayChungNhan']['SoGiay']
      appStore.$patch((state) => {
        state.thongTinHoSo['ChuHoSo'] = {
          DanhBaLienLac: {SoFax: '', ThuDienTu: doiTuongThucHien['ThuDienTu'], SoDienThoai: doiTuongThucHien['SoDienThoai']},
          DiaChi: doiTuongThucHien['DiaChiHoatDong'],
          LoaiDoiTuong: doiTuongThucHien['LoaiDoiTuongThucHien'],
          MaDinhDanh: doiTuongThucHien["MaDinhDanh"],
          MaDoiTuong: '',
          TenGoi: doiTuongThucHien['TenGoi'],
          ThongTinKhac: ''
        }
      })
      appStore.$patch((state) => {
        state.thongTinHoSo['NguoiNopHoSo'] = {
          DanhBaLienLac: {SoFax: '', ThuDienTu: doiTuongThucHien['ThuDienTu'], SoDienThoai: doiTuongThucHien['SoDienThoai']},
          MaDinhDanh: doiTuongThucHien["MaDinhDanh"],
          MaDoiTuong: '',
          TenGoi: doiTuongThucHien['TenGoi'],
          ThongTinKhac: ''
        }
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauTbvp['DoiTuongThucHien'] = doiTuongThucHien
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauTbvp['NguoiLienHe'] = nguoiLienHe
      })
    } else {
      toastr.error('Vui lòng nhập đầy đủ "Thông tin chủ hồ sơ"')
      tabSelected.value = 'nhapdon'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    // 
    // valid noidunghoso
    const { valid } = await formTomTatNoiDung.value.validate()
    if (!valid) {
      toastr.error('Vui lòng nhập đầy đủ thông tin "Nội dung hồ sơ"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    let exitsNhomhvvp = dsNoiDungVPHC.value.filter(function (item) {
      return item['NhomHanhViVPHC']['Selected']
    })
    if (!exitsNhomhvvp.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Nội dung báo cáo vi phạm"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    let exitsDlcb = loaidlcncobanRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    })
    if (!exitsDlcb.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Loại dữ liệu cá nhân cơ bản vi phạm liên quan"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    let exitsDlnc = loaidlcnnhaycamRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    })
    if (!exitsDlnc.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Loại dữ liệu cá nhân nhạy cảm vi phạm liên quan"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    if (!dataFormBieuMau.value['ThoiGianViPham']) {
      toastr.error('Vui lòng chọn "Thời gian vi phạm"')
      tabSelected.value = 'noidung'
      return
    }
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['LoaiDLCNCoBan'] = exitsDlcb
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['LoaiDLCNNhayCam'] = exitsDlnc
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauTbvp['NoiDungViPham'] = exitsNhomhvvp
    })
    // 

    if (!camKet.value) {
      toastr.error('Vui lòng xác nhận cam kết')
      return
    }
    // console.log('dataFormBieuMau', dataFormBieuMau.value)
    let dataBm = Object.assign(dataFormBieuMau.value, {"BieuMauDienTu": {"MaMuc": "BM_TBVP", "TenMuc": "Biểu mẫu BM_TBVP"}})
    let filter = {
      data: dataBm
    }
    loading.value = true
    let eventDLDT = 'themMoiDLDT'
    let eventHoSo = 'themMoiHoSo'
    if (props.action == 'update') {
      eventDLDT = 'capNhatDLDT'
      eventHoSo = 'capNhatHoSo'
    }
    hosoDvcStore[eventDLDT](filter).then(function(result) {
      loading.value = false
      let dataDldt = result.resp
      thongTinHoSo.value.ThanhPhanHoSo.forEach((element, index) => {
        if (element.MaThanhPhanHoSo && element.MaThanhPhanHoSo.MaMuc.split('_')[0] == 'BMDT') {
          appStore.$patch((state) => {
            state.thongTinHoSo['ThanhPhanHoSo'][index]['DuLieuDienTu'] = dataDldt
          })
        }
      })
      if (type === 'send') {
        appStore.$patch((state) => {
          state.thongTinHoSo['TrangThaiHoSo'] = {
            'MaMuc': '01',
            'TenMuc': 'Mới đăng ký'
          }
          state.thongTinHoSo['TrangThaiDuLieu'] = {
            'MaMuc': '02',
            'TenMuc': 'Chính thức'
          }
          state.thongTinHoSo['TrichYeuHoSo'] = thongTinHoSo.value['ThuTucHanhChinh']['TenMuc'] + ' cho tổ chức/cá nhân ' + thongTinHoSo.value['ChuHoSo']['TenGoi']
        })
      } else {
        appStore.$patch((state) => {
          state.thongTinHoSo['TrangThaiHoSo'] = {
            'MaMuc': '',
            'TenMuc': 'Chưa gửi'
          }
          state.thongTinHoSo['TrangThaiDuLieu'] = {
            'MaMuc': '01',
            'TenMuc': 'Bản thảo'
          }
          state.thongTinHoSo['TrichYeuHoSo'] = thongTinHoSo.value['ThuTucHanhChinh']['TenMuc'] + ' cho tổ chức/cá nhân ' + thongTinHoSo.value['ChuHoSo']['TenGoi']
        })
      }
      console.log('thongTinHoSo', thongTinHoSo.value)
      let filterHs = {
        data: thongTinHoSo.value
      }
      // hosoDvcStore.capNhatHoSo(filterHs).then(function(result) {
      //   toastr.success('Gửi hồ sơ thành công')
      //   router.push({ path: menuSelected.value.to })
      // }).catch(function(){
      //   toastr.error('Cập nhật hồ sơ thất bại')
      // })
      hosoDvcStore[eventHoSo](filterHs).then(function(resultHs) {
        if (type = 'send') {
          dataDldt = Object.assign(dataDldt, {'MaHoSo': resultHs.resp['MaDinhDanh']})
          let filterBm = {
            data: dataDldt
          }
          hosoDvcStore.capNhatDLDT(filterBm).then(function() {
          })
          toastr.success('Gửi hồ sơ thành công')
        } else {
          toastr.success('Cập nhật hồ sơ thành công')
        }
        router.push({ path: menuSelected.value.to })
      }).catch(function(){
        toastr.error('Cập nhật hồ sơ thất bại')
      })
    }).catch(function(){
      loading.value = false
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
    if (val.query && val.query.hasOwnProperty('id_update')) {
      hoSoThayDoiNoiDung.value = true
      dossierName.value = 'Bổ sung nội dung hồ sơ thông báo vi phạm xử lý dữ liệu cá nhân'
      tabSelected.value = 'thongtinthaydoi'
    } else {
      hoSoThayDoiNoiDung.value = false
      dossierName.value = 'Thông báo vi phạm xử lý dữ liệu cá nhân'
      tabSelected.value = 'nhapdon'
    }
    getData()
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
        <div v-if="!mobile" class="text-sub-header pl-2" style="text-transform: uppercase;">{{ dossierName }}</div>
      </v-col>
    </v-row>
    <div v-if="mobile" class="text-sub-header mx-0 my-0 mb-2" style="text-transform: uppercase;">{{ dossierName }}</div>
    <v-tabs
      v-if="!hoSoThayDoiNoiDung"
      v-model="tabSelected"
      bg-color="#00000000"
      :hide-slider="true"
    >
      <v-tab :hide-slider="true"  value="nhapdon" id="top-menu">
        <span style="font-size: 18px;">1.</span> Chủ hồ sơ
      </v-tab>
      <v-tab :hide-slider="true"  value="noidung"><span style="font-size: 18px;">2.</span> Thông tin hồ sơ</v-tab>
      <v-tab :hide-slider="true"  value="dinhkem"><span style="font-size: 18px;">3.</span> Thành phần hồ sơ</v-tab>
      <v-tab :hide-slider="true"  value="xemlai" @click="reviewTab"><span style="font-size: 18px;">4.</span> Gửi hồ sơ</v-tab>
    </v-tabs>

    <v-tabs
      v-else
      v-model="tabSelected"
      bg-color="#00000000"
      :hide-slider="true"
    >
      <v-tab :hide-slider="true"  value="thongtinthaydoi" id="top-menu">
        <span style="font-size: 18px;">1.</span> Thông tin bổ sung
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
        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="thongtinthaydoi">
          <v-form ref="formNoiDungThayDoi" lazy-validation class="py-0">
            <v-row class="mx-0 my-0">
              <v-col cols="12" class="py-0 mb-10">
                <div class="text-label">Mã hồ sơ bổ sung nội dung <span style="color: red">(*)</span></div>
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
                <div class="text-label">Lý do bổ sung <span style="color: red">(*)</span></div>
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

        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="nhapdon" >
          <v-row class="mx-0 my-0">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">THÔNG TIN CÁ NHÂN, TỔ CHỨC THỰC HIỆN THÔNG BÁO VI PHẠM</div>
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

        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="noidung" >
          <v-form ref="formTomTatNoiDung" lazy-validation class="py-0">
          <v-row class="mx-0 my-0">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">TÓM TẮT NỘI DUNG THÔNG BÁO VI PHẠM XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <div class="text-label mx-3 mb-0">Nội dung báo cáo vi phạm <span style="color: red">(*)</span></div>
            <v-row class="mx-3 py-0 my-2 select-danhmuc">
              <v-col cols="12" md="6" class="px-2 py-1 col-select-dm" v-for="(item, index) in dsNoiDungVPHC" :key="index">
                <v-checkbox
                  v-model="item['NhomHanhViVPHC']['Selected']"
                  :label="item['NhomHanhViVPHC']['TenMuc']"
                  color="#1E7D30"
                  :value="true"
                  hide-details
                ></v-checkbox>
                <div v-if="item['NhomHanhViVPHC']['Selected']">
                  <i>Mô tả hành vi vi phạm:</i>
                  <v-textarea rows="3"
                    class="flex input-form"
                    v-model="item['MoTaHanhViVPHC']"
                    solo
                    dense
                    hide-details="auto"
                  >
                  </v-textarea>
                </div>
              </v-col>
            </v-row>
            <!-- <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Nội dung vi phạm <span style="color: red">(*)</span></div>
              <v-textarea
                rows="3"
                class="flex input-form"
                v-model="dataFormBieuMau.SoLuongDuLieu"
                solo
                dense
                hide-details="auto"
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-textarea>
            </v-col> -->
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian vi phạm <span style="color: red">(*)</span></div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataFormBieuMau['ThoiGianViPham']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" @update:model-value="changeDatePicker('ThoiGianViPham', dataFormBieuMau['ThoiGianViPham'])"
                >
                </VueDatePicker>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Địa điểm xảy ra vi phạm <span style="color: red">(*)</span></div>
              <v-text-field
                class="flex input-form"
                v-model="dataFormBieuMau.DiaDiemViPham"
                solo
                dense
                hide-details="auto"
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Tổ chức, cá nhân liên quan</div>
              <v-text-field
                class="flex input-form"
                v-model="dataFormBieuMau.ToChucCaNhanLienQuan"
                solo
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Các loại dữ liệu cá nhân cơ bản vi phạm liên quan <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect ref="loaidlcncobanRef" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại dữ liệu cá nhân cơ bản',key: 'TenMuc' }]" 
              :maDanhMuc="'loaidlcncoban'" :selected="dataFormBieuMau['LoaiDLCNCoBan']"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Các loại dữ liệu cá nhân nhạy cảm vi phạm liên quan <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect ref="loaidlcnnhaycamRef" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại dữ liệu cá nhân nhạy cảm',key: 'TenMuc' }]" 
              :maDanhMuc="'loaidlcnnhaycam'" :selected="dataFormBieuMau['LoaiDLCNNhayCam']"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Số lượng dữ liệu vi phạm liên quan <span style="color: red">(*)</span></div>
              <v-text-field
                class="flex input-form"
                v-model="dataFormBieuMau.SoLuongDuLieu"
                solo
                dense
                hide-details="auto"
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Hậu quả xảy ra <span style="color: red">(*)</span></div>
              <v-textarea
                rows="3"
                class="flex input-form"
                v-model="dataFormBieuMau.HauQuaXayRa"
                solo
                dense
                hide-details="auto"
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Biện pháp áp dụng</div>
              <v-text-field
                class="flex input-form"
                v-model="dataFormBieuMau.BienPhapApDung"
                solo
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-checkbox
                class=""
                v-model="dataFormBieuMau.ThongBaoSau72H"
                label="Vi phạm đã xảy ra trước 72 tại thời điểm thông báo?"
                color="#1E7D30"
                :value="true"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="py-0 mb-10" v-if="dataFormBieuMau.ThongBaoSau72H">
              <div class="text-label">Lý do chậm muộn thực hiện thông báo sau 72h</div>
              <v-textarea
                rows="3"
                class="flex input-form"
                v-model="dataFormBieuMau.LyDoChamMuon"
                solo
                dense
                hide-details="auto"
              ></v-textarea>
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

        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="dinhkem" >
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
        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="xemlai" style="margin-top: -5px">
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
              color="#be7b00"
              class="mx-0 mr-3"
              @click.stop="submitNopHoSo('draf')"
              height="32px" width="130px"
              :loading="loading"
              :disabled="loading"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-content-save-all</v-icon>
              <span style="font-size: 16px">Lưu nháp</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="submitNopHoSo('send')"
              height="32px" width="130px"
              :loading="loading"
              :disabled="loading"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Gửi hồ sơ</span>
            </v-btn>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .window-tab {
    padding: 15px; 
    border: 1px solid #DADADA;
    border-top: 0px;
    padding-left: 5px;
  }
  .window-tab-mobile {
    padding: 15px 0px; 
    border: 1px solid #DADADA;
    border-top: 0px;
  }
  .check-cam-ket .v-checkbox .v-selection-control {
    min-height: 0px;
  }
  .thongtinchung .label-text {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
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
