
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
      loaiDoiTuongThucHien: 'T_DonViKinhDoanh',

      DoiTuongThucHien: null,
      LoaiDoiTuongBVDLCN: null,
      CaNhanPhuTrachBVDLCN: null,
      MucDichXLDLCN: '',
      HoatDongXLDLCN: '',
      LoaiDLCNCoBan: [],
      LoaiDLCNNhayCam: [],
      DongYChuTheDLCN: false,
      ChuyenDLCNRaNuocNgoai: false,
      ThoiGianXuLy: '',
      ThoiGianHuyXoa: '',
      LoaiBienPhapBVDLCN: [],
      LoaiDanhGiaTacDong: [],
      LayYKienDanhGia: false,
      MaHoSoThayDoi: '',
      NoiDungThayDoi: '',
      LyDoThayDoi: ''
    },
    thanhPhanHoSoXldl: []
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
    getThanhPhanHoSoXldl: (state) => state.thanhPhanHoSoXldl
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
    SET_ISSIGNED (val) {
      this.isSigned = val
    }
  },
})
