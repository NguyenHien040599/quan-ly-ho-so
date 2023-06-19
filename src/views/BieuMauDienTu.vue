<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  const hosoDvcStore = useHosoDvcStore()
  const appStore = useAppStore()
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const props = defineProps({
    thutuc: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  })
  const BieuMauDienTu_XLDL = defineAsyncComponent(() =>
    import('./BieuMauDienTu_XLDL.vue')
  )
  const BieuMauDienTu_CHUYENDL = defineAsyncComponent(() =>
    import('./BieuMauDienTu_CHUYENDL.vue')
  )
  const BieuMauDienTu_TBVP = defineAsyncComponent(() =>
    import('./BieuMauDienTu_TBVP.vue')
  )
  const router = useRouter()
  const getThongTinHoSo = function () {
    let filter = {
      primKey: props.id
    }
    hosoDvcStore.getChiTietHoSo(filter).then(function(result) {
      if (result.resp) {
        appStore.SET_THONGTINHOSO(result.resp)
      } else {
        appStore.SET_THONGTINHOSO(null)
      }
      
    }).catch(function(){
    })
  }
  getThongTinHoSo()
  onMounted(() => {

  })
</script>
<template>
  <BieuMauDienTu_TBVP v-if="props.thutuc === 'thong-bao-vi-pham'"></BieuMauDienTu_TBVP>
  <BieuMauDienTu_XLDL v-if="props.thutuc === 'xu-ly-du-lieu'"></BieuMauDienTu_XLDL>
  <BieuMauDienTu_CHUYENDL v-if="props.thutuc === 'chuyen-du-lieu'"></BieuMauDienTu_CHUYENDL>
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
