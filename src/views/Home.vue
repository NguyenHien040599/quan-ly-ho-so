<script setup>
  // import Drawer from '../containerComponents/Drawer.vue'
  // import AppBar from '../containerComponents/AppBar.vue'
  // import Footer from '../containerComponents/Footer.vue'

  import { onMounted, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  const MenuHoSo = defineAsyncComponent(() =>
    import('./MenuHoSo.vue')
  )
  const appStore = useAppStore()
  onMounted(() => {
    
  })
</script>

<template>
  <v-app>
    <!-- <Drawer></Drawer> -->
    <!-- <AppBar></AppBar> -->
    <v-main>
      <div class="container wrap-content-page">
        <v-card class="mx-auto pa-3" style="box-shadow: none !important;">
          <v-row>
            <v-col style="max-width: 300px !important;flex: 0 0 300px;">
              <MenuHoSo></MenuHoSo>
            </v-col>
            <v-col style="max-width: calc(100% - 300px) !important;flex: 0 0 calc(100% - 300px);">
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <!-- <Footer></Footer> -->
    </v-main>
  </v-app>
</template>

<style lang="scss">
  main.v-main {
    // padding-top: 120px !important
  }
  @media screen and (max-width: 426px){
    
  }
  @media screen and (max-width: 1024px){
    main.v-main {
      padding-top: 75px !important
    }
    .wrap-content-page {
      padding-bottom: 75px !important
    }
  }
</style>
