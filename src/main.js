import { createApp, inject } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import toastr from 'toastr'
import vuetify from './plugins/vuetify'
import 'toastr/build/toastr.css'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


toastr.options = {
  'closeButton': true,
  'timeOut': '5000',
  "positionClass": "toast-top-center"
}


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
    return parseError(error.response.data)
  } else {
    return Promise.reject(error)
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(VueAwesomePaginate)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
