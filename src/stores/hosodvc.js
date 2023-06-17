import { defineStore } from 'pinia'
import $ from 'jquery'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
export const useHosoDvcStore = defineStore('hosoDvcStore', {
  state: () => ({
    baseURL: import.meta.env.VITE_APP_PATH_API
  }),
  getters: {
    userInfo: (state) => state.userInfo,
  },
  actions: {
    async getDanhMuc (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/publicadministrativemgt/internal/${filter.maDanhMuc}/1.0/filter`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: filter.hasOwnProperty('data') ? filter.data : {},
        params: filter.hasOwnProperty('params') ? filter.params : {}
      }
      let data = await $.ajax(settings)
      return data
    },
  },
})
