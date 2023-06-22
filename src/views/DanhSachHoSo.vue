<script setup>
  import { useCookies } from 'vue3-cookies'
  import { useRouter, useRoute } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import jsondata from '../stores/mock-data.json'
  import { useDisplay } from 'vuetify'
  const { mobile } = useDisplay()
  const hosoDvcStore = useHosoDvcStore()
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const route = useRoute()
  const router = useRouter()
  const Pagination = defineAsyncComponent(() =>
    import('./Pagination.vue')
  )
  const menuItems = reactive(jsondata.menuHoSo)
  // const TimKiemNangCao = defineAsyncComponent(() =>
  //   import('./TimKiemNangCao.vue')
  // )
  const appStore = useAppStore()
  const { cookies } = useCookies()

  const menuSelected = computed(() => appStore.getMenuSelected)
  if (route && route.params.hasOwnProperty('thutuc') && route.params.thutuc) {
    let menu = menuItems.find(function (item) {
      return item.to.split('/')[1] === route.params.thutuc
    })
    appStore.SET_MENU_SELECTED(menu)
  } else {
    if (route.name == 'ThongBao') {
      let menu = menuItems.find(function (item) {
        return item.id === 'thongbao'
      })
      appStore.SET_MENU_SELECTED(menu)
    } else {
      appStore.SET_MENU_SELECTED(menuItems[0])
    }
  }
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
  const headersMobile = reactive([
    {
        "sortable": false,
        "title": "STT",
        "align": "center",
        "key": "stt",
        "type": "index",
        "class": "td-center",
        "width": 30
    },
    {
      "sortable": false,
      "title": "Thông tin hồ sơ",
      "align": "center",
      "key": "MaSoQuanLy",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": " ",
      "align": "center",
      "key": "action",
      "width": 30
    }
  ])
  const dsHoSo = ref([])
  const itemsPerPage = ref(20)
  const loadingData = ref(false)
  const loading = ref(false)
  const page = ref(0)
  const pageCount = ref(0)
  const total = ref(0)

  const themMoiHoSo = function () {
    let thuTucTaoMoi = jsondata.thuTucHanhChinh.find(function (item) {
      return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
    })
    if (thuTucTaoMoi && thuTucTaoMoi.thongTinHoSo) {
      let filter = {
        data: thuTucTaoMoi.thongTinHoSo
      }
      hosoDvcStore.themMoiHoSo(filter).then(function(result) {
        let dataHs = result.resp
        router.push({ path: `/nop-ho-so${menuSelected.value.to}/${dataHs.primKey}` })
      }).catch(function(){
        alert('Thêm mới hồ sơ thất bại')
      })
    }
    
  }
  const getDanhSachHoSo = function () {
    if (menuSelected.value && menuSelected.value.thuTuc && menuSelected.value.thuTuc.maThuTuc) {
      let filter = {
        params: {
          page: page.value,
          size: itemsPerPage.value,
          thuTucHanhChinh_MaMuc: menuSelected.value.thuTuc.maThuTuc
        }
      }
      loadingData.value = true
      hosoDvcStore.getDanhSachHoSo(filter).then(function(result) {
        loadingData.value = false
        dsHoSo.value = result.content
        total.value = result.totalElements
        pageCount.value = result.totalPages
      }).catch(function(){
        loadingData.value = false
        dsHoSo.value = []
        total.value = 0
        pageCount.value = 0
      })
    }
    
  }
  getDanhSachHoSo()
  const action = function () {
    loading.value = true
    setTimeout(function () {
      loading.value = false
    }, 300)
  }
  const redirectThongTinHoSo = function (hoso) {
    router.push({ path: '/thong-tin-ho-so/' + hoso.primKey })
  }
  const suaHoSo = function (item) {
    router.push({ path: `/nop-ho-so${menuSelected.value.to}/${item.primKey}` })
  }
  const xoaHoSo = function (item) {
    appStore.SET_SHOWCONFIRM(true)
    let confirm = {
      auth: false,
      title: 'Xóa hồ sơ',
      message: 'Bạn có chắc chắn muốn xóa hồ sơ này',
      button: {
        yes: 'Có',
        no: 'Không'
      },
      callback: () => {
        let filter = {
          data: item
        }
        hosoDvcStore.xoaHoSo(filter).then(function(result) {
          getDanhSachHoSo()
        }).catch(function(){
        })
      }
    }
    appStore.SET_CONFIG_CONFIRM_DIALOG(confirm)
  }
  const rutHoSo = function (item) {
    console.log('ruthoso', item)
    appStore.SET_SHOWCONFIRM(true)
    let confirm = {
      auth: false,
      title: 'Xóa hồ sơ',
      message: 'Bạn có chắc chắn muốn rút hồ sơ này',
      button: {
        yes: 'Có',
        no: 'Không'
      },
      callback: () => {
        // let filter = {
        //   data: item
        // }
        // hosoDvcStore.xoaHoSo(filter).then(function(result) {
        //   getDanhSachHoSo()
        // }).catch(function(){
        // })
      }
    }
    appStore.SET_CONFIG_CONFIRM_DIALOG(confirm)
  }
  const lapHoSoThayDoi = function (item) {
    router.push({ path: `/nop-ho-so${menuSelected.value.to}/${item.primKey}`, query: { id_update: item.primKey } })
    // let thuTucTaoMoi = jsondata.thuTucHanhChinh.find(function (item) {
    //   return item.maThuTuc == menuSelected.value.thuTuc.maThuTuc
    // })
    // if (thuTucTaoMoi && thuTucTaoMoi.thongTinHoSo) {
    //   let filter = {
    //     data: thuTucTaoMoi.thongTinHoSo
    //   }
    //   hosoDvcStore.themMoiHoSo(filter).then(function(result) {
    //     let dataHs = result.resp
    //     router.push({ path: `/nop-ho-so${menuSelected.value.to}/${dataHs.primKey}?id_update=${item.primKey}` })
    //   }).catch(function(){
    //     alert('Thêm mới hồ sơ thất bại')
    //   })
    // }
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
    console.log('page_pagination', page)
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
    console.log('dataItem', data)
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
  // watch(route, async (val) => {
  //   console.log('run watch-routes DSHS:', val)
  //   getDanhSachHoSo()
  // })
  watch(menuSelected, async (val) => {
    console.log('run watch-routes menuSelected:', val)
    getDanhSachHoSo()
  })
  onMounted(() => {
    if (cookies.get('Token')) {
      appStore.SET_ISSIGNED(true)
    } else {
      appStore.SET_ISSIGNED(false)
      appStore.SET_USERINFO('')
      router.push({ path: '/login' })
    }
    console.log('isMobile', mobile.value)
  })
</script>
<template>
  <v-card class="mx-auto pa-0" style="box-shadow: none !important; overflow: inherit;">
    <v-row class="my-0 mb-5 mx-0" v-if="!mobile">
      <v-col class="row-header d-flex align-center justify-start py-0 px-0" style="border: none">
        <div class="header-content" style="text-transform: uppercase;">
          Danh sách hồ sơ
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header pl-2" style="text-transform: uppercase;">{{ menuSelected.dossierName }}</div>
      </v-col>
      <v-btn
        size="small"
        :color="baseColor"
        @click.stop="themMoiHoSo" class="mx-0"
      >
      <v-icon size="20" class="mr-2">mdi-plus</v-icon>
        <span style="padding-top: 2px;">Thêm mới hồ sơ</span>
      </v-btn>
    </v-row>
    <v-row class="my-0 mb-5 mx-0" v-if="mobile">
      <v-col class="row-header d-flex align-center justify-start py-0 px-0" style="border: none">
        <div class="header-content" style="text-transform: uppercase;">
          Danh sách hồ sơ
        </div>
        <div class="triangle-header"></div>
      </v-col>
    </v-row>
    <!-- table -->
    <v-row class="mx-0 my-0" v-if="!mobile">
      <v-col cols="12" class="px-0 py-0">
        <v-data-table
          :headers="menuSelected.headerTable"
          :items="dsHoSo"
          v-model:items-per-page="itemsPerPage"
          item-value="primKey"
          hide-default-footer
          class="table-base"
          no-data-text="Không có hồ sơ nào"
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
                  {{ item.raw.hasOwnProperty(itemHeader.key) ? dateLocale(item.raw[itemHeader.key]) : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'datetime'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.key) ? dateLocaleTime(item.raw[itemHeader.key]) : ''}}
                </div>
                <div v-else-if="itemHeader.type == 'object'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.key) ? item.raw[itemHeader.key][itemHeader.mapping] : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'money'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.key) ? currency(item.raw[itemHeader.key]) : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'array'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw.hasOwnProperty(itemHeader.key) ? convertDataArray(itemHeader, item.raw[itemHeader.key]) : '' }}
                </div>
                <div v-else-if="itemHeader.type == 'calculator'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ convertDataView(itemHeader, item.raw) }}
                </div>
                <div v-else-if="itemHeader.type == 'action'" :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props">
                        <v-icon size="24" :color="baseColor">mdi-filter-variant</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '00'" @click="suaHoSo(item.raw)">
                        <v-list-item-title>
                          <v-icon size="24" :color="baseColor" class="mr-2">mdi-playlist-edit</v-icon> Sửa hồ sơ
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '00'" @click="xoaHoSo(item.raw)">
                        <v-list-item-title>
                          <v-icon size="22" color="#FF0000" class="mr-2">mdi-close</v-icon> Xóa hồ sơ
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '01'" @click="rutHoSo(item.raw)">
                        <v-list-item-title>
                          <v-icon size="22" color="#FF0000" class="mr-2">mdi-file-refresh-outline</v-icon>Rút hồ sơ
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '09' && (menuSelected.id == 'xulydulieu' || menuSelected.id == 'chuyendulieu')"
                        @click="lapHoSoThayDoi(item.raw)"
                      >
                        <v-list-item-title>
                          <v-icon size="20" :color="baseColor" class="mr-2">mdi-file-document-plus-outline</v-icon>
                          Lập hồ sơ thay đổi
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
                <div v-else :style="itemHeader.hasOwnProperty('style') ? itemHeader.style : ''">
                  {{ item.raw[itemHeader.key] }}
                </div>
              </td>

            </tr>
          </template>
        </v-data-table>
        <Pagination v-if="pageCount && pageCount > 1" :pageInput="page+1" :pageCount="pageCount" :total="total" @changePage="changePage" style="margin-bottom: 50px;"></Pagination>
      </v-col>
    </v-row>
    
    <v-row class="mx-0 my-0" v-if="mobile">
      <v-col cols="12" class="px-0 py-0">
        <div class="text-sub-header mx-0 px-0 mb-3" style="text-transform: uppercase;">{{ menuSelected.dossierName }}</div>
        <v-data-table
          :headers="headersMobile"
          :items="dsHoSo"
          v-model:items-per-page="itemsPerPage"
          item-value="primKey"
          hide-default-footer
          class="table-base"
          no-data-text="Không có hồ sơ nào"
        >
          <template v-slot:item="{ item, index }">
            <tr @click="redirectThongTinHoSo(item.raw)">
              <td class="td-center">
                <div>{{ (page+1) * itemsPerPage - itemsPerPage + index + 1 }}</div>
              </td>
              <td class="pt-2">
                <div class="mb-1" style="color: #1E7D30">{{ item.raw.MaSoQuanLy }}</div>
                <div class="mb-1"><span>Mã hồ sơ: </span>{{ item.raw.MaSoQuanLy }}</div>
                <div class="mb-1">
                  <span>Ngày tạo: </span>
                  <span style="color: #1E7D30">{{ dateLocaleTime(item.raw.ThoiGianTao) }}</span>
                </div>
                <div class="mb-1">
                  <span>Trạng thái: </span>
                  <span style="color: #1E7D30">{{ item.raw.TrangThaiHoSo['TenMuc']}}</span>
                </div>
              </td>
              <td width="30">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn icon variant="flat" size="small" v-bind="props">
                      <v-icon size="24" :color="baseColor">mdi-filter-variant</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '00'" @click="suaHoSo(item.raw)">
                      <v-list-item-title>
                        <v-icon size="24" :color="baseColor" class="mr-2">mdi-playlist-edit</v-icon> Sửa hồ sơ
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '00'" @click="xoaHoSo(item.raw)">
                      <v-list-item-title>
                        <v-icon size="22" color="#FF0000" class="mr-2">mdi-close</v-icon> Xóa hồ sơ
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '01'" @click="rutHoSo(item.raw)">
                      <v-list-item-title>
                        <v-icon size="22" color="#FF0000" class="mr-2">mdi-file-refresh-outline</v-icon>Rút hồ sơ
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="item.raw.TrangThaiHoSo.MaMuc == '09' && (menuSelected.id == 'xulydulieu' || menuSelected.id == 'chuyendulieu')"
                      @click="lapHoSoThayDoi(item.raw)"
                    >
                      <v-list-item-title>
                        <v-icon size="20" :color="baseColor" class="mr-2">mdi-file-document-plus-outline</v-icon>
                        Lập hồ sơ thay đổi
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
        <Pagination v-if="pageCount && pageCount > 1" :pageInput="page+1" :pageCount="pageCount" :total="total" @changePage="changePage" style="margin-bottom: 50px;"></Pagination>
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
