<script setup>
  import { ref, reactive} from 'vue'
	import { useCrudStore } from '@/stores/formcrud.js'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
	const crud = useCrudStore()
	const props = defineProps({
    mauNhap: {
      type: Object,
      default: {}
    },
    dataInput: {
      type: Object,
      default: {}
    }
  })
	const mauNhapForm = reactive(props.mauNhap)
  const dataInputForm = reactive(props.dataInput)
	const data = ref({})
  const thongTinCaNhan = ref(
    {
      "MaDinhDanh": "",
      "MaSoThue": "",
      "MaBHXH": "",
      "HoVaTen": "",
      "NgaySinh": "",
      "GioiTinh": {
        "MaMuc": "",
        "TenMuc": ""
      },
      "GiayToTuyThan": {
          "SoGiay": "",
          "NgayCap": "",
          "NoiCap": {
            "MaDinhDanh": "",
            "TenGoi": ""
          },
          "LoaiGiayToTuyThan": {
            "MaMuc": "",
            "TenMuc": ""
          }
      },
      "NoiSinh": {
        "TinhThanh": {
          "MaMuc": "string",
          "TenMuc": "string"
        },
        "HuyenQuan": {
          "MaMuc": "string",
          "TenMuc": "string"
        },
        "XaPhuong": {
          "MaMuc": "string",
          "TenMuc": "string"
        }
      },
      "QueQuan": {
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
      "DanToc": {
        "MaMuc": "",
        "TenMuc": ""
      },
      "TonGiao": {
        "MaMuc": "",
        "TenMuc": ""
      },
      "QuocTich": [
        {
          "MaMuc": "",
          "TenMuc": ""
        }
      ],
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
          "@type": "",
          "MaMuc": "",
          "TenMuc": ""
        }
      },
      "NoiOHienTai": {
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
      "DanhBaLienLac": [
        {
          "ThuDienTu": "",
          "SoDienThoai": ""
        }
      ]
    }
  )
  const validForm = ref(false)
  const emit = defineEmits(['submitForm'])
	const submit = function (type) {
		let dataOutput = Object.assign({}, data.value)
		for (let key in mauNhapForm) {
			let itemConfig = mauNhapForm[key]
			if (itemConfig.type == 'date' && dataOutput[itemConfig['name']]) {
				dataOutput[itemConfig['name']] = convertDate(dataOutput[itemConfig['name']])
			}
			if (itemConfig.type == 'money' && dataOutput[itemConfig['name']]) {
				dataOutput[itemConfig['name']] = Number(dataOutput[itemConfig['name']].toString().replace(/\./g, ''))
			}
			if (itemConfig.type == 'select' && dataOutput[itemConfig['name']]) {
				let dataCv = Array.isArray(dataOutput[itemConfig['name']]) ? dataOutput[itemConfig['name']] : [dataOutput[itemConfig['name']]]
				let dataArray = Array.from(dataCv, function (item) {
					let itemGet = {}
					itemGet[itemConfig['itemText']] = item[itemConfig['itemText']]
					itemGet[itemConfig['itemValue']] = item[itemConfig['itemValue']]
					return itemGet
				})
				dataOutput[itemConfig['name']] = dataArray
			}
		}
		// console.log('dataFormOutput-2', dataOutput)
    return dataOutput
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
  const changeDatePicker = (name) => {
    console.log('dateInput', data.value[name])
  }
  const textInputOptions = ref({
    format: 'dd/MM/yyyy'
  })
	const initForm = function (type) {
		for (let key in mauNhapForm) {
			let itemData = mauNhapForm[key]
			if (itemData['type'] === 'select' && itemData.hasOwnProperty('api') && itemData['api'] 
				&& (!mauNhapForm[key]['dataSource'] || mauNhapForm[key]['dataSource'].length == 0)
			) {
				crud.loadDataSource(itemData).then(function(result) {
					let resultData = itemData['responseDataApi'] ? result[itemData['responseDataApi']] : result
					mauNhapForm[key]['dataSource'] = resultData
				}).catch(function(){})
			}
		}
		if (type === 'update' && dataInputForm) {
      
			data.value = Object.assign({}, dataInputForm)
      console.log('dataInputForm', data.value)
			for (let key in data.value) {
				let filter = mauNhapForm.find(function (item) {
					return item.name == key
				})
				if (filter && filter.type === 'date') {
					data.value[key] = dateLocale(data.value[key])
				}
				if (filter && filter.type === 'money') {
					data.value[key] = currency(data.value[key])
				}
				if (filter && filter.type === 'select' && !filter['multiple']) {
					data.value[key] = Array.isArray(data.value[key]) ? data.value[key][0] : data.value[key]
				}
			}
			this.$refs.formCrud.resetValidation()
		} else {
      console.log('mauNhapForm', mauNhapForm)
			this.$refs.formCrud.reset()
			this.$refs.formCrud.resetValidation()
		}
	}
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
    const { valid } = await this.$refs.formCrud.validate()
    return valid
  }
	const goBack = function () {
		window.history.back()
	}

	defineExpose({
		initForm, resetForm, resetFormValidation, validateForm, submit, data
	})
</script>

<template>
  <v-row class="mx-0 my-0">
    <v-col cols="12" md="3" class="py-0 mb-10">
      <div class="text-label">Họ và tên <span style="color: red">(*)</span></div>
      <v-text-field
        class="flex input-form"
        v-model="thongTinCaNhan['TenGoi']"
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
        v-model="thongTinCaNhan['GiayToTuyThan']['SoGiay']"
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
      <v-text-field
        class="flex input-form"
        v-model="thongTinCaNhan['GiayToTuyThan']['NgayCap']"
        solo
        dense
        hide-details="auto"
        clearable
        required
        :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="3" class="py-0 mb-10">
      <div class="text-label">Nơi cấp <span style="color: red">(*)</span></div>
      <v-text-field
        class="flex input-form"
        v-model="thongTinCaNhan['GiayToTuyThan']['NoiCap']['TenGoi']"
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
        v-model="thongTinCaNhan['DiaChiThuongTru']['SoNhaChiTiet']"
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
        v-model="thongTinCaNhan['DiaChiThuongTru']['TinhThanh']"
        :items="[]"
        item-title="TenMuc"
        item-value="MaMuc"
        dense
        solo
        hide-details="auto"
        return-object
        required
        :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="4" class="py-0 mb-10">
      <div class="text-label">Quận/ huyện/ thị xã <span style="color: red">(*)</span></div>
      <v-autocomplete
        class="flex input-form"
        hide-no-data
        v-model="thongTinCaNhan['DiaChiThuongTru']['HuyenQuan']"
        :items="[]"
        item-title="TenMuc"
        item-value="MaMuc"
        dense
        solo
        hide-details="auto"
        return-object
        required
        :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="4" class="py-0 mb-10">
      <div class="text-label">Xã/ phường/ thị trấn  <span style="color: red">(*)</span></div>
      <v-autocomplete
        class="flex input-form"
        hide-no-data
        v-model="thongTinCaNhan['DiaChiThuongTru']['XaPhuong']"
        :items="[]"
        item-title="TenMuc"
        item-value="MaMuc"
        dense
        solo
        hide-details="auto"
        return-object
        required
        :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="4" class="py-0 mb-10">
      <div class="text-label">Số điện thoại <span style="color: red">(*)</span></div>
      <v-text-field
        class="flex input-form"
        v-model="thongTinCaNhan['DanhBaLienLac']['SoDienThoai']"
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
        v-model="thongTinCaNhan['DanhBaLienLac']['ThuDienTu']"
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
        v-model="thongTinCaNhan['NhanSuChiuTrachNhiem']"
        label="Là nhân sự chịu trách nhiệm bảo vệ dữ liệu cá nhân"
        color="#1E7D30"
        :value="true"
        hide-details
      ></v-checkbox>
    </v-col>
  </v-row>
</template>