<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import jsondata from '../stores/mock-data.json'
 
  const route = useRoute()
  const router = useRouter()
  const routes = router.currentRoute.value
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const appStore = useAppStore()
  const { cookies } = useCookies()
  const FormCRUD = defineAsyncComponent(() =>
    import('./FormCRUD.vue')
  )
  const menuItems = reactive(jsondata.menuHoSo)
  const menuSelected = computed(() => appStore.getMenuSelected)
  if (routes && routes.params.hasOwnProperty('status') && routes.params.status) {
    let menu = menuItems.find(function (item) {
      return item.to.split('/')[1] === routes.params.status
    })
    appStore.SET_MENU_SELECTED(menu)
  } else {
    appStore.SET_MENU_SELECTED(menuItems[0])
  }
  console.log('menuSelected', menuSelected)
  const loading = ref(false)
  const validForm = ref(false)
  const rules = reactive({
    required: (value) => (!!value && !Array.isArray(value)) || (Array.isArray(value) && value.length) || "Thông tin bắt buộc"
  })
  const dialog = ref(false)
  const mauFormCrud = reactive([
    {
      "name": "MaSinhVien",
      "title": "Mã sinh viên",
      "type": "textfield",
      "fieldClass": "v-col-xs-12 v-col-6",
      "placeHolder": "",
      "defaultValue": "",
      "dataType": "",
      "dataSource": "",
      "autoEvent": "",
      "required": true,
      "rules": [],
      "readonly": false
    },
    {
      "name": "HoVaTen",
      "title": "Họ tên",
      "type": "textfield",
      "fieldClass": "v-col-xs-12 v-col-6",
      "placeHolder": "",
      "defaultValue": "",
      "dataType": "",
      "dataSource": "",
      "autoEvent": "",
      "required": true,
      "rules": [],
      "readonly": false
    },
    {
      "name": "GioiTinh",
      "title": "Giới tính",
      "type": "select",
      "multiple": false,
      "itemText": "TenMuc",
      "itemValue": "MaMuc",
      "fieldClass": "v-col-xs-12 v-col-6",
      "placeHolder": "",
      "defaultValue": "",
      "dataType": "",
      "dataSource": [],
      "autoEvent": "",
      "api": "/v1/datasharing/dulieudanhmuc/filter?page=0&size=10000&danhMuc_maDanhMuc=GIOITINH",
      "responseDataApi": "content",
      "required": true,
      "rules": [],
      "readonly": false
    },
    {
      "name": "NgaySinh",
      "title": "Ngày sinh",
      "type": "date",
      "fieldClass": "v-col-xs-12 v-col-6",
      "placeHolder": "ddmmyyyy, dd/mm/yyyy",
      "defaultValue": "",
      "dataType": "",
      "dataSource": "",
      "autoEvent": "",
      "required": true,
      "rules": [],
      "readonly": false
    },
    {
      "name": "tomTat",
      "title": "Tóm tắt nội dung",
      "type": "textarea",
      "fieldClass": "v-col-12",
      "placeHolder": "",
      "defaultValue": "",
      "dataType": "",
      "dataSource": "",
      "autoEvent": "",
      "rows": 3,
      "required": true,
      "rules": [],
      "readonly": false
    }
  ])
  const crudFormReference = ref(null)
  const dataInputSearch = reactive({})
  const dataInputCrud = ref({})
  const dataSource = reactive([
    {name: 'Giá trị 1', value: 1},
    {name: 'Giá trị 2', value: 2},
    {name: 'Giá trị 3', value: 3}
  ])
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
  const submitFormCrud = async function () {
    let valid = await crudFormReference.value.validateForm()
    console.log('validForm', valid)
    if (valid) {
      let dataOutput = crudFormReference.value.submit()
      console.log('dataOutputCrud', dataOutput)
    }
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
  const dateLocale = function (dateInput) {
		if (!dateInput) return ''
		let date = new Date(dateInput)
		return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
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
  const redirectTo = function (menu) {
    appStore.SET_MENU_SELECTED(menu)
    router.push({ path: menu.to })
  }
  watch(route, async (val) => {
    console.log('run watch-routes:', val.name)
    if (val.name !== 'ThongTinHoSo') {
      console.log('run watch-routes2:', val.name)
      if (val && val.params.hasOwnProperty('status') && val.params.status) {
        let menu = menuItems.find(function (item) {
          return item.to.split('/')[1] === val.params.status
        })
        appStore.SET_MENU_SELECTED(menu)
      } else {
        appStore.SET_MENU_SELECTED(menuItems[0])
      }
    }
  })
  onMounted(() => {

  })
</script>
<template>
  <v-card style="border-radius: 0;">
    <div>
      <v-btn
        size="small"
        :color="baseColor"
        prepend-icon="mdi-plus"
        @click.stop="showDialog" class="mx-0 btn-nophoso"
      >
        Thêm mới hồ sơ
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-list dense class="menu-drawer pt-0">
      <v-list-item v-for="(menu, index) in menuItems" :key="index" @click.stop="redirectTo(menu, index)"
      :class="menu.id === menuSelected.id ? 'item-active list-menu' : 'list-menu'" 
      >
        <template v-slot:prepend>
          <v-tooltip top color="#0073C8">
            <template v-slot:activator="{ props }">
              <v-icon
                v-bind="props"
                class="icon-draw"
                style="font-size: 24px !important"
                :icon="menu.icon"
                ></v-icon>
            </template>
            <span>{{ menu.title }}</span>
          </v-tooltip>
        </template>
        <v-list-item-title class="text-list">{{
          menu.title
        }}</v-list-item-title>
        <template v-slot:append>
          <span class="label-counter">{{ menu.counter }}</span>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  
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
          <FormCRUD ref="crudFormReference" :mauNhap="mauFormCrud" :dataInput="dataInputCrud"></FormCRUD>
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
