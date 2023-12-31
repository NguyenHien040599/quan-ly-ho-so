
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => ({ 
    userInfo: {},
    dialogConfirm: {
      auth: false,
      title: '',
      message: '',
      button: {},
      callback: () => {}
    },
    isShowConfirm: false,
    breakpointName: 'lg',
    drawer: false,
    isSigned: false,
    menuSelected: {},
    thongTinHoSo: {},
    dataFormBieuMauXldl: {
      MaHoSo: '',
      DoiTuongThucHien: {
        LoaiDoiTuongThucHien: null
      },
      LoaiBenDGTD: null,
      LoaiHinhDGTD: null,
      NguoiLienHe: null,
      MucDichDLCN: '',
      HoatDongDLCN: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      SoLuongDuLieu: '',
      DongYChuTheDLCN: false,
      ThoiGianBatDau: '',
      ThoiGianKetThuc: '',
      LoaiBienPhapBVDLCN: [],
      LoaiDanhGiaTacDong: [],
      LayYKienDanhGia: false,
      MaHoSoThayDoi: '',
      NoiDungThayDoi: '',
      LyDoThayDoi: ''
    },
    dataFormBieuMauXldlDefault: {
      MaHoSo: '',
      DoiTuongThucHien: {
        LoaiDoiTuongThucHien: null
      },
      LoaiBenDGTD: null,
      LoaiHinhDGTD: null,
      NguoiLienHe: null,
      MucDichDLCN: '',
      HoatDongDLCN: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      SoLuongDuLieu: '',
      DongYChuTheDLCN: false,
      ThoiGianBatDau: '',
      ThoiGianKetThuc: '',
      LoaiBienPhapBVDLCN: [],
      LoaiDanhGiaTacDong: [],
      LayYKienDanhGia: false,
      MaHoSoThayDoi: '',
      NoiDungThayDoi: '',
      LyDoThayDoi: ''
    },
    dataFormBieuMauCdlcnrnn: {
      MaHoSo: '',
      DoiTuongThucHien: {
        LoaiDoiTuongThucHien: null
      },
      LoaiBenDGTD: null,
      LoaiHinhDGTD: null,
      NguoiLienHe: null,
      MucDichCDLCNRNN: '',
      HoatDongCDLCNRNN: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      SoLuongDuLieu: '',
      DongYChuTheDLCN: false,
      ChuyenDLCNRaNuocNgoai: false,
      ThoiGianBatDau: '',
      ThoiGianKetThuc: '',
      LoaiBienPhapBVDLCN: [],
      LoaiDanhGiaTacDong: [],
      LayYKienDanhGia: false,
      MaHoSoThayDoi: '',
      NoiDungThayDoi: '',
      LyDoThayDoi: ''
    },
    dataFormBieuMauCdlcnrnnDefault: {
      MaHoSo: '',
      DoiTuongThucHien: {
        LoaiDoiTuongThucHien: null
      },
      LoaiBenDGTD: null,
      LoaiHinhDGTD: null,
      NguoiLienHe: null,
      MucDichCDLCNRNN: '',
      HoatDongCDLCNRNN: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      SoLuongDuLieu: '',
      DongYChuTheDLCN: false,
      ChuyenDLCNRaNuocNgoai: false,
      ThoiGianBatDau: '',
      ThoiGianKetThuc: '',
      LoaiBienPhapBVDLCN: [],
      LoaiDanhGiaTacDong: [],
      LayYKienDanhGia: false,
      MaHoSoThayDoi: '',
      NoiDungThayDoi: '',
      LyDoThayDoi: ''
    },
    dataFormBieuMauTbvp: {
      DoiTuongThucHien: {
        LoaiDoiTuongThucHien: null
      },
      NguoiLienHe: null,
      ThoiGianViPham: '',
      DiaDiemViPham: '',
      NoiDungViPham: [],
      ToChucCaNhanLienQuan: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      SoLuongDuLieu: '',
      HauQuaXayRa: '',
      BienPhapApDung: '',
      ThongBaoSau72H: false,
      LyDoChamMuon: ''
    },
    dataFormBieuMauTbvpDefault: {
      DoiTuongThucHien: {
        LoaiDoiTuongThucHien: null
      },
      NguoiLienHe: null,
      ThoiGianViPham: '',
      DiaDiemViPham: '',
      NoiDungViPham: [],
      ToChucCaNhanLienQuan: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      SoLuongDuLieu: '',
      HauQuaXayRa: '',
      BienPhapApDung: '',
      ThongBaoSau72H: false,
      LyDoChamMuon: ''
    },
    thanhPhanHoSoXldl: [],
    thanhPhanHoSoCdlcnrnn: [],
    thanhPhanHoSoTbvp: []
  }),
  getters: {
    getDialogConfirm: (state) => state.dialogConfirm,
    getIsShowConfirm: (state) => state.isShowConfirm,
    getBreakpointName: (state) => state.breakpointName,
    getDrawer: (state) => state.drawer,
    getIsSigned: (state) => state.isSigned,
    getUserLogin: (state) => state.userInfo,
    getMenuSelected: (state) => state.menuSelected,
    getThongTinHoSo: (state) => state.thongTinHoSo,
    getDataFormBieuMauXldl: (state) => state.dataFormBieuMauXldl,
    getThanhPhanHoSoXldl: (state) => state.thanhPhanHoSoXldl,
    getDataFormBieuMauCdlcnrnn: (state) => state.dataFormBieuMauCdlcnrnn,
    getThanhPhanHoSoCdlcnrnn: (state) => state.thanhPhanHoSoCdlcnrnn,
    getDataFormBieuMauTbvp: (state) => state.dataFormBieuMauTbvp,
    getThanhPhanHoSoTbvp: (state) => state.thanhPhanHoSoTbvp,
  },
  actions: {
    SET_USERINFO (val) {
      this.userInfo = val
    },
    SET_CONFIG_CONFIRM_DIALOG (val) {
      this.dialogConfirm = val
    },
    SET_SHOWCONFIRM (val) {
      this.isShowConfirm = val
    },
    SET_BREAKPOINTNAME (val) {
      this.breakpointName = val
    },
    SET_DRAWER (val) {
      this.drawer = val
    },
    SET_MENU_SELECTED (val) {
      this.menuSelected = val
    },
    SET_THONGTINHOSO (val) {
      this.thongTinHoSo = val
    },
    SET_DATA_FORM_BIEUMAU_XLDL (val) {
      this.dataFormBieuMauXldl = val
    },
    SET_TPHS_XLDL (val) {
      this.thanhPhanHoSoXldl = val
    },
    SET_DATA_FORM_BIEUMAU_CDL (val) {
      this.dataFormBieuMauCdlcnrnn = val
    },
    SET_TPHS_CDL (val) {
      this.thanhPhanHoSoCdlcnrnn = val
    },
    SET_DATA_FORM_BIEUMAU_TBVP (val) {
      this.dataFormBieuMauTbvp = val
    },
    SET_TPHS_TBVP (val) {
      this.thanhPhanHoSoTbvp = val
    },
    SET_ISSIGNED (val) {
      this.isSigned = val
    }
  },
})
