<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import jsondata from '../stores/mock-data.json'
  const hosoDvcStore = useHosoDvcStore()
  const route = useRoute()
  const router = useRouter()
  const routes = router.currentRoute.value
  const appStore = useAppStore()

  const menuItems = reactive(jsondata.menuHoSo)
  const menuSelected = computed(() => appStore.getMenuSelected)
  if (routes && routes.params.hasOwnProperty('thutuc') && routes.params.thutuc) {
    let menu = menuItems.find(function (item) {
      return item.to.split('/')[1] === routes.params.thutuc
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
  const thongKeSoLuong = function () {
    let filter = {
      doiTuong: 'thutuchanhchinh'
    }
    hosoDvcStore.thongKeHoSo(filter).then(function(result) {
      menuItems[0].counter = 0
      menuItems[1].counter = 0
      menuItems[2].counter = 0
      let data = result.resp
      let tbvp = data.find(function(item) {
        return item.MaMuc == 'TBVP'
      })
      if (tbvp) {
        menuItems[0].counter = tbvp.SoLuong
      }
      let xldl = data.find(function(item) {
        return item.MaMuc == 'DGTD_XLDLCN'
      })
      let tdndxldl = data.find(function(item) {
        return item.MaMuc == 'TDND_DGTD_XLDLCN'
      })
      if (xldl) {
        menuItems[1].counter += xldl.SoLuong
      }
      if (tdndxldl) {
        menuItems[1].counter += tdndxldl.SoLuong
      }
      let cdl = data.find(function(item) {
        return item.MaMuc == 'DGTD_CDLCN'
      })
      let tdndcdl = data.find(function(item) {
        return item.MaMuc == 'TDND_DGTD_CDLCN'
      })
      if (cdl) {
        menuItems[2].counter += cdl.SoLuong
      }
      if (tdndcdl) {
        menuItems[2].counter += tdndcdl.SoLuong
      }
    }).catch(function(){
    })
  }
  thongKeSoLuong()
  const redirectTo = function (menu) {
    appStore.SET_MENU_SELECTED(menu)
    router.push({ path: menu.to })
  }
  watch(route, async (val) => {
    thongKeSoLuong()
    if (val.name !== 'ThongTinHoSo' && val.name !== 'BieuMauDienTu') {
      console.log('run watch-routes2:', val.name, val.params)
      if (val && val.params.hasOwnProperty('thutuc') && val.params.thutuc) {
        let menu = menuItems.find(function (item) {
          return item.to.split('/')[1] === val.params.thutuc
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
