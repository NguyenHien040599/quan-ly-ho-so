import { defineStore } from 'pinia'
import $ from 'jquery'
import { useCookies } from 'vue3-cookies'
import axios from 'axios'
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
    async getDanhMucEform (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/eformmgt/internal/${filter.maDanhMuc}/1.0/filter`,
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
    async thongKeHoSo (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0/${filter.doiTuong}/distinct`,
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
    async getTraCuuHoSo (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/publicadministrativemgt/internal/hosodichvucong/1.0/tracuu`,
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
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
    async themMoiDLDT (filter) {
      let settings = {
        method: 'post',
        url: `${this.baseURL}/documentmgt/internal/dulieudientu/1.0`,
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
    async capNhatDLDT (filter) {
      let settings = {
        method: 'post',
        url: `${this.baseURL}/documentmgt/internal/dulieudientu/1.0/${filter.data.primKey}`,
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
    async getChiTietBieuMauDienTu (filter) {
      let settings = {
        method: 'get',
        url: `${this.baseURL}/documentmgt/internal/dulieudientu/1.0/mdd/${filter.maDinhDanh}`,
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
    async uploadTep (fileUpload) {
      let form = new FormData()
      form.append("file", fileUpload)
      let data =  await fetch(`${this.baseURL}/storagemgt/internal/device/1.0/upload`, {
        method: "POST", 
        body: form,
        headers: {
          'Accept': 'application/json', 
          'Authorization': 'Bearer ' + cookies.get('Token')
        }
      });
      let jsonData = await data.json()
      return jsonData
    },
    async taiTep (file) {
      // let settings = {
      //   method: 'get',
      //   url: `${this.baseURL}/storagemgt/internal/tepdulieu/1.0/download/${file.MaDinhDanh}`,
      //   headers: { 
      //     'Content-Type': 'application/octet-stream',
      //     'Authorization': 'Bearer ' + cookies.get('Token')
      //   },
      //   data: {},
      //   params: {},
      //   responseType: 'blob'
      // }
      // let data = await $.ajax(settings)
      // var blob = new Blob([data], { type: "application/pdf" })
      // let urlFile = window.URL.createObjectURL(blob)
      // console.log('urlFile123', urlFile)
      // return urlFile


      let config = {
        method: 'get',
        url: `${this.baseURL}/storagemgt/internal/tepdulieu/1.0/download/${file.MaDinhDanh}`,
        headers: { 
          'Content-Type': 'application/octet-stream'
        },
        responseType: 'blob'
      }

      let response = await axios(config)
      console.log('ressssssHandleResponse', response, response.status)
      let urlFile = window.URL.createObjectURL(response.data)
      return urlFile
    }
  }
})
