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
    async getDanhMucCmon (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/cmonmgt/internal/${filter.maDanhMuc}/1.0/filter`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: filter.hasOwnProperty('params') ? filter.params : {},
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
    async getDanhSachHoSo (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0/filter`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: filter.hasOwnProperty('params') ? filter.params : {},
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
    async getChiTietHoSo (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0/${filter.primKey}`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: {},
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
    async themMoiHoSo (filter) {
      let settings = {
        method: 'post',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: filter.hasOwnProperty('data') ? JSON.stringify(filter.data) : JSON.stringify({}),
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
    async capNhatHoSo (filter) {
      let settings = {
        method: 'post',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0/${filter.data.primKey}`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: filter.hasOwnProperty('data') ? JSON.stringify(filter.data) : JSON.stringify({}),
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
    async xoaHoSo (filter) {
      let settings = {
        method: 'delete',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0/${filter.data.primKey}`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookies.get('Token')
        },
        data: {},
        params: {}
      }
      let data = await $.ajax(settings)
      return data
    },
  },
})
