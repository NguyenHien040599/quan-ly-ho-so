<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import jsondata from '../stores/mock-data.json'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const ThongTinDoanhNghiepToChuc = defineAsyncComponent(() =>
    import('./ThongTinDoanhNghiepToChuc.vue')
  )
  const ThongTinCaNhan = defineAsyncComponent(() =>
    import('./ThongTinCaNhan.vue')
  )
  const TableSelect = defineAsyncComponent(() =>
    import('./TableSelect.vue')
  )
  const TepTinDinhKem = defineAsyncComponent(() =>
    import('./TepTinDinhKem.vue')
  )
  const ThongTinBieuMau = defineAsyncComponent(() =>
    import('./ThongTinBieuMau.vue')
  )
  const router = useRouter()
  console.log('routes', router.currentRoute.value)
  const props = defineProps({
    dataInput: {
      type: Object,
      default: {}
    }
  })
  const dataInputForm = reactive(props.dataInput)
	const dataForm = ref({
    loaiDoiTuongThucHien: 'business'
  })
  
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const { cookies } = useCookies()
  const dossierName = ref('Đánh giá tác động chuyển dữ liệu cá nhân ra nước ngoài')
  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)
  const tab = ref(null)
  const thongTinHoSo = reactive(jsondata.thongTinHoSo)
  const changeDatePicker = (name) => {
    console.log('dateInput', dataForm[name])
  }
  const eventClick = function () {
    console.log('run callback')
  }
  const action = function () {
    loading.value = true
    setTimeout(function () {
      loading.value = false
    }, 300)
  }
  const showConfirm = function () {
    appStore.SET_SHOWCONFIRM(true)
    let confirm = {
      auth: false,
      title: 'Xóa sinh viên',
      message: 'Bạn có chắc chắn muốn xóa',
      button: {
        yes: 'Có',
        no: 'Không'
      },
      callback: () => {
        console.log("Tôi đồng ý")
      }
    }
    appStore.SET_CONFIG_CONFIRM_DIALOG(confirm)
  }
  const changeTab = function (currentTab) {
    tab.value = currentTab
    document.getElementById("top-menu").scrollIntoView()
    // $('html, body').animate({
    //   scrollTop: $("#top-menu").offset().top
    // }, 500);
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
  const convertDataView = function (itemHeader, item) {
    let output = ''
    try {
      let calu = itemHeader['calculator'].replace(/dataInput/g, 'item')
      output = eval(calu)
    } catch (error) {
      output = ''
    }
    return output
  }
  const convertDataArray = function (itemHeader, array) {
    let output = ''
    if (array) {
      output = Array.from(array, function (item) {
        return item[itemHeader['mapping']]
      })
    }
    output = output.toString().replace(/,/g, ', ')
    return output
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
  onMounted(() => {

  })
</script>
<template>
  
  <v-card class="mx-auto pa-0 biemau" style="box-shadow: none !important; overflow: inherit;">
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
      v-model="tab"
      bg-color="#00000000"
      :hide-slider="true"
    >
      <v-tab :hide-slider="true" disabled value="nhapdon" id="top-menu">
        <span style="font-size: 18px;">1.</span> Nhập đơn, thông báo
      </v-tab>
      <v-tab :hide-slider="true" disabled value="noidung"><span style="font-size: 18px;">2.</span> Nội dung đánh giá</v-tab>
      <v-tab :hide-slider="true" disabled value="dinhkem"><span style="font-size: 18px;">3.</span> Tệp tin đính kèm</v-tab>
      <v-tab :hide-slider="true" disabled value="xemlai"><span style="font-size: 18px;">4.</span> Xem lại hồ sơ trước khi nộp</v-tab>
    </v-tabs>

    <v-card-text class="px-0 py-0">
      <v-window v-model="tab" >
        <v-window-item :transition="false" value="nhapdon" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;padding-left: 5px;">
          <v-row class="thongtinchung mx-0 my-0">
            <v-col cols="12" md="4" class="py-0">
              <div class="text-label">Chọn đối tượng thực hiện <span style="color: red">(*)</span></div>
              <v-radio-group v-model="dataForm['loaiDoiTuongThucHien']">
                <v-radio label="Cá nhân" value="citizen" color="#1E7D30"></v-radio>
                <v-radio label="Doanh nghiệp" value="business" color="#1E7D30"></v-radio>
                <v-radio label="Cơ quan nhà nước" value="organization" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="4" class="py-0">
              <div class="text-label">Đối tượng bảo vệ DLCN <span style="color: red">(*)</span></div>
              <v-radio-group v-model="dataForm['loaiDoiTuongBaoVeDLCN']">
                <v-radio label="Bên kiểm soát dữ liệu cá nhân" value="ks" color="#1E7D30"></v-radio>
                <v-radio label="Bên kiểm soát và xử lý dữ liệu cá nhân" value="ksxl" color="#1E7D30"></v-radio>
                <v-radio label="Bên xử lý dữ liệu cá nhân" value="xl" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="mx-0 my-0" v-if="dataForm['loaiDoiTuongThucHien'] !== 'citizen'">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">THÔNG TIN TỔ CHỨC, DOANH NGHIỆP ĐÁNH GIÁ TÁC ĐỘNG XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <ThongTinDoanhNghiepToChuc></ThongTinDoanhNghiepToChuc>
          </v-row>
          <v-row class="mx-0 my-0" v-else>
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">THÔNG TIN CÁ NHÂN ĐÁNH GIÁ TÁC ĐỘNG XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <ThongTinCaNhan></ThongTinCaNhan>
          </v-row>
          <v-row class="mx-0 my-2" justify="center">
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="changeTab('noidung')"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Tiếp tục</span>
            </v-btn>
          </v-row>
        </v-window-item>

        <v-window-item :transition="false" value="noidung" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;padding-left: 5px;">
          <v-row class="mx-0 my-0">
            <v-col cols="12" class="sub-header d-flex align-center justify-start py-0 mb-3">
              <div class="sub-header-content">
                <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
              </div>
              <div class="triangle-header"></div>
              <div class="text-sub-header">TÓM TẮT NỘI DUNG ĐÁNH GIÁ TÁC ĐỘNG XỬ LÝ DỮ LIỆU CÁ NHÂN</div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Tên nhiệm vụ xử lý dữ liệu cá nhân <span style="color: red">(*)</span></div>
              <v-text-field
                class="flex input-form"
                v-model="dataForm['TenDuAnDanhGia']"
                solo
                dense
                hide-details="auto"
                clearable
                required
                :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0 mb-10" v-if="dataForm['loaiDoiTuongBaoVeDLCN'] == 'ks' || dataForm['loaiDoiTuongBaoVeDLCN'] == 'ksxl'">
              <div class="text-label">Điều kiện cho phép việc thu thập, xử lý dữ liệu cá nhân <span style="color: red">(*)</span></div>
              <v-autocomplete
                class="flex input-form"
                hide-no-data
                v-model="dataForm['DieuKienXuLyDLCN']"
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
            <v-col cols="12" class="py-0 mb-10" v-if="dataForm['loaiDoiTuongBaoVeDLCN'] == 'xl'">
              <div class="text-label">Mô tả mục đích, hoạt động xử lý dữ liệu cá nhân</div>
              <v-textarea
                class="flex input-form"
                rows="3"
                v-model="dataForm['MucDichHoatDong']"
                solo
                dense
                hide-details="auto"
                clearable
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Phạm vi xử lý các loại dữ liệu cá nhân cơ bản <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect :apiSource="1" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại dữ liệu cá nhân cơ bản',key: 'TenMuc' }]" 
              :dataItems="[{MaMuc:'1',TenMuc:'Hình ảnh của cá nhân'},{MaMuc:'2',TenMuc:'Số điện thoại'}]" :selected="[]"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Phạm vi xử lý các loại dữ liệu cá nhân nhạy cảm <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect :apiSource="1" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại dữ liệu cá nhân nhạy cảm',key: 'TenMuc' }]" 
              :dataItems="[{MaMuc:'1',TenMuc:'Quan điểm chính trị, quan điểm tôn giáo'},{MaMuc:'2',TenMuc:'Tình trạng sức khỏe, đời tư'}]" :selected="[]"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Trường hợp chuyển dữ liệu cá nhân ra nước ngoài</div>
              <v-radio-group inline v-model="dataForm['ChuyenRaNuocNgoai']" hide-details>
                <v-radio label="Có" :value="true" color="#1E7D30" class="mr-3"></v-radio>
                <v-radio label="Không" :value="false" color="#1E7D30"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian xử lý <span style="color: red">(*)</span></div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataForm['ThoiGianXuLy']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                @blur="changeDatePicker('ThoiGianXuLy')"
                >
                </VueDatePicker>
            </v-col>
            <v-col cols="12" md="6" class="py-0 mb-10">
              <div class="text-label">Thời gian xóa/hủy dữ liệu (nếu có)</div>
              <VueDatePicker class="flex" position="left" select-text="Chọn" cancel-text="Thoát"
                v-model="dataForm['ThoiGianHuyXoa']" text-input :format="formatDatePicker" placeholder="dd/mm/yyyy" :text-input-options="textInputOptions"
                @blur="changeDatePicker('ThoiGianHuyXoa')"
                >
                </VueDatePicker>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Biện pháp bảo vệ dữ liệu cá nhân được áp dụng <span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect :apiSource="1" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại biện pháp áp dụng',key: 'TenMuc' }]" 
              :dataItems="[{MaMuc:'1',TenMuc:'Xây dựng biện pháp, ban hành'},{MaMuc:'2',TenMuc:'Thông báo cho chủ thể'}]" :selected="[]"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label">Nguy cơ rủi ro, thiệt hại có thể xảy ra<span style="color: red">(*)</span></div>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <TableSelect :apiSource="1" :headers="[{type: 'select',sortable: false,title: 'Chọn', key: 'selected',class: 'selected' },{sortable: false,title: 'Loại rủi do, thiệt hại',key: 'TenMuc' }]" 
              :dataItems="[{MaMuc:'1',TenMuc:'Xây dựng biện pháp, ban hành'},{MaMuc:'2',TenMuc:'Thông báo cho chủ thể'}]" :selected="[]"></TableSelect>
            </v-col>
            <v-col cols="12" class="py-0 mb-10">
              <div class="text-label" style="font-weight: 600">CAM KẾT:<span style="color: red">(*)</span></div>
              <v-checkbox
                v-model="dataForm['CamKet']"
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
              @click.stop="changeTab('nhapdon')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="changeTab('dinhkem')"
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
              @click.stop="changeTab('noidung')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop="changeTab('xemlai')"
              height="32px" width="130px"
            >
              <v-icon size="20" color="#ffffff" class="mr-2">mdi-page-next-outline</v-icon>
              <span style="font-size: 16px">Tiếp tục</span>
            </v-btn>
          </v-row>
        </v-window-item>
        <v-window-item :transition="false" value="xemlai" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px;margin-top: -5px">
          <ThongTinBieuMau></ThongTinBieuMau>
          <v-row class="mx-0 my-2" justify="center">
            <v-btn
              class="mr-3"
              size="small"
              variant="outlined"
              color="#1E7D30"
              @click.stop="changeTab('dinhkem')"
              height="32px" width="150px"
            >
              <v-icon size="22" color="#1E7D30" class="mr-2">mdi-reply-all-outline</v-icon>
              <span style="font-size: 16px; text-transform: none;">Bước trước</span>
            </v-btn>
            <v-btn
              size="small"
              color="#1E7D30"
              class="mx-0"
              @click.stop=""
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
  .title-ten-ho-so {
    text-transform: uppercase;
    font-size: 18px;
    color: #1E7D30;
    font-weight: 700;
  }
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
