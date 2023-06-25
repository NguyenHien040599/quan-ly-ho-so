<script setup>
  import $ from 'jquery'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
  import toastr from 'toastr'
  toastr.options = {
    'closeButton': true,
    'timeOut': '5000',
    "positionClass": "toast-top-center"
  }
  const { mobile } = useDisplay()
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const props = defineProps({
    permission: {
      type: Boolean,
      default: false
    }
  })
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const loadingData = ref(false)
  const dialog = ref(false)
  const dialogPreview = ref(false)
  const urlPreview = ref('')
  const tenGiayToKhac = ref('')
  const formGiayToKhac = ref(null)
  const loading = ref(false)
  const thanhPhanHoSo = computed(function () {
    let tp = appStore.thongTinHoSo.ThanhPhanHoSo.filter(function (item) {
      return !item.MaThanhPhanHoSo || (item.MaThanhPhanHoSo && item.MaThanhPhanHoSo.MaMuc.split('_')[0] !== 'BMDT')
    })
    tp.forEach((element, index) => {
      if (element.HinhThucGiayTo['MaMuc'] == 'true') {
        tp[index]['items'] = tp.filter(function (e) {
          let j = e.IDGiayTo.split('-')
          return j[0] == 'GTK' && j[1] == element['IDGiayTo']
        })
      }
    })
    console.log('tp', tp)
    return tp.filter(function (item) {
      return String(item.IDGiayTo).split('-')[0] !== 'GTK'
    })
  })
  const tpUpdate = ref(null)
  const tpUpdateIndex = ref(null)
  const headers = reactive([
    {
      "sortable": false,
      "title": "Tên giấy tờ",
      "align": "left",
      "key": "tenGiayTo",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Tệp đính kèm",
      "align": "left",
      "key": "tepDinhKem",
      "class": "td-left"
    }
  ])
  const headersMobile = reactive([
    {
      "sortable": false,
      "title": "TT",
      "align": "center",
      "key": "index",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Tên giấy tờ",
      "align": "left",
      "key": "tepDinhKem",
      "class": "td-left"
    }
  ])
  const viewFileUpload = function () {
  }
  const downloadFile = function () {

  }
  const dateLocale = function (dateInput) {
		if (!dateInput) return ''
		let date = new Date(dateInput)
		return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
	}
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  const pickFileUpload = function (item, index) {
    // if (item.HinhThucGiayTo['MaMuc'] == 'false') {
      tpUpdate.value = item
      tpUpdateIndex.value = index
      document.getElementById('file_upload_tep_dinh_kem').value = ''
      document.getElementById('file_upload_tep_dinh_kem').click()
    // } else {
    //   tpUpdate.value = item
    //   tpUpdateIndex.value = index
      
    // }
  }
  const validateFile = function (file) {
    console.log('fileUpload', file)
    let getFileType = file.name ? file.name.split('.') : ''
    let fileType = getFileType ? getFileType[getFileType.length - 1] : ''
    let fileTypeAllow = ['png', 'jpg', 'jpeg', 'pdf', 'docx', 'doc', 'xls', 'xlsx', 'txt', 'rtf']
    let fileSizeAllow = 10
    try {
      fileSizeAllow = fileSizeAllowConfig ? fileSizeAllowConfig : 10
    } catch (error) {
    }
    try {
      fileTypeAllow = fileTypeAllowConfig ? fileTypeAllowConfig : ['png', 'jpg', 'jpeg', 'pdf', 'docx', 'doc', 'xls', 'xlsx', 'txt', 'rtf']
    } catch (error) {
    }
    let fileTypeInput = fileTypeAllow ? fileTypeAllow.filter(function (item) {
      return item === String(fileType).toLocaleLowerCase()
    }) : ''
    let validFileUpload = false
    if (fileTypeInput && fileTypeInput.length > 0) {
      if (Number(file.size) <= fileSizeAllow * 1048576) {
        validFileUpload = true
      } else {
        toastr.error('Tài liệu tải lên dung lượng tối đa là ' + fileSizeAllow + ' MB')
        validFileUpload = false
      }
    } else {
      toastr.error('Tài liệu tải lên chỉ chấp nhận các định dạng ' + fileTypeAllow.toString())
      validFileUpload = false
    }
    return validFileUpload
  }
  const uploadFile = function () {
    let file = $('#file_upload_tep_dinh_kem')[0].files[0]
    let valid = validateFile(file)
    if (!valid) {
      return
    }
    if (tpUpdate.value.HinhThucGiayTo['MaMuc'] == 'false') {
      hosoDvcStore.uploadTep(file).then(function(result) {
        appStore.$patch((state) => {
          state.thongTinHoSo['ThanhPhanHoSo'][tpUpdateIndex.value+1]['TepDuLieu'] = result.resp
        })
        // console.log('thongTinHoSo', appStore.thongTinHoSo)
      }).catch(function(error){
      })
    } else {
      showFormGiayToKhac()
    }
  }
  const taiXuongFile = function (file, action) {
    if (loading.value) {
      return
    }
    loading.value = true
    hosoDvcStore.taiTep(file).then(function(result) {
      loading.value = false
      if (action == 'preview') {
        urlPreview.value = result
        dialogPreview.value = true
      } else {
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = result
        a.download = file.TenTep
        a.click()
      }
    }).catch(function(error){
      loading.value = false
    })
  }
  const deleteFileAttack = function (item, index) {
    appStore.$patch((state) => {
      state.thongTinHoSo['ThanhPhanHoSo'][index+1]['TepDuLieu'] = {
        "DinhDangTep": "",
        "DuongDanURL": "",
        "Ext": "unknown",
        "KichThuocTep": 0,
        "MaDinhDanh": "",
        "TenTep": ""
      }
    })
    
  }
  const showFormGiayToKhac = function () {
    tenGiayToKhac.value = ''
    dialog.value = true
  }
  const xoaGiayToKhac = function (item, index) {
    console.log('item', item, index)
    appStore.SET_SHOWCONFIRM(true)
    let confirm = {
      auth: false,
      title: 'Xóa giấy tờ',
      message: 'Bạn có chắc chắn muốn xóa giấy tờ này',
      button: {
        yes: 'Có',
        no: 'Không'
      },
      callback: () => {
        appStore.$patch((state) => {
          state.thongTinHoSo.ThanhPhanHoSo.splice(index + 1, 1)
        })
      }
    }
    appStore.SET_CONFIG_CONFIRM_DIALOG(confirm)
  }
  const deleteGiayToKhac = function (indexChild, indexParent) {
    appStore.SET_SHOWCONFIRM(true)
    let confirm = {
      auth: false,
      title: 'Xóa giấy tờ',
      message: 'Bạn có chắc chắn muốn xóa giấy tờ này',
      button: {
        yes: 'Có',
        no: 'Không'
      },
      callback: () => {
        appStore.$patch((state) => {
          state.thongTinHoSo.ThanhPhanHoSo[indexParent+1]['items'].splice(indexChild, 1)
        })
      }
    }
    appStore.SET_CONFIG_CONFIRM_DIALOG(confirm)
  }
  const submitTaoGiayToKhac = async function () {
    const { valid } = await formGiayToKhac.value.validate()
    if (valid) {
      let file = $('#file_upload_tep_dinh_kem')[0].files[0]
      hosoDvcStore.uploadTep(file).then(function(result) {
        dialog.value = false
        let tphsAdd = {
          "IDGiayTo": 'GTK-' + tpUpdate.value.IDGiayTo,
          "TenGiayTo": tenGiayToKhac.value,
          "SoBanGiay": 0,
          "HinhThucGiayTo": {
            "MaMuc": "",
            "TenMuc": ""
          },
          "NgayBoSung": null,
          "MaThanhPhanHoSo": null,
          "MaGiayToKetQua": null,
          "DaHuyBoThayThe": false,
          "TinhTrangSoHoa": 1,
          "GiayToCaNhanToChuc": {
            "MaDinhDanh": "",
            "TenGiayTo": ""
          },
          "TepDuLieu": result.resp,
          "GiayToLuuTruSo": {
            "MaDinhDanh": "",
            "TenGiayTo": ""
          },
          "DuLieuDienTu": {
            "MaDinhDanh": ""
          }
        }
        appStore.$patch((state) => {
          state.thongTinHoSo.ThanhPhanHoSo.push(tphsAdd)
        })
        console.log('tphsAddthanhPhanHoSo', thanhPhanHoSo.value)
      }).catch(function(error){
        toastr.error('Tải lên giấy tờ thất bại')
      })
      // console.log('appStore.thongTinHoSo', appStore.thongTinHoSo.ThanhPhanHoSo)
      // let hoSo = Object.assign(appStore.thongTinHoSo, {"ThanhPhanHoSo": tphs})
      
      // let filter = {
      //   data: hoSo
      // }
      // hosoDvcStore.capNhatHoSo(filter).then(function(result) {
      //   appStore.SET_THONGTINHOSO(result.resp)
      // }).catch(function(){
      //   alert('Thêm giấy tờ khác thất bại')
      // })
    }
  }
  onMounted(() => {

  })
</script>
<template>
  <v-card class="pa-0 thanhphanhoso" style="box-shadow: none !important;width: 100%;">
    <v-row class="mx-0 my-0" style="border-top: 1px dotted #DADADA; border-left: 1px dotted #DADADA;">
      <v-row v-for="(item, index) in thanhPhanHoSo" :key="item.IDGiayTo" class="mx-0 my-0 px-2 py-2"
        style="width: 100%;border-bottom: 1px dotted #DADADA; border-right: 1px dotted #DADADA;align-items: center;min-height: 42px">
        <div style="font-weight: 600;width: 100%">
          <span>{{ index + 1 }}. </span><span>{{ item.TenGiayTo }}</span> <span style="color:red" v-if="item.HinhThucGiayTo['TenMuc'] == 'true'">(*)</span>
        </div>
        <div class="py-1" @click="taiXuongFile(item.TepDuLieu, 'preview')" v-if="item.TepDuLieu.KichThuocTep" style="width: 100%">
          <v-icon size="18" color="green" v-if="item.TepDuLieu.DinhDangTep === 'xls' || item.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
          <v-icon size="18" color="blue" v-else-if="item.TepDuLieu.DinhDangTep === 'doc' || item.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
          <v-icon size="18" color="red" v-else-if="item.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
          <v-icon size="18" color="blue" v-else-if="item.TepDuLieu.DinhDangTep === 'png' || item.TepDuLieu.DinhDangTep === 'jpg' || item.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
          <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
          <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.TepDuLieu.TenTep}}.{{item.TepDuLieu.Ext}}</a>
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon variant="flat" size="small" v-bind="props" class="mr-0" @click.stop="taiXuongFile(item.TepDuLieu, 'download')">
                <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
              </v-btn>
            </template>
            <span>Tải xuống</span>
          </v-tooltip>
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="deleteFileAttack(item, index)">
                <v-icon size="18" color="red">mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Xóa</span>
          </v-tooltip>
        </div>
        <div v-if="item.HinhThucGiayTo['MaMuc'] == 'true'" style="width: 100%">
          <div v-for="(item2, index2) in item['items']" :key="index2">
            <div style="width: 100%" class="pl-3">
              <span>- </span><span>{{ item2.TenGiayTo }}: </span>
              <span class="py-1" @click="taiXuongFile(item2.TepDuLieu, 'preview')" v-if="item2.TepDuLieu.KichThuocTep">
                <v-icon size="18" color="green" v-if="item2.TepDuLieu.DinhDangTep === 'xls' || item2.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="item2.TepDuLieu.DinhDangTep === 'doc' || item2.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="item2.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="item2.TepDuLieu.DinhDangTep === 'png' || item2.TepDuLieu.DinhDangTep === 'jpg' || item2.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item2.TepDuLieu.TenTep}}.{{item2.TepDuLieu.Ext}}</a>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-0" @click.stop="taiXuongFile(item2.TepDuLieu, 'download')">
                      <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Tải xuống</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="deleteGiayToKhac(index2, index)">
                      <v-icon size="18" color="red">mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>Xóa</span>
                </v-tooltip>
              </span>
            </div>
          </div>
        </div>
        <div style="width: 100%;">
          <v-btn v-if="item.HinhThucGiayTo['MaMuc'] == 'true' || (item.HinhThucGiayTo['MaMuc'] == 'false') && !item.TepDuLieu.KichThuocTep"
            class="mx-0 ml-2 mt-2"
            size="small"
            variant="outlined"
            color="#1E7D30"
            @click.stop="pickFileUpload(item, index )"
            height="28px" width="120px"
          >
            <v-icon size="22" color="#1E7D30" class="mr-2">mdi-cloud-upload-outline</v-icon>
            <span style="font-size: 14px; text-transform: none;">Tải lên tệp</span>
          </v-btn>
        </div>
      </v-row>
    </v-row>
    <input type="file" id="file_upload_tep_dinh_kem" :multiple="false" @input="uploadFile()" style="display:none"/>
  </v-card>
  <v-dialog
    max-width="900"
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-toolbar
        dark
        :color="baseColor" class="px-0"
      >
        <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
          <div class="sub-header-content">
            Tên giấy tờ
          </div>
          <div class="triangle-header"></div>
        </v-col>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="flat" size="small" icon color="#E9FFF2" @click="dialog = false" >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-2 px-3">
        <!-- Content dialog -->
        <v-form
          ref="formGiayToKhac"
          lazy-validation
          class="py-0"
        >
          <v-text-field
            v-model="tenGiayToKhac"
            placeholder="Nhập tên giấy tờ"
            dense
            hide-details="auto"
            class="input-form"
            clearable
            required
            :rules="[v => (v !== '' && v !== null && v !== undefined) || 'Thông tin bắt buộc']"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center pb-3 px-3">
        <v-btn
          size="small" variant="elevated"
          :loading="loading"
          :disabled="loading"
          :color="baseColor"
          prepend-icon="mdi-content-save"
          @click.stop="submitTaoGiayToKhac"
        >
          Đồng ý
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
    max-width="1000"
    v-model="dialogPreview"
    persistent
  >
    <v-card>
      <v-toolbar
        dark
        :color="baseColor" class="px-0"
      >
        <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
          <div class="sub-header-content">
            Tệp tin đính kèm
          </div>
          <div class="triangle-header"></div>
        </v-col>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="flat" size="small" icon color="#E9FFF2" @click="dialogPreview = false" >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="my-0 px-0 py-0">
        <iframe :src="urlPreview" type="application/pdf" width="100%" height="100%" style="overflow: auto;min-height: 600px;" frameborder="0">
        </iframe>
      </v-card-text>

    </v-card>
  </v-dialog>
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
