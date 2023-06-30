import {
  ref,
  computed
} from 'vue'
import {
  defineStore
} from 'pinia'
import axios from 'axios'
import $ from 'jquery'
export const authorizationStore = defineStore('authorization', {
  state: () => ({
    baseURL: import.meta.env.VITE_APP_PATH_API
  }),
  getters: {
    userInfo: (state) => state.userInfo,
  },
  actions: {
    async login(filter) {
      let settings = {
        "url": `${this.baseURL}/auth/oauth/token`,
        "method": "POST",
        "headers": {
          'Accept': 'application/json',
          'Cookie': 'JSESSIONID=18AC7FDF4FF30534A32FD5B9781C233C',
        },
        "data": filter.data
      };

      let data = await $.ajax(settings)
      return data
    },
    async getThongTinUserDangNhap(filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/v1/datasharing/canbo/token`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': filter.token
        },
        data: {},
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
  },
})