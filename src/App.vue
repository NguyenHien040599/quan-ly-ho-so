
<script setup>
import VueConfirmDialog from './views/ConfirmDialog.vue'
import { useCookies } from 'vue3-cookies'
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useAppStore } from '@/stores/global.js'

import 'toastr/build/toastr.css'

const appStore = useAppStore()
const { cookies } = useCookies()
const { name } = useDisplay()
const onResize = function () {
  let breakpointName = name.value
  // console.log('breakpointName', breakpointName)
  appStore.SET_BREAKPOINTNAME(breakpointName)
}
onMounted(() => {
  // if (cookies.get('Token') && cookies.get('UserInfo')) {
  //   appStore.SET_ISSIGNED(true)
  //   appStore.SET_USERINFO(cookies.get('UserInfo'))
  // } else {
  //   appStore.SET_ISSIGNED(false)
  //   appStore.SET_USERINFO('')
  //   router.push({ path: '/login' })
  // }
})
</script>

<template>
  <v-app v-resize="onResize" class="wrap-app mt-3">
    <router-view></router-view>
    <VueConfirmDialog></VueConfirmDialog>
  </v-app>
</template>

