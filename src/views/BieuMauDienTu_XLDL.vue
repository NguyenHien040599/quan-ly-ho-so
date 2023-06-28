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
  const props = defineProps({
    dataInput: {
      type: Object,
      default: {}
    },
    action: {
      type: String,
      default: ''
    }
  })
  if (props.action == 'create') {
    appStore.SET_DATA_FORM_BIEUMAU_XLDL(appStore.dataFormBieuMauXldlDefault)
  }
  const dataFormBieuMau = computed(() => appStore.dataFormBieuMauXldl)
  console.log('dataFormBieuMau', dataFormBieuMau.value)
  const thongTinHoSo = computed(function () {
    return appStore.thongTinHoSo
  })
  const menuSelected = computed(() => appStore.getMenuSelected)
  const hoSoThayDoiNoiDung = ref(false)
  const dossierName = ref('Đánh giá tác động xử lý dữ liệu cá nhân')
  const tabSelected = ref(null)
  if (router.currentRoute.value.query && router.currentRoute.value.query.hasOwnProperty('id_update')) {
    // console.log('router', router)
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
  
  const loainguycoruiroRef = ref(null)
  const loaibienphapbvdlcnRef = ref(null)
  const loaidlcnnhaycamRef = ref(null)
  const loaidlcncobanRef = ref(null)
  const dsLoaiDoiTuongBVDLCN = ref([])
  const dsLoaiHinhDGTD = ref([])
  
  const dsDieuKienXuLyDLCN = ref([])
  const camKet = ref(false)

  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)
  
  // 
  const getData = function () {
    let filter = {
      maDanhMuc: 'loaibendgtd'
    }
    hosoDvcStore.getDanhMucEform(filter).then(function(result) {
      dsLoaiDoiTuongBVDLCN.value = result.content
    }).catch(function(){
      dsLoaiDoiTuongBVDLCN.value = []
    })

    let filter2 = {
      maDanhMuc: 'loaihinhdgtd'
    }
    hosoDvcStore.getDanhMucEform(filter2).then(function(result) {
      dsLoaiHinhDGTD.value = result.content
    }).catch(function(){
      dsLoaiHinhDGTD.value = [
        {
          "MaMuc": "01",
          "TenMuc": "Xử lý dữ liệu"
        },
        {
          "MaMuc": "02",
          "TenMuc": "Xử lý và chuyển dữ liệu ra nước ngoài"
        },
        {
          "MaMuc": "03",
          "TenMuc": "Chuyển dữ liệu ra nước ngoài"
        }
      ]
    })
  }
  getData()
  const changeDatePicker = (key, data) => {
    appStore.$patch((state) => {
      state.dataFormBieuMauXldl[key] = dateIsoLocal(data)
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
      if (!dataFormBieuMau.value['LoaiBenDGTD']) {
        toastr.error('Vui lòng chọn "Bên đánh giá tác động"')
        document.getElementById("top-menu").scrollIntoView()
        return
      }
      if (!dataFormBieuMau.value['LoaiHinhDGTD']) {
        toastr.error('Vui lòng chọn "Loại đánh giá tác động"')
        document.getElementById("top-menu").scrollIntoView()
        return
      }
      const { valid } = await formTomTatNoiDung.value.validate()
      // console.log('validFormTomTat', valid)
      if (!valid) {
        document.getElementById("top-menu").scrollIntoView()
        return
      }
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
      if (!dataFormBieuMau.value['ThoiGianBatDau']) {
        toastr.error('Vui lòng chọn "Thời gian bắt đầu"')
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
      state.dataFormBieuMauXldl['DoiTuongThucHien'] = doiTuongThucHien
    })
    appStore.$patch((state) => {
      state.dataFormBieuMauXldl['NguoiLienHe'] = nguoiLienHe
    })
    let exitsDlcb = loaidlcncobanRef.value ? loaidlcncobanRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    }): []
    let exitsDlnc = loaidlcnnhaycamRef.value ? loaidlcnnhaycamRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    }): []
    let exitsBpbv = loaibienphapbvdlcnRef.value ? loaibienphapbvdlcnRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    }) : []
    let exitsNguyCo = loainguycoruiroRef.value ? loainguycoruiroRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    }) : []
    if (loaidlcncobanRef.value) {
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiDLCNCoBan'] = exitsDlcb
      })
    }
    if (loaidlcnnhaycamRef.value) {
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiDLCNNhayCam'] = exitsDlnc
      })
    }
    if (loaibienphapbvdlcnRef.value) {
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiBienPhapBVDLCN'] = exitsBpbv
      })
    }
    if (loainguycoruiroRef.value) {
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['LoaiDanhGiaTacDong'] = exitsNguyCo
      })
    }
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
        state.dataFormBieuMauXldl['DoiTuongThucHien'] = doiTuongThucHien
      })
      appStore.$patch((state) => {
        state.dataFormBieuMauXldl['NguoiLienHe'] = nguoiLienHe
      })
    } else {
      toastr.error('Vui lòng nhập đầy đủ "Thông tin chủ hồ sơ"')
      tabSelected.value = 'nhapdon'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    // 
    // valid noidunghoso
    if (!formTomTatNoiDung.value) {
      toastr.error('Vui lòng kiểm tra lại "Nội dung hồ sơ"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    if (!dataFormBieuMau.value['LoaiBenDGTD']) {
      toastr.error('Vui lòng chọn "Bên đánh giá tác động"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    if (!dataFormBieuMau.value['LoaiHinhDGTD']) {
      toastr.error('Vui lòng chọn "Loại đánh giá tác động"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    const { valid } = await formTomTatNoiDung.value.validate()
    if (!valid) {
      toastr.error('Vui lòng nhập đầy đủ thông tin "Nội dung hồ sơ"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    let exitsDlcb = loaidlcncobanRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    })
    if (!exitsDlcb.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Phạm vi xử lý các loại dữ liệu cá nhân cơ bản"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    let exitsDlnc = loaidlcnnhaycamRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    })
    if (!exitsDlnc.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Phạm vi xử lý các loại dữ liệu cá nhân nhạy cảm"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    let exitsBpbv = loaibienphapbvdlcnRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    })
    if (!exitsBpbv.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Biện pháp bảo vệ dữ liệu cá nhân được áp dụng"')
      tabSelected.value = 'noidung'
      return
    }
    let exitsNguyCo = loainguycoruiroRef.value.danhSachDanhMuc.filter(function (item) {
      return item['Selected']
    })
    if (!exitsNguyCo.length) {
      toastr.clear()
      toastr.error('Vui lòng chọn "Loại đánh giá tác động đã thực hiện"')
      tabSelected.value = 'noidung'
      document.getElementById("top-menu").scrollIntoView()
      return
    }
    if (!dataFormBieuMau.value['ThoiGianBatDau']) {
      toastr.error('Vui lòng chọn "Thời gian bắt đầu"')
      tabSelected.value = 'noidung'
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
    // 

    if (!camKet.value) {
      toastr.error('Vui lòng xác nhận cam kết')
      return
    }
    // console.log('dataFormBieuMau', dataFormBieuMau.value)
    let dataBm = Object.assign(dataFormBieuMau.value, {"BieuMauDienTu": {"MaMuc": "BM_DGTDDLCN", "TenMuc": "Biểu mẫu DGTD_XLDLCN"}})
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
      let dataDldt = result.resp
      thongTinHoSo.value.ThanhPhanHoSo.forEach((element, index) => {
        if (element.MaThanhPhanHoSo && element.MaThanhPhanHoSo.MaMuc.split('_')[0] == 'BMDT') {
          appStore.$patch((state) => {
            state.thongTinHoSo['ThanhPhanHoSo'][index]['DuLieuDienTu'] = dataDldt
          })
        }
      })
      let mappingThuTucHanhChinh = {}
      if (dataFormBieuMau.value.LoaiHinhDGTD && (dataFormBieuMau.value.LoaiHinhDGTD['MaMuc'] == '01' || dataFormBieuMau.value.LoaiHinhDGTD['MaMuc'] == '02')) {
        mappingThuTucHanhChinh = {
          "MaMuc": "DGTD_XLDLCN",
          "TenMuc": "Hồ sơ đánh giá tác động xử lý dữ liệu cá nhân"
        }
        if (hoSoThayDoiNoiDung.value) {
          mappingThuTucHanhChinh = {
            "MaMuc": "TDND_DGTD_XLDLCN",
            "TenMuc": "Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu cá nhân"
          }
        }
      } else {
        mappingThuTucHanhChinh = {
          "MaMuc": "DGTD_CDLCN",
          "TenMuc": "Hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài"
        }
        if (hoSoThayDoiNoiDung.value) {
          mappingThuTucHanhChinh = {
            "MaMuc": "TDND_DGTD_CDLCN",
            "TenMuc": "Thay đổi nội dung hồ sơ đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài"
          }
        }
      }
      let tenHoSo = 'Hồ sơ đánh giá tác động ' + String(dataFormBieuMau.value.LoaiHinhDGTD['TenMuc']).toLocaleLowerCase() + ' cho tổ chức/cá nhân ' + thongTinHoSo.value['ChuHoSo']['TenGoi']
      if (hoSoThayDoiNoiDung.value) {
        tenHoSo = 'Thay đổi nội dung hồ sơ đánh giá tác động ' + String(dataFormBieuMau.value.LoaiHinhDGTD['TenMuc']).toLocaleLowerCase() + ' cho tổ chức/cá nhân ' + thongTinHoSo.value['ChuHoSo']['TenGoi']
      }
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
          state.thongTinHoSo['ThuTucHanhChinh'] = mappingThuTucHanhChinh
          state.thongTinHoSo['TrichYeuHoSo'] = tenHoSo
          state.thongTinHoSo['NgayNopHoSo'] = dateIsoLocal(new Date())
        })
      } else if (type === 'bosung') {
        appStore.$patch((state) => {
          state.thongTinHoSo['TrangThaiHoSo'] = {
            'MaMuc': '04',
            'TenMuc': 'Đang xử lý'
          }
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
          state.thongTinHoSo['TrichYeuHoSo'] = tenHoSo
        })
      }
      console.log('thongTinHoSo', thongTinHoSo.value)
      let filterHs = {
        data: thongTinHoSo.value
      }
      hosoDvcStore[eventHoSo](filterHs).then(function(resultHs) {
        loading.value = false
        if (type == 'send') {
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
        loading.value = false
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
        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="thongtinthaydoi">
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

        <v-window-item :class="!mobile ? 'window-tab' : 'window-tab-mobile'" :transition="false" value="nhapdon" >
          <v-row class="mx-0 my-0">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">THÔNG TIN CÁ NHÂN, TỔ CHỨC THỰC HIỆN ĐÁNH GIÁ TÁC ĐỘNG XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <ThongTinChuHoSo ref="thongtinchuhoso" :action="props.action" :thuTuc="'xldl'"></ThongTinChuHoSo>
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
              <div class="text-sub-header">TÓM TẮT NỘI DUNG ĐÁNH GIÁ TÁC ĐỘNG</div>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <div class="text-label">Bên đánh giá tác động <span style="color: red">(*)</span></div>
              <v-radio-group v-model="dataFormBieuMau['LoaiBenDGTD']">
                <v-radio v-for="(item, index) in dsLoaiDoiTuongBVDLCN" :key="index" 
                :label="item['TenMuc']" :value="item" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <div class="text-label">Loại đánh giá tác động <span style="color: red">(*)</span></div>
              <v-radio-group v-model="dataFormBieuMau['LoaiHinhDGTD']">
                <v-radio v-for="(item, index) in dsLoaiHinhDGTD" :key="index" 
                :label="item['TenMuc']" :value="item" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Mô tả mục đích xử lý hoặc chuyển dữ liệu cá nhân <span style="color: red">(*)</span></div>
              <v-textarea
                class="flex input-form"
                rows="3"
                v-model="dataFormBieuMau['MucDichDLCN']"
                solo
                dense
                hide-details="auto"
                clearable
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Hoạt động xử lý hoặc chuyển dữ liệu cá nhân <span style="color: red">(*)</span></div>
              <v-textarea
                class="flex input-form"
                rows="3"
                v-model="dataFormBieuMau['HoatDongDLCN']"
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
              <div class="text-label">Số lượng xử lý dữ liệu</div>
              <v-text-field
                class="flex input-form"
                v-model="dataFormBieuMau.SoLuongDuLieu"
                solo
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Có sự đồng ý của chủ thể dữ liệu không?</div>
              <v-radio-group inline v-model="dataFormBieuMau['DongYChuTheDLCN']" hide-details>
                <v-radio label="Có" :value="true" color="#1E7D30" class="mr-3"></v-radio>
                <v-radio label="Không" :value="false" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian bắt đầu <span style="color: red">(*)</span></div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataFormBieuMau['ThoiGianBatDau']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" @update:model-value="changeDatePicker('ThoiGianBatDau', dataFormBieuMau['ThoiGianBatDau'])"
                >
                </VueDatePicker>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian kết thúc</div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataFormBieuMau['ThoiGianKetThuc']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" @update:model-value="changeDatePicker('ThoiGianKetThuc', dataFormBieuMau['ThoiGianKetThuc'])"
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
              :maDanhMuc="'loaidanhgiatacdong'" :selected="dataFormBieuMau['LoaiDanhGiaTacDong']"></TableSelect>
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
              v-if="!thongTinHoSo['TrangThaiHoSo'] || thongTinHoSo['TrangThaiHoSo']['MaMuc'] !== '05'"
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
              v-if="!thongTinHoSo['TrangThaiHoSo'] || thongTinHoSo['TrangThaiHoSo']['MaMuc'] !== '05'"
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
            <v-btn
              v-if="thongTinHoSo['TrangThaiHoSo'] && thongTinHoSo['TrangThaiHoSo']['MaMuc'] == '05'"
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="submitNopHoSo('bosung')"
              height="32px"
              :loading="loading"
              :disabled="loading"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Gửi bổ sung hồ sơ</span>
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
