<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
 
  const router = useRouter()
  console.log('routes', router.currentRoute.value)
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const DanhSachHoSo = defineAsyncComponent(() =>
    import('./DanhSachHoSo.vue')
  )
  const appStore = useAppStore()
  const { cookies } = useCookies()

  const menuSelected = computed(() => appStore.getMenuSelected)
  const validForm = ref(false)
  const rules = reactive({
    required: (value) => (!!value && !Array.isArray(value)) || (Array.isArray(value) && value.length) || "Thông tin bắt buộc"
  })
  const dialog = ref(false)
  const loading = ref(false)
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
