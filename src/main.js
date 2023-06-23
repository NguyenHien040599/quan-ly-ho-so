import { createApp, inject } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify'

import { useCookies } from "vue3-cookies"
const { cookies } = useCookies()


const baseURL = import.meta.env.VITE_APP_PATH_API
if (typeof baseURL !== 'undefined') {
  axios.defaults.baseURL = baseURL
}
axios.interceptors.response.use((response) => {
  return response
}, error => {
  if (error.response.status == 401) {
    cookies.set('Token', '')
    if (cookies.get('RefreshToken')) {
    } else {
    }
  }
  if (error.response) {
    return error.response
  } else {
    return Promise.reject(error)
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
