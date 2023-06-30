<script setup>
  import { ref, reactive, watch} from 'vue'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
	const props = defineProps({
    dataInput: {
      type: Object,
      default: {}
    }
  })
  const hosoDvcStore = useHosoDvcStore()
  const formThongTinCaNhan = ref(null)
  const doiTuongThucHien = reactive(
    {
      "HoVaTen": "",
      "DiaChiThuongTru": {
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
      "GiayToTuyThan": {
        "SoGiay": "",
        "NgayCap": "",
        "NoiCap": ""
      },
      "SoDienThoai": "",
      "ThuDienTu": ""
    }
  )
  const caNhanPhuTrachBVDLCN = reactive(
    {
      "TenGoi": "",
      "ChucDanh": "",
      "SoDienThoai": "",
      "Email": ""
    }
  )
  const isNhanSuChiuTrachNhiem = ref(false)
  const dsTinhThanh = ref([])
  const dsQuanHuyen = ref([])
  const dsXaPhuong = ref([])
  const emit = defineEmits(['submitForm'])
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
    doiTuongThucHien['GiayToTuyThan']['NgayCap'] = dateIsoLocal(data)
  }
  const textInputOptions = ref({
    format: 'dd/MM/yyyy'
  })
	// 
  const initForm = function (type) {
    let filter = {
      maDanhMuc: 'tinhthanh'
    }
    hosoDvcStore.getDanhMucCmon(filter).then(function(result) {
      dsTinhThanh.value = result.content
    }).catch(function(){})
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
	const resetForm = function () {
		this.$refs.formCrud.reset()
		this.$refs.formCrud.resetValidation()
	}
  const resetFormValidation = function () {
		this.$refs.formCrud.resetValidation()
	}
  const validateForm = async function () {
    const { valid } = await formThongTinCaNhan.value.validate()
    return valid
  }
	const goBack = function () {
		window.history.back()
	}

  watch(
    () => doiTuongThucHien.DiaChiThuongTru.TinhThanh,
    (newValue, oldValue) => {
      console.log('newValue', newValue.MaMuc)
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
    () => doiTuongThucHien.DiaChiThuongTru.HuyenQuan,
    (newValue, oldValue) => {
      console.log('newValue', newValue.MaMuc)
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
  watch (
    () => isNhanSuChiuTrachNhiem.value,
    (newValue, oldValue) => {
      if (newValue) {
        caNhanPhuTrachBVDLCN.TenGoi = doiTuongThucHien.HoVaTen
        caNhanPhuTrachBVDLCN.SoDienThoai = doiTuongThucHien.SoDienThoai
        caNhanPhuTrachBVDLCN.Email = doiTuongThucHien.ThuDienTu
      }
    }
  )

	defineExpose({
		initForm, validateForm, doiTuongThucHien, caNhanPhuTrachBVDLCN
	})
</script>

<template>
  <v-form ref="formThongTinCaNhan" lazy-validation class="py-0">
    <v-row class="mx-0 my-0">
      <v-col cols="12" md="3" class="py-0 mb-10">
        <div class="text-label">Họ và tên <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['HoVaTen']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10">
        <div class="text-label">Số CMND/ CCCD/ Hộ chiếu <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['GiayToTuyThan']['SoGiay']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10">
        <div class="text-label">Ngày cấp <span style="color: red">(*)</span></div>
        <VueDatePicker :required="true" class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
          v-model="doiTuongThucHien['GiayToTuyThan']['NgayCap']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
          auto-apply locale="vi" :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
          @update:model-value="changeDatePicker(doiTuongThucHien['GiayToTuyThan']['NgayCap'])"
          >
        </VueDatePicker>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10">
        <div class="text-label">Nơi cấp <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['GiayToTuyThan']['NoiCap']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="py-0 mb-10">
        <div class="text-label">Địa chỉ liên hệ <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          placeholder=""
          v-model="doiTuongThucHien['DiaChiThuongTru']['SoNhaChiTiet']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Tỉnh/ thành phố  <span style="color: red">(*)</span></div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          v-model="doiTuongThucHien['DiaChiThuongTru']['TinhThanh']"
          :items="dsTinhThanh"
          item-title="TenMuc"
          item-value="MaMuc"
          dense
          solo
          hide-details="auto"
          return-object
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined && v.MaMuc !== '') || 'Thông tin bắt buộc']"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Quận/ huyện/ thị xã <span style="color: red">(*)</span></div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          v-model="doiTuongThucHien['DiaChiThuongTru']['HuyenQuan']"
          :items="dsQuanHuyen"
          item-title="TenMuc"
          item-value="MaMuc"
          dense
          solo
          hide-details="auto"
          return-object
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined && v.MaMuc !== '') || 'Thông tin bắt buộc']"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label">Xã/ phường/ thị trấn  <span style="color: red">(*)</span></div>
        <v-autocomplete
          class="flex input-form"
          hide-no-data
          v-model="doiTuongThucHien['DiaChiThuongTru']['XaPhuong']"
          :items="dsXaPhuong"
          item-title="TenMuc"
          item-value="MaMuc"
          dense
          solo
          hide-details="auto"
          return-object
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined && v.MaMuc !== '') || 'Thông tin bắt buộc']"
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
        <div class="text-label">Thư điện tử<span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="doiTuongThucHien['ThuDienTu']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="py-0 mb-10">
        <div class="text-label"></div>
        <v-checkbox
          v-model="isNhanSuChiuTrachNhiem"
          label="Là nhân sự chịu trách nhiệm bảo vệ dữ liệu cá nhân"
          color="#1E7D30"
          :value="true"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="12" class="py-0 mb-10" v-if="isNhanSuChiuTrachNhiem">
        <div class="text-label" style="color: #1E7D30;font-weight: 600;">Nhân sự chịu trách nhiệm bảo vệ dữ liệu cá nhân</div>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10" v-if="isNhanSuChiuTrachNhiem">
        <div class="text-label">Họ và tên <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="caNhanPhuTrachBVDLCN['TenGoi']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10" v-if="isNhanSuChiuTrachNhiem">
        <div class="text-label">Chức danh</div>
        <v-text-field
          class="flex input-form"
          v-model="caNhanPhuTrachBVDLCN['ChucDanh']"
          solo
          dense
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10" v-if="isNhanSuChiuTrachNhiem">
        <div class="text-label">Số điện thoại</div>
        <v-text-field
          class="flex input-form"
          v-model="caNhanPhuTrachBVDLCN['SoDienThoai']"
          solo
          dense
          hide-details="auto"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" class="py-0 mb-10" v-if="isNhanSuChiuTrachNhiem">
        <div class="text-label">Thư điện tử  <span style="color: red">(*)</span></div>
        <v-text-field
          class="flex input-form"
          v-model="caNhanPhuTrachBVDLCN['Email']"
          solo
          dense
          hide-details="auto"
          clearable
          required
          :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>