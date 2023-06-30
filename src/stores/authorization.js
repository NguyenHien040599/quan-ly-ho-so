import { defineStore } from 'pinia'
import $ from 'jquery'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
export const authorizationStore = defineStore('authorization', {
  state: () => ({
    baseURL: import.meta.env.VITE_APP_PATH_API
  }),
  getters: {
    userInfo: (state) => state.userInfo,
  },
  actions: {
    async login (filter) {
      let settings = {
        "url": `${this.baseURL}/auth/oauth/token`,
        "method": "POST",
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        "data": filter.data
      };
      
      let data = await $.ajax(settings)
      return data
    },
    async getThongTinTaiKhoan () {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/idpmgt/internal/security/profile`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        }
      }
      let data = await $.ajax(settings)
      return data
    }
  },
})
