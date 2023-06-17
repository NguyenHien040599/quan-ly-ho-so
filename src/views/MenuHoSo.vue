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

  const menuItems = reactive(jsondata.menuHoSo)
  const menuSelected = computed(() => appStore.getMenuSelected)
  if (routes && routes.params.hasOwnProperty('status') && routes.params.status) {
    let menu = menuItems.find(function (item) {
      return item.to.split('/')[1] === routes.params.status
    })
    appStore.SET_MENU_SELECTED(menu)
  } else {
    if (routes.name == 'ThongBao') {
      let menu = menuItems.find(function (item) {
        return item.id === 'thongbao'
      })
      appStore.SET_MENU_SELECTED(menu)
    } else {
      appStore.SET_MENU_SELECTED(menuItems[0])
    }
  }
  console.log('menuSelected', menuSelected)
  const loading = ref(false)
  const themMoiHoSo = function () {
    router.push({ path: '/nop-ho-so' + menuSelected.value.to })
  }
  const redirectTo = function (menu) {
    appStore.SET_MENU_SELECTED(menu)
    router.push({ path: menu.to })
  }
  watch(route, async (val) => {
    console.log('run watch-routes:', val.name)
    if (val.name !== 'ThongTinHoSo' && val.name !== 'BieuMauDienTu') {
      console.log('run watch-routes2:', val.name, val.params)
      if (val && val.params.hasOwnProperty('status') && val.params.status) {
        let menu = menuItems.find(function (item) {
          return item.to.split('/')[1] === val.params.status
        })
        appStore.SET_MENU_SELECTED(menu)
      } else {
        if (val.name == 'ThongBao') {
          let menu = menuItems.find(function (item) {
            return item.id === 'thongbao'
          })
          appStore.SET_MENU_SELECTED(menu)
        } else {
          appStore.SET_MENU_SELECTED(menuItems[0])
        }
      }
    }
  })
  onMounted(() => {

  })
</script>
<template>
  <v-card style="border-radius: 0;border-top-left-radius: 3px;border-top-right-radius: 3px;border-top: 3px solid #1E7D30">
    <!-- <div>
      <v-btn
        size="small"
        :color="baseColor"
        @click.stop="themMoiHoSo" class="mx-0 btn-nophoso"
      >
      <v-icon size="20" class="mr-2">mdi-plus</v-icon>
        <span style="padding-top: 2px;">Thêm mới hồ sơ</span>
      </v-btn>
    </div>
    <v-divider></v-divider> -->
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
                style="font-size: 26px !important"
                :icon="menu.icon"
                ></v-icon>
            </template>
            <span>{{ menu.title }}</span>
          </v-tooltip>
        </template>
        <v-list-item-title class="text-list pr-2">{{
          menu.title
        }}</v-list-item-title>
        <template v-slot:append>
          <span class="label-counter">{{ menu.counter }}</span>
        </template>
      </v-list-item>
    </v-list>
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
    line-height: 18px;
    white-space: pre-wrap;
  }
  .v-list-item__prepend > .v-icon {
    margin-inline-end: 15px !important;
  }
  .item-active {
    background: #e0fdec;
    border-left: 6px solid #1E7D30;
    padding: 0 8px !important
  }
  .icon-draw {
    color: #1E7D30 !important
  }
  .menu-drawer .list-menu {
    min-height: 48px !important;
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
