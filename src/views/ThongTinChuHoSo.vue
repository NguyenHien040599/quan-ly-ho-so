<script setup>
  import { ref, reactive, computed, watch} from 'vue'
  import { useAppStore } from '@/stores/global.js'
	import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

	const props = defineProps({
    dataInput: {
      type: Object,
      default: {}
    },
    action: {
      type: String,
      default: ''
    },
    thuTuc: {
      type: String,
      default: ''
    }
  })
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const dataFormBieuMauXLDL = computed(() => appStore.dataFormBieuMauXldl)
  const dataFormBieuMauTBVP = computed(() => appStore.dataFormBieuMauTBVP)
  const thongTinNguoiDung = computed(() => appStore.userInfo)
  const doiTuongThucHien = reactive(
    {
      "LoaiDoiTuongThucHien": null,
      "MaDinhDanh": "",
      "TenGoi": "",
      "GiayChungNhan": {
        "SoGiay": "",
        "NgayCap": "",
        "NoiCap": ""
      },
      "DiaChiHoatDong": {
        "SoNhaChiTiet": "",
        "TinhThanh": {
          "MaMuc": "",
          "TenMuc": ""
        },
        "HuyenQuan": {
          "MaMuc": "",
          "TenMuc": ""
        },
        "XaPhuong": {
          "MaMuc": "",
          "TenMuc": ""
        }
      },
      "DiaChiLienHe": {
        "SoNhaChiTiet": "",
        "TinhThanh": {
          "MaMuc": "",
          "TenMuc": ""
        },
        "HuyenQuan": {
          "MaMuc": "",
          "TenMuc": ""
        },
        "XaPhuong": {
          "MaMuc": "",
          "TenMuc": ""
        }
      },
      "SoDienThoai": "",
      "Website": "",
      "Email": ""
    }
  )
  if (props.action === 'create' && thongTinNguoiDung.value.LoaiDoiTuong && thongTinNguoiDung.value.LoaiDoiTuong === 'CaNhan') {
    doiTuongThucHien.MaDinhDanh = thongTinNguoiDung.value.MaDinhDanh
    doiTuongThucHien.TenGoi = thongTinNguoiDung.value.HoVaTen
    try {
      doiTuongThucHien.GiayChungNhan = {
        SoGiay: thongTinNguoiDung.value.GiayToTuyThan[0]['SoGiay'],
        NgayCap: thongTinNguoiDung.value.GiayToTuyThan[0]['NgayCap'],
        NoiCap: thongTinNguoiDung.value.GiayToTuyThan[0]['NoiCap'] ? thongTinNguoiDung.value.GiayToTuyThan[0]['NoiCap']['TenGoi'] : ''
      }
    } catch (error) {
    }
    try {
      doiTuongThucHien.SoDienThoai = thongTinNguoiDung.value.DanhBaLienLac[0]['SoDienThoai']
      doiTuongThucHien.Email = thongTinNguoiDung.value.DanhBaLienLac[0]['ThuDienTu']
    } catch (error) {
    }
    doiTuongThucHien.DiaChiHoatDong = thongTinNguoiDung.value.DiaChiThuongTru
  }
  if (props.action === 'create' && thongTinNguoiDung.value.LoaiDoiTuong && thongTinNguoiDung.value.LoaiDoiTuong === 'DonViKinhDoanh') {
    doiTuongThucHien.MaDinhDanh = thongTinNguoiDung.value.MaDinhDanh
    doiTuongThucHien.TenGoi = thongTinNguoiDung.value.TenGoi
    try {
      if (thongTinNguoiDung.value.GiayDangKyKinhDoanh) {
        doiTuongThucHien.GiayChungNhan = {
          SoGiay: thongTinNguoiDung.value.GiayDangKyKinhDoanh['SoGiay'],
          NgayCap: thongTinNguoiDung.value.GiayDangKyKinhDoanh['NgayCap'] ? thongTinNguoiDung.value.GiayDangKyKinhDoanh['NgayCap'] : '',
          NoiCap: thongTinNguoiDung.value.GiayDangKyKinhDoanh['NoiCap'] ? thongTinNguoiDung.value.GiayDangKyKinhDoanh['NoiCap']['TenGoi'] : ''
        }
      } else {
        doiTuongThucHien.GiayChungNhan['SoGiay'] = thongTinNguoiDung.value.MaDinhDanh
      }
    } catch (error) {
    }
    try {
      doiTuongThucHien.SoDienThoai = thongTinNguoiDung.value.DanhBaLienLac[0]['SoDienThoai']
      doiTuongThucHien.Email = thongTinNguoiDung.value.DanhBaLienLac[0]['ThuDienTu']
    } catch (error) {
    }
    doiTuongThucHien.DiaChiHoatDong = thongTinNguoiDung.value.DiaChiHoatDong
  }
  if (props.action === 'create' && thongTinNguoiDung.value.LoaiDoiTuong && thongTinNguoiDung.value.LoaiDoiTuong === 'CoQuanDonvi') {
    doiTuongThucHien.MaDinhDanh = thongTinNguoiDung.value.MaDinhDanh
    doiTuongThucHien.TenGoi = thongTinNguoiDung.value.TenGoi
    try {
      doiTuongThucHien.GiayChungNhan = {
        SoGiay: thongTinNguoiDung.value.SoQuyetDinh,
        NgayCap: thongTinNguoiDung.value.NgayThanhLap,
        NoiCap: thongTinNguoiDung.value.CoQuanThanhLap && thongTinNguoiDung.value.CoQuanThanhLap['TenGoi'] ? thongTinNguoiDung.value.CoQuanThanhLap['TenGoi'] : ''
      }
    } catch (error) {
    }
    try {
      doiTuongThucHien.SoDienThoai = thongTinNguoiDung.value.DanhBaLienLac[0]['SoDienThoai']
      doiTuongThucHien.Email = thongTinNguoiDung.value.DanhBaLienLac[0]['ThuDienTu']
    } catch (error) {
    }
    doiTuongThucHien.DiaChiHoatDong = thongTinNguoiDung.value.DiaChiHoatDong
  }
  const nguoiLienHe = reactive(
    {
      "HoVaTen": "",
      "ChucDanh": "",
      "SoDienThoai": "",
      "Email": ""
    }
  )
  if ((props.action === 'update' || props.action === 'hosothaydoi') && (dataFormBieuMauXLDL.value || dataFormBieuMauTBVP.value)) {
    let dataBmDoiTuong = props.thuTuc == 'xldl' ? dataFormBieuMauXLDL.value['DoiTuongThucHien'] : dataFormBieuMauTBVP.value['DoiTuongThucHien']
    let dataBmNguoiLienHe = props.thuTuc == 'xldl' ? dataFormBieuMauXLDL.value['NguoiLienHe'] : dataFormBieuMauTBVP.value['NguoiLienHe']
    doiTuongThucHien.LoaiDoiTuongThucHien = dataBmDoiTuong.LoaiDoiTuongThucHien
    doiTuongThucHien.MaDinhDanh = dataBmDoiTuong.MaDinhDanh
    doiTuongThucHien.TenGoi = dataBmDoiTuong.TenGoi
    doiTuongThucHien.GiayChungNhan = dataBmDoiTuong.GiayChungNhan
    doiTuongThucHien.DiaChiHoatDong = dataBmDoiTuong.DiaChiHoatDong
    doiTuongThucHien.DiaChiLienHe =  dataBmDoiTuong.DiaChiLienHe
    doiTuongThucHien.SoDienThoai = dataBmDoiTuong.SoDienThoai
    doiTuongThucHien.Email = dataBmDoiTuong.Email
    doiTuongThucHien.Website = dataBmDoiTuong.Website

    nguoiLienHe.HoVaTen = dataBmNguoiLienHe ? dataBmNguoiLienHe.HoVaTen : ''
    nguoiLienHe.ChucDanh = dataBmNguoiLienHe ? dataBmNguoiLienHe.ChucDanh : ''
    nguoiLienHe.SoDienThoai = dataBmNguoiLienHe ? dataBmNguoiLienHe.SoDienThoai : ''
    nguoiLienHe.Email = dataBmNguoiLienHe ? dataBmNguoiLienHe.Email : ''
  }
  const dsLoaiDoiTuongThucHien = ref([])
  const dsTinhThanh = ref([])
  const dsQuanHuyen = ref([])
  const dsXaPhuong = ref([])
  const dsQuanHuyenGiaoDich = ref([])
  const dsXaPhuongGiaoDich = ref([])
  const formThongTinDoanhNghiepToChuc = ref(null)
  const emit = defineEmits(['submitForm'])
  // 
  // console.log('action', props.action)
  // console.log('thongTinNguoiDung', thongTinNguoiDung.value)
  // console.log('doiTuongThucHien', doiTuongThucHien)
  const initForm = function (type) {
    let filter = {
      maDanhMuc: 'tinhthanh'
    }
    hosoDvcStore.getDanhMucCmon(filter).then(function(result) {
      dsTinhThanh.value = result.content
    }).catch(function(){})

    let filter2 = {
      maDanhMuc: 'loaidoituongthuchien'
    }
    hosoDvcStore.getDanhMuc(filter2).then(function(result) {
      dsLoaiDoiTuongThucHien.value = result.content
    }).catch(function(){
      dsLoaiDoiTuongThucHien.value = []
    })
	}
	initForm()
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
  const validateForm = async function () {
    const { valid } = await formThongTinDoanhNghiepToChuc.value.validate()
    return valid
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
  const changeDatePicker = (data) => {
    doiTuongThucHien['GiayChungNhan']['NgayCap'] = dateIsoLocal(data)
  }
  const textInputOptions = ref({
    format: 'dd/MM/yyyy'
  })
	const translateDate = function (date) {
		if (!date) return null
		const [day, month, year] = date.split('/')
		return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
	}
	const dateLocale = function (dateInput) {
		if (!dateInput) return ''
		let date = new Date(dateInput)
		return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
	}
	const convertDate = function (date) {
		if (!date) return ''
		const [day, month, year] = date.split('/')
		let ddd = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		return (new Date(ddd)).getTime()
	}
  // 
  watch(
    () => doiTuongThucHien && doiTuongThucHien.DiaChiHoatDong.TinhThanh,
    (newValue, oldValue) => {
      if (newValue.MaMuc) {
        let filter = {
          maDanhMuc: 'huyenquan',
          params: {
            thamChieu_maMuc: newValue.MaMuc
          }
        }
        hosoDvcStore.getDanhMucCmon(filter).then(function(result) {
          dsQuanHuyen.value = result.content
        }).catch(function(){})
      } else {
        dsQuanHuyen.value = []
      }
    },
    { deep: true }
  )
  watch(
    () => doiTuongThucHien && doiTuongThucHien.DiaChiHoatDong.HuyenQuan,
    (newValue, oldValue) => {
      if (newValue.MaMuc) {
        let filter = {
          maDanhMuc: 'xaphuong',
          params: {
            thamChieu_maMuc: newValue.MaMuc
          }
        }
        hosoDvcStore.getDanhMucCmon(filter).then(function(result) {
          dsXaPhuong.value = result.content
        }).catch(function(){})
      } else {
        dsXaPhuong.value = []
      }
    },
    { deep: true }
  )
  watch(
    () => doiTuongThucHien && doiTuongThucHien.DiaChiLienHe.TinhThanh,
    (newValue, oldValue) => {
      if (newValue.MaMuc) {
        let filter = {
          maDanhMuc: 'huyenquan',
          params: {
            thamChieu_maMuc: newValue.MaMuc
          }
        }
        hosoDvcStore.getDanhMucCmon(filter).then(function(result) {
          dsQuanHuyenGiaoDich.value = result.content
        }).catch(function(){})
      } else {
        dsQuanHuyenGiaoDich.value = []
      }
    },
    { deep: true }
  )
  watch(
    () => doiTuongThucHien && doiTuongThucHien.DiaChiLienHe.HuyenQuan,
    (newValue, oldValue) => {
      if (newValue.MaMuc) {
        let filter = {
          maDanhMuc: 'xaphuong',
          params: {
            thamChieu_maMuc: newValue.MaMuc
          }
        }
        hosoDvcStore.getDanhMucCmon(filter).then(function(result) {
          dsXaPhuongGiaoDich.value = result.content
        }).catch(function(){})
      } else {
        dsXaPhuongGiaoDich.value = []
      }
    },
    { deep: true }
  )
  
  // 
	defineExpose({
		initForm, doiTuongThucHien, nguoiLienHe, validateForm
	})
</script>

<template>
  <v-form ref="formThongTinDoanhNghiepToChuc" lazy-validation class="py-0">
    <v-row class="mx-0 my-0">
      <v-col cols="12" class="py-0">
        <div class="text-label">Chọn đối tượng thực hiện <span style="color: red">(*)</span></div>
        <v-radio-group v-model="doiTuongThucHien['LoaiDoiTuongThucHien']" inline>
          <v-radio v-for="(item, index) in dsLoaiDoiTuongThucHien" :key="index" class="v-col-12 v-col-md-6 px-0 py-0"
          :label="item['TenMuc']" :value="item" color="#1E7D30"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" class="py-0 mb-10">
        <div class="text-label">Tên gọi của cá nhân, tổ chức nộp hồ sơ <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['TenGoi']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-0 mb-10">
        <div class="text-label" style="color: #1E7D30;font-weight: 600;">Giấy chứng nhận cá nhân, tổ chức</div>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Số giấy <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form madinhdanh-input"
          v-model="doiTuongThucHien['GiayChungNhan']['SoGiay']"
          solo
          dense
          hide-details="auto"
          readonly
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Ngày cấp <span style="color: red">(*)</span></div>
        <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
          v-model="doiTuongThucHien['GiayChungNhan']['NgayCap']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
          auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
          @update:model-value="changeDatePicker(doiTuongThucHien['GiayChungNhan']['NgayCap'])"
          >
        </VueDatePicker>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Nơi cấp <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['GiayChungNhan']['NoiCap']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-0 mb-10">
        <div class="text-label">Địa chỉ trụ sở chính / Địa chỉ đăng ký thường trú  <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          placeholder=""
          v-model="doiTuongThucHien['DiaChiHoatDong']['SoNhaChiTiet']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-row class="mx-0 my-0" v-if="!doiTuongThucHien['LoaiDoiTuongThucHien'] || (doiTuongThucHien['LoaiDoiTuongThucHien'] && doiTuongThucHien['LoaiDoiTuongThucHien']['MaMuc'] !== '02'
        && doiTuongThucHien['LoaiDoiTuongThucHien']['MaMuc'] !== '03' && doiTuongThucHien['LoaiDoiTuongThucHien']['MaMuc'] !== '08')">
        <v-col cols="12" md="4" class="py-0 mb-10">
          <div class="text-label">Tỉnh/ thành phố  <span style="color: red">(*)</span></div>
          <v-autocomplete
            class="flex input-form"
            hide-no-data
            v-model="doiTuongThucHien['DiaChiHoatDong']['TinhThanh']"
            :items="dsTinhThanh"
            item-title="TenMuc"
            item-value="MaMuc"
            dense
            solo
            hide-details="auto"
            return-object
            required
            :rules="[v => (v !== '' && v !== null && v !== undefined && (v && v.MaMuc !== '')) || 'Thông tin bắt buộc']"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" class="py-0 mb-10">
          <div class="text-label">Quận/ huyện/ thị xã <span style="color: red">(*)</span></div>
          <v-autocomplete
            class="flex input-form"
            hide-no-data
            v-model="doiTuongThucHien['DiaChiHoatDong']['HuyenQuan']"
            :items="dsQuanHuyen"
            item-title="TenMuc"
            item-value="MaMuc"
            dense
            solo
            hide-details="auto"
            return-object
            required
            :rules="[v => (v !== '' && v !== null && v !== undefined && (v && v.MaMuc !== '')) || 'Thông tin bắt buộc']"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" class="py-0 mb-10">
          <div class="text-label">Xã/phường/thị trấn  <span style="color: red">(*)</span></div>
          <v-autocomplete
            class="flex input-form"
            hide-no-data
            v-model="doiTuongThucHien['DiaChiHoatDong']['XaPhuong']"
            :items="dsXaPhuong"
            item-title="TenMuc"
            item-value="MaMuc"
            dense
            solo
            hide-details="auto"
            return-object
            required
            :rules="[v => (v !== '' && v !== null && v !== undefined && (v && v.MaMuc !== '')) || 'Thông tin bắt buộc']"
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-col cols="12" class="py-0 mb-10">
        <div class="text-label">Địa chỉ trụ sở giao dịch / Địa chỉ nơi ở hiện nay</div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['DiaChiLienHe']['SoNhaChiTiet']"
          solo
          dense
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Tỉnh/ thành phố </div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          v-model="doiTuongThucHien['DiaChiLienHe']['TinhThanh']"
          :items="dsTinhThanh"
          item-title="TenMuc"
          item-value="MaMuc"
          dense
          solo
          hide-details="auto"
          return-object
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Quận/ huyện/ thị xã </div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          v-model="doiTuongThucHien['DiaChiLienHe']['HuyenQuan']"
          :items="dsQuanHuyenGiaoDich"
          item-title="TenMuc"
          item-value="MaMuc"
          dense
          solo
          hide-details="auto"
          return-object
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Xã/phường/thị trấn </div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          v-model="doiTuongThucHien['DiaChiLienHe']['XaPhuong']"
          :items="dsXaPhuongGiaoDich"
          item-title="TenMuc"
          item-value="MaMuc"
          dense
          solo
          hide-details="auto"
          return-object
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Số điện thoại <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['SoDienThoai']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Email</div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['Email']"
          solo
          dense
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Địa chỉ website</div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['Website']"
          solo
          dense
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
      <v-row class="mx-0 my-0" v-if="doiTuongThucHien['LoaiDoiTuongThucHien'] && doiTuongThucHien['LoaiDoiTuongThucHien']['MaMuc'] !== '01'
      && doiTuongThucHien['LoaiDoiTuongThucHien']['MaMuc'] !== '02' && doiTuongThucHien['LoaiDoiTuongThucHien']['MaMuc'] !== '03'">
        <v-col cols="12" class="py-0 mb-10 mt-2">
          <div class="text-label" style="color: #1E7D30;font-weight: 600;">Thông tin cá nhân phụ trách/ người liên hệ</div>
        </v-col>
        <v-col cols="12" md="3" class="py-0 mb-10">
          <div class="text-label">Họ và tên <span style="color: red">(*)</span></div>
          <v-text-field
            class="flex input-form"
            v-model="nguoiLienHe['HoVaTen']"
            solo
            dense
            hide-details="auto"
            clearable
            required
            :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="py-0 mb-10">
          <div class="text-label">Chức danh</div>
          <v-text-field
            class="flex input-form"
            v-model="nguoiLienHe['ChucDanh']"
            solo
            dense
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="py-0 mb-10">
          <div class="text-label">Số điện thoại</div>
          <v-text-field
            class="flex input-form"
            v-model="nguoiLienHe['SoDienThoai']"
            solo
            dense
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="py-0 mb-10">
          <div class="text-label">Thư điện tử  <span style="color: red">(*)</span></div>
          <v-text-field
            class="flex input-form"
            v-model="nguoiLienHe['Email']"
            solo
            dense
            hide-details="auto"
            clearable
            required
            :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-row>
  </v-form>
</template>