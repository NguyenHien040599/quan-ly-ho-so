<script setup>
  // import Drawer from '../containerComponents/Drawer.vue'
  // import AppBar from '../containerComponents/AppBar.vue'
  // import Footer from '../containerComponents/Footer.vue'

  import { onMounted, defineAsyncComponent } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/stores/global.js'
  import { authorizationStore } from '@/stores/authorization'
  const { mobile } = useDisplay()
  const MenuHoSo = defineAsyncComponent(() =>
    import('./MenuHoSo.vue')
  )
  const appStore = useAppStore()
  const authorization = authorizationStore()
  const getThongTinTk = function () {
    let filter = {}
    authorization.getThongTinTaiKhoan(filter).then(function (result) {
      let data = {}
      if (result && result.CaNhan) {
        data = Object.assign(result.CaNhan, {
          LoaiDoiTuong: 'CaNhan',
          TenDinhDanh: result.TenDinhDanh,
          id: result.id
        })
      }
      if (result && result.DonViKinhDoanh) {
        data = Object.assign(result.DonViKinhDoanh, {
          LoaiDoiTuong: 'DonViKinhDoanh',
          TenDinhDanh: result.TenDinhDanh,
          id: result.id
        })
      }
      if (result && result.CoQuanDonVi) {
        data = Object.assign(result.CoQuanDonVi, {
          LoaiDoiTuong: 'CoQuanDonVi',
          TenDinhDanh: result.TenDinhDanh,
          id: result.id
        })
      }
      appStore.SET_USERINFO(data)
    }).catch(function () {
    })
  }
  getThongTinTk()
  onMounted(() => {
    // console.log('isMobile', mobile.value)
  })
</script>

<template>
  <v-app>
    <!-- <Drawer></Drawer> -->
    <!-- <AppBar></AppBar> -->
    <v-main>
      <div class="container wrap-content-page">
        <v-card class="mx-auto pa-3" style="box-shadow: none !important;" v-if="!mobile">
          <v-row>
            <v-col style="max-width: 300px !important;flex: 0 0 300px;">
              <MenuHoSo></MenuHoSo>
            </v-col>
            <v-col style="max-width: calc(100% - 300px) !important;flex: 0 0 calc(100% - 300px);">
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="mx-auto pa-3" style="box-shadow: none !important;" v-else>
          <v-row class="mx-0 my-0" style="">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn size="small" color="#1E7D30" v-bind="props" style="position: absolute;top: 12px; right: 12px;z-index: 100;">
                  <v-icon size="24" color="#FFFFFF">mdi-menu</v-icon>
                </v-btn>
              </template>
              <MenuHoSo style="min-width: 350px;max-width: 600px"></MenuHoSo>
            </v-menu>
          </v-row>
          
          <div>
            <router-view></router-view>
          </div>
        </v-card>
      </div>
      <!-- <Footer></Footer> -->
    </v-main>
  </v-app>
</template>

<style lang="scss">
  @media screen and (max-width: 426px){
    
  }
  @media screen and (max-width: 1024px){
  }
</style>
