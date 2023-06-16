<script setup>
  import { useCookies } from 'vue3-cookies'
  import { useRouter, useRoute } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const route = useRoute()
  const router = useRouter()
  const Pagination = defineAsyncComponent(() =>
    import('./Pagination.vue')
  )
  // const TimKiemNangCao = defineAsyncComponent(() =>
  //   import('./TimKiemNangCao.vue')
  // )
  // const FormCRUD = defineAsyncComponent(() =>
  //   import('./FormCRUD.vue')
  // )
  const appStore = useAppStore()
  const { cookies } = useCookies()

  const menuSelected = computed(() => appStore.getMenuSelected)
  const validForm = ref(false)
  const rules = reactive({
    required: (value) => (!!value && !Array.isArray(value)) || (Array.isArray(value) && value.length) || "Thông tin bắt buộc"
  })
  const model1 = ref('')
  const model2 = ref('')
  const dialog = ref(false)
  const advanceSearch = ref(false)
  const advanceSearchReference = ref(null)
  const crudFormReference = ref(null)
  const dataInputSearch = reactive({})
  const dataInputCrud = ref({})
  const headers = reactive([])
  const dsHoSo = reactive([
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "Thông báo vi phạm",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "A2931-123412",
        "NgaySinh": "1999-04-27T17:00:00",
        "TinhTrang": {
            "type": "C_TinhTrang",
            "MaMuc": "1",
            "TenMuc": "Mới"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    },
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "A2931-123412",
        "NgaySinh": "1999-04-27T17:00:00",
        "TinhTrang": {
            "type": "C_TinhTrang",
            "MaMuc": "2",
            "TenMuc": "Đang xử lý"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    },
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "Thay đổi nội dung hồ sơ chuyển dữ liệu cá nhân ra nước ngoài",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "A2931-123412",
        "NgaySinh": "1999-04-27T17:00:00",
        "TinhTrang": {
            "type": "C_TinhTrang",
            "MaMuc": "3",
            "TenMuc": "Hoàn thành"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    }
  ])
  const itemsPerPage = ref(10)
  const loadingData = ref(false)
  const loading = ref(false)
  const page = ref(1)
  const pageCount = ref(3)
  const total = ref(10)

  const eventClick = function () {
    console.log('run callback')
  }
  const action = function () {
    loading.value = true
    setTimeout(function () {
      loading.value = false
    }, 300)
  }
  const redirectThongTinHoSo = function (hoso) {
    router.push({ path: '/thong-tin-ho-so/' + hoso.PrimKey })
  }
  const lapHoSoThayDoi = function (item) {
    router.push({ path: '/nop-ho-so' + menuSelected.value.to + '?id_update=' + item.PrimKey })
  }
  const showAdvanceSearch = function () {
    advanceSearch.value = !advanceSearch.value
    setTimeout(function () {
      if (advanceSearch.value) {
        advanceSearchReference.value.initForm()
      }
    }, 100)
  }
  const submitAdvanceSearch = function (dataSearch) {
    console.log('dataSearch', dataSearch)
  }
  const submitFormCrud = async function () {
    let valid = await crudFormReference.value.validateForm()
    console.log('validForm', valid)
    if (valid) {
      let dataOutput = crudFormReference.value.submit()
      console.log('dataOutputCrud', dataOutput)
    }
  }
  const changePage = function (page) {
    console.log('page_pagination', page.value)
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
  const showDialog = function (type, data) {
    dialog.value = true
    console.log('dataItem', data)
    if (type === 'update') {
      dataInputCrud.value = data
    }
    setTimeout(function () {
      crudFormReference.value.initForm(type)
    }, 100)
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

  onMounted(() => {

  })
</script>
<template>
  <v-card class="mx-auto pa-0" style="box-shadow: none !important; overflow: inherit;">
    <!-- table -->
    <v-row class="mx-0 my-0">
      <v-col cols="12" class="px-0 py-0">
        <v-data-table
          :headers="menuSelected.headerTable"
          :items="dsHoSo"
          v-model:items-per-page="itemsPerPage"
          item-value="PrimKey"
          hide-default-footer
          class="table-base"
          no-data="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
        >
          <template v-slot:item="{ item, index }">
            <tr @click="redirectThongTinHoSo(item.raw)">
              <td v-for="(itemHeader, indexHeader) in menuSelected.headerTable" :key="indexHeader" :class="itemHeader['class']" :width="itemHeader.hasOwnProperty('width') ? itemHeader.width : ''">
                <div v-if="itemHeader.type == 'index'">
                  <!-- <div v-if="itemsPerPage" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div> -->
                  <div v-if="itemsPerPage" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">{{ index + 1 }}</div>
                  <div v-else :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">{{ index + 1 }}</div>
                </div>
                <div v-else-if="itemHeader.type == 'date'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.value) ? dateLocale(item.raw[itemHeader.value]) : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'datetime'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.value) ? dateLocaleTime(item.raw[itemHeader.value]) : ''}}
                </div>
                <div v-else-if="itemHeader.type == 'object'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.value) ? item.raw[itemHeader.value][itemHeader.mapping] : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'money'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.value) ? currency(item.raw[itemHeader.value]) : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'array'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.value) ? convertDataArray(itemHeader, item.raw[itemHeader.value]) : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'calculator'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ convertDataView(itemHeader, item.raw) }}
                </div>
                <div v-else-if="itemHeader.type == 'action'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  <v-tooltip location="top" v-if="item.raw.TinhTrang.MaMuc == '1'">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="showDialog('update', item.columns)">
                        <v-icon size="24" :color="baseColor">mdi-playlist-edit</v-icon>
                      </v-btn>
                    </template>
                    <span>Sửa</span>
                  </v-tooltip>

                  <v-tooltip location="top" v-if="item.raw.TinhTrang.MaMuc == '1'">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" @click.stop="showConfirm">
                        <v-icon size="22" color="#FF0000">mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>

                  <v-btn v-if="item.raw.TinhTrang.MaMuc == '3' && (menuSelected.id == 'xulydulieu' || menuSelected.id == 'chuyendulieu')" color="#1E7D30" class="mx-0" size="small" @click.stop="lapHoSoThayDoi(item.raw)">
                    <v-icon size="20" color="#FFFFFF" class="mr-2">mdi-file-document-plus-outline</v-icon>
                    <span>Lập hồ sơ thay đổi</span>
                  </v-btn>
                </div>
                <div v-else :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw[itemHeader.value] }}
                </div>
              </td>

            </tr>
          </template>
        </v-data-table>
        <Pagination :pageInput="page" :pageCount="pageCount" :total="total" @changePage="changePage" style="margin-bottom: 50px;"></Pagination>
      </v-col>
    </v-row>
    <!-- dialog -->
    <v-dialog
      max-width="1000"
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
              Thêm mới hồ sơ
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
        </v-card-text>
        <v-card-actions class="justify-center pb-3 px-3">
          <v-btn
            size="small" variant="elevated"
            :loading="loading"
            :disabled="loading"
            color="error"
            prepend-icon="mdi-close"
            @click.stop="dialog = false"
            class="mr-2"
          >
            Thoát
          </v-btn>
          <v-btn
            size="small" variant="elevated"
            :loading="loading"
            :disabled="loading"
            :color="baseColor"
            prepend-icon="mdi-content-save"
            @click.stop="submitFormCrud"
          >
            Thêm mới
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->

  </v-card>
</template>

<style scoped>
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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
