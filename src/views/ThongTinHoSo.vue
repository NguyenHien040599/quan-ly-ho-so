<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import jsondata from '../stores/mock-data.json'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)

  const router = useRouter()
  console.log('routes', router.currentRoute.value)
  const appStore = useAppStore()
  const { cookies } = useCookies()
  const menuSelected = computed(() => appStore.getMenuSelected)
  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)
  const tab = ref(null)
  const thongTinHoSo = reactive(jsondata.thongTinHoSo)
  const mauHienThi = reactive(jsondata.thuTucHanhChinh[0]['mauHienThi'])
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
  <v-card class="mx-auto pa-0 thongtinhoso" style="box-shadow: none !important; overflow: inherit;">
    <v-tabs
      v-model="tab"
      bg-color="#00000000"
    >
      <v-tab value="thongtin">Thông tin hồ sơ</v-tab>
      <v-tab value="nhatky">Nhật ký sửa đổi</v-tab>
      <v-tab value="tientrinh">Tiến trình xử lý</v-tab>
    </v-tabs>

    <v-card-text class="px-0 py-0" style="margin-top: -15px;">
      <v-window v-model="tab">
        <v-window-item value="thongtin" style="padding: 15px; border: 1px solid #DADADA; border-top: 0px">
          <v-row class="thongtinchung mx-0 my-0">
            <v-col v-for="(item, index) in mauHienThi" v-bind:key="index" :class="item['class']">
              <v-row v-if="item.hasOwnProperty('group') && item.group" class="mx-0">
                <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
                  <div class="sub-header-content">
                    <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
                  </div>
                  <div class="triangle-header"></div>
                  <div class="text-sub-header">{{ item.title }}</div>
                </v-col>
                <v-col v-for="(itemChild, indexChild) in item.content" v-bind:key="indexChild" :class="item['class']">
                  <span class="label-text">{{itemChild.title}}: </span>
                  <span class="content-text" v-if="itemChild.type == 'date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? dateLocale(thongTinHoSo[itemChild.value]) : '' }}
                  </span>
                  <span class="content-text" v-else-if="itemChild.type == 'datetime'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? dateLocaleTime(thongTinHoSo[itemChild.value]) : ''}}
                  </span>
                  <span class="content-text" v-else-if="itemChild.type == 'object'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? thongTinHoSo[itemChild.value][itemChild.mapping] : '' }}
                  </span>
                  <span class="content-text" v-else-if="itemChild.type == 'money'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? currency(thongTinHoSo[itemChild.value]) : '' }}
                  </span>
                  <span class="content-text" v-else-if="itemChild.type == 'array'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? convertDataArray(itemChild, thongTinHoSo[itemChild.value]) : '' }}
                  </span>
                  <span class="content-text" v-else-if="itemChild.type == 'calculator'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ convertDataView(itemChild, thongTinHoSo) }}
                  </span>
                  <span class="content-text" v-else :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                    {{ thongTinHoSo[itemChild.value] }}
                  </span>
                </v-col>
              </v-row>
              <div v-else>
                <span class="label-text">{{item.title}}: </span>
                <span class="content-text" v-if="itemChild.type == 'date'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? dateLocale(thongTinHoSo[itemChild.value]) : '' }}
                </span>
                <span class="content-text" v-else-if="itemChild.type == 'datetime'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? dateLocaleTime(thongTinHoSo[itemChild.value]) : ''}}
                </span>
                <span class="content-text" v-else-if="itemChild.type == 'object'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? thongTinHoSo[itemChild.value][itemChild.mapping] : '' }}
                </span>
                <span class="content-text" v-else-if="itemChild.type == 'money'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? currency(thongTinHoSo[itemChild.value]) : '' }}
                </span>
                <span class="content-text" v-else-if="itemChild.type == 'array'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ thongTinHoSo.hasOwnProperty(itemChild.value) ? convertDataArray(itemChild, thongTinHoSo[itemChild.value]) : '' }}
                </span>
                <span class="content-text" v-else-if="itemChild.type == 'calculator'" :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ convertDataView(itemChild, thongTinHoSo) }}
                </span>
                <span class="content-text" v-else :style="itemChild.hasOwnProperty('style') ? itemChild.style : ''">
                  {{ thongTinHoSo[itemChild.value] }}
                </span>
              </div>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="nhatky">
          Two
        </v-window-item>

        <v-window-item value="tientrinh">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
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
