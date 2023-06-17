<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const props = defineProps({
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
  onMounted(() => {

  })
</script>
<template>
  <BieuMauDienTu_TBVP v-if="props.id === 'thong-bao-vi-pham'"></BieuMauDienTu_TBVP>
  <BieuMauDienTu_XLDL v-if="props.id === 'xu-ly-du-lieu'"></BieuMauDienTu_XLDL>
  <BieuMauDienTu_CHUYENDL v-if="props.id === 'chuyen-du-lieu'"></BieuMauDienTu_CHUYENDL>
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
