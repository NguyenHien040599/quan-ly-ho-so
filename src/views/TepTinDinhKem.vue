<script setup>
  import $ from 'jquery'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
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
    return appStore.thongTinHoSo.ThanhPhanHoSo.filter(function (item) {
      return !item.MaThanhPhanHoSo || (item.MaThanhPhanHoSo && item.MaThanhPhanHoSo.MaMuc.split('_')[0] !== 'BMDT')
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
    tpUpdate.value = item
    tpUpdateIndex.value = index
    document.getElementById('file_upload_tep_dinh_kem').value = ''
    document.getElementById('file_upload_tep_dinh_kem').click()
  }
  const uploadFile = function () {
    let file = $('#file_upload_tep_dinh_kem')[0].files[0]
    hosoDvcStore.uploadTep(file).then(function(result) {
      // appStore.thongTinHoSo.ThanhPhanHoSo.forEach((element, index) => {
      //   if (element.MaThanhPhanHoSo.MaMuc === tpUpdate.value.MaThanhPhanHoSo.MaMuc) {
      //     appStore.$patch((state) => {
      //       state.thongTinHoSo['ThanhPhanHoSo'][index]['TepDuLieu'] = result.resp
      //     })
      //   }
      // })
      appStore.$patch((state) => {
        state.thongTinHoSo['ThanhPhanHoSo'][tpUpdateIndex.value+1]['TepDuLieu'] = result.resp
      })
      console.log('thongTinHoSo', appStore.thongTinHoSo)
    }).catch(function(error){
      console.log(error)
    })
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
  const submitTaoGiayToKhac = async function () {
    const { valid } = await formGiayToKhac.value.validate()
    if (valid) {
      
      let tphsAdd = {
        "IDGiayTo": "",
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
        "TepDuLieu": {
          "MaDinhDanh": "",
          "TenTep": "",
          "DinhDangTep": "",
          "KichThuocTep": 0,
          "DuongDanURL": "",
          "Ext": ""
        },
        "GiayToLuuTruSo": {
          "MaDinhDanh": "",
          "TenGiayTo": ""
        },
        "DuLieuDienTu": {
          "MaDinhDanh": ""
        }
      }
      console.log('tphsAdd', tphsAdd)
      appStore.$patch((state) => {
        state.thongTinHoSo.ThanhPhanHoSo.push(tphsAdd)
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
    <v-row class="mx-0 my-0 mt-2" v-if="!mobile">
      <v-data-table
        :headers="headers"
        :items="thanhPhanHoSo"
        items-per-page="20"
        item-value="PrimKey"
        hide-default-footer
        class="table-base mb-5"
        no-data="Không có dữ liệu"
        :loading="loadingData"
        loading-text="Đang tải... "
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td class="align-left">{{ item.raw.TenGiayTo }} 
              <span v-if="item.raw.MaThanhPhanHoSo" style="color:red">(*)</span>
              <v-btn v-if="!item.raw.MaThanhPhanHoSo"
                class="mx-0 ml-2"
                size="small"
                variant="outlined"
                color="red"
                @click.stop="xoaGiayToKhac(item.raw, index)"
                height="28px" width="50px"
              >
                <v-icon size="14" color="red">mdi-delete</v-icon>
                <span style="font-size: 14px; text-transform: none;">Xóa</span>
              </v-btn>
            </td>
            <td class="align-center" width="450">
              <div class="py-1" @click="taiXuongFile(item.raw.TepDuLieu, 'preview')" v-if="item.raw.TepDuLieu.KichThuocTep">
                <v-icon size="18" color="green" v-if="item.raw.TepDuLieu.DinhDangTep === 'xls' || item.raw.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'doc' || item.raw.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'png' || item.raw.TepDuLieu.DinhDangTep === 'jpg' || item.raw.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.raw.TepDuLieu.TenTep}}.{{item.raw.TepDuLieu.Ext}}</a>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="taiXuongFile(item.raw.TepDuLieu, 'download')">
                      <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Tải xuống</span>
                </v-tooltip>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="deleteFileAttack(item.raw, index)">
                      <v-icon size="18" color="red">mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>Xóa</span>
                </v-tooltip>
              </div>
              <v-btn v-else
                class="mx-0"
                size="small"
                variant="outlined"
                color="#1E7D30"
                @click.stop="pickFileUpload(item.raw, index )"
                height="32px" width="120px"
              >
                <v-icon size="22" color="#1E7D30" class="mr-2">mdi-cloud-upload-outline</v-icon>
                <span style="font-size: 14px; text-transform: none;">Tải lên tệp</span>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-row class="mx-0 my-0" style="justify-content: flex-end;">
        <v-btn
          size="small"
          color="#1E7D30"
          prepend-icon="mdi-plus"
          class="mx-0"
          @click.stop="showFormGiayToKhac"
        >
          Thêm giấy tờ khác
        </v-btn>
      </v-row>
    </v-row>
    <v-row class="mx-0 my-0 mt-2" v-if="mobile">
      <v-data-table
        :headers="headersMobile"
        :items="thanhPhanHoSo"
        items-per-page="20"
        item-value="PrimKey"
        hide-default-footer
        class="table-base mb-5"
        no-data="Không có dữ liệu"
        :loading="loadingData"
        loading-text="Đang tải... "
      >
        <template v-slot:item="{ item, index }">
          <tr>
            <td class="align-center" width="30">{{ index + 1 }}</td>
            <td class="align-left">
              <div class="pt-1">
                {{ item.raw.TenGiayTo }} 
                <span v-if="item.raw.MaThanhPhanHoSo" style="color:red">(*)</span>
                <v-btn v-if="!item.raw.MaThanhPhanHoSo"
                  class="mx-0 ml-2"
                  size="small"
                  variant="outlined"
                  color="red"
                  @click.stop="xoaGiayToKhac(item.raw, index)"
                  height="28px" width="50px"
                >
                  <v-icon size="14" color="red">mdi-delete</v-icon>
                  <span style="font-size: 14px; text-transform: none;">Xóa</span>
                </v-btn>
              </div>
              <div>
                <div class="py-1" @click="taiXuongFile(item.raw.TepDuLieu, 'preview')" v-if="item.raw.TepDuLieu.KichThuocTep">
                  <v-icon size="18" color="green" v-if="item.raw.TepDuLieu.DinhDangTep === 'xls' || item.raw.TepDuLieu.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                  <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'doc' || item.raw.TepDuLieu.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                  <v-icon size="18" color="red" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                  <v-icon size="18" color="blue" v-else-if="item.raw.TepDuLieu.DinhDangTep === 'png' || item.raw.TepDuLieu.DinhDangTep === 'jpg' || item.raw.TepDuLieu.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                  <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                  <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{item.raw.TepDuLieu.TenTep}}.{{item.raw.TepDuLieu.Ext}}</a>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="taiXuongFile(item.raw.TepDuLieu, 'download')">
                        <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Tải xuống</span>
                  </v-tooltip>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="deleteFileAttack(item.raw, index)">
                        <v-icon size="18" color="red">mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </div>
                <v-btn v-else
                  class="mx-0"
                  size="small"
                  variant="outlined"
                  color="#1E7D30"
                  @click.stop="pickFileUpload(item.raw, index )"
                  height="28px" width="80px"
                >
                  <v-icon size="22" color="#1E7D30" class="mr-2">mdi-cloud-upload-outline</v-icon>
                  <span style="font-size: 14px; text-transform: none;">Tải lên tệp</span>
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-row class="mx-0 my-0" style="justify-content: flex-end;">
        <v-btn
          size="small"
          color="#1E7D30"
          prepend-icon="mdi-plus"
          class="mx-0"
          @click.stop="showFormGiayToKhac"
        >
          Thêm giấy tờ khác
        </v-btn>
      </v-row>
    </v-row>
    <input type="file" id="file_upload_tep_dinh_kem" :multiple="false" @input="uploadFile()" style="display:none"/>
  </v-card>
  <v-dialog
    max-width="900"
    v-model="dialog"
    persistent
    absolute
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
