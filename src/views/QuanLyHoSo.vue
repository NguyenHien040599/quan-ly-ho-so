<script setup>
  import { useRouter } from 'vue-router'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
 
  const router = useRouter()
  console.log('routes', router.currentRoute.value)
  const DanhSachHoSo = defineAsyncComponent(() =>
    import('./DanhSachHoSo.vue')
  )
  
  onMounted(() => {

  })
</script>
<template>
  <DanhSachHoSo></DanhSachHoSo>
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
