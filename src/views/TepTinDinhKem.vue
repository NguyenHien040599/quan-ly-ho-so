<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import jsondata from '../stores/mock-data.json'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)

  const router = useRouter()
  const appStore = useAppStore()
  const { cookies } = useCookies()
  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)
  const thongTinHoSo = reactive(jsondata.thongTinHoSo)
  const headers = reactive([
    {
      "sortable": false,
      "title": "Tên giấy tờ",
      "align": "center",
      "value": "tenGiayTo",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Tệp đính kèm",
      "align": "center",
      "value": "tepDinhKem",
      "class": "td-left"
    },
    {
      "sortable": false,
      "title": "Thao tác",
      "align": "center",
      "value": "action",
      "class": "td-center"
    }
  ])
  const viewFileUpload = function () {

  }
  const downloadFile = function () {

  }
  const eventClick = function () {
    console.log('run callback')
  }
  const action = function () {
    loading.value = true
    setTimeout(function () {
      loading.value = false
    }, 300)
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
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  const pickFileUpload = function () {
    document.getElementById('file_upload_tep_dinh_kem').value = ''
    document.getElementById('file_upload_tep_dinh_kem').click()
  }
  const uploadFile = function () {
    let vm = this
    let files = $('#file_upload_tep_dinh_kem')[0].files
    for (let index = 0; index < files.length; index++) {
      vm.fileUpload.push({
        name: files[index]['name']
      })
    }
    vm.$store.commit('SET_FILEUPLOADYET', true)
  }
  const deleteFileAttack = function (item, index) {
    let vm = this
    if (!item.id) {
      vm.fileUpload.splice(index, 1)
      vm.$store.commit('SET_FILEUPLOADYET', false)
    } else {
      vm.$store.commit('SET_SHOWCONFIRM', true)
      let confirm = {
        auth: false,
        title: 'Xóa tài liệu đính kèm',
        message: 'Bạn có chắc chắn muốn xóa tài liệu này',
        button: {
          yes: 'Có',
          no: 'Không'
        },
        callback: () => {
          let filter = {
            idThanhPhan: vm.thongtinthanhphan.primKey,
            idFile: item.id
          }
          vm.$store.dispatch('deleteFile', filter).then(function(result) {
            vm.fileUpload.splice(index, 1)
            toastr.success('Xóa tài liệu đính kèm thành công')
            vm.$store.commit('SET_FILEUPLOADYET', false)
          }).catch(function(){
            toastr.success('Xóa tài liệu đính kèm thất bại')
          })
        }
      }
      vm.$store.commit('SET_CONFIG_CONFIRM_DIALOG', confirm)
      
    }
  }
  onMounted(() => {

  })
</script>
<template>
  <v-card class="pa-0 thanhphanhoso" style="box-shadow: none !important;width: 100%;">
    <!-- <v-row class="mx-0 my-0 mt-3">
      <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
        <div class="sub-header-content">
          <v-icon size="22" color="#ffffff">mdi-view-dashboard-outline</v-icon>
        </div>
        <div class="triangle-header"></div>
        <div class="text-sub-header">Tải lên tệp tin đính kèm</div>
      </v-col>
    </v-row> -->
    <v-row class="mx-0 my-0 mt-2">
      <v-data-table
        :headers="headers"
        :items="thongTinHoSo.ThanhPhanHoSo"
        items-per-page="20"
        item-value="PrimKey"
        hide-default-footer
        class="table-base"
        no-data="Không có dữ liệu"
        :loading="loadingData"
        loading-text="Đang tải... "
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="align-left">{{ item.raw.TenGiayTo }}</td>
            <td class="align-left" width="350">
              <div class="" @click="viewFileUpload()" v-for="(itemTep, indexTep) in item.raw.TepDuLieu" v-bind:key="indexTep">
                <v-icon size="18" color="green" v-if="itemTep.DinhDangTep === 'xls' || itemTep.DinhDangTep === 'xlsx'">mdi-file-excel-outline</v-icon>
                <v-icon size="18" color="blue" v-else-if="itemTep.DinhDangTep === 'doc' || itemTep.DinhDangTep === 'docx'">mdi-file-word-outline</v-icon>
                <v-icon size="18" color="red" v-else-if="itemTep.DinhDangTep === 'pdf'">mdi-file-pdf-box</v-icon>
                <v-icon size="18" color="blue" v-else-if="itemTep.DinhDangTep === 'png' || itemTep.DinhDangTep === 'jpg' || itemTep.DinhDangTep === 'jpeg'">mdi-file-image</v-icon>
                <v-icon size="18" color="#2161b1" v-else>mdi-paperclip</v-icon>
                <a class="ml-2" style="font-size: 14px;text-decoration: underline;color: #1E7D30">{{itemTep.TenTep}}</a>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="downloadFile(itemTep, indexTep)">
                        <v-icon size="18" :color="baseColor">mdi-cloud-download-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Tải xuống</span>
                  </v-tooltip>
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props" class="mr-2" @click.stop="downloadFile(itemTep, indexTep)">
                        <v-icon size="18" color="red">mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
              </div>
            </td>
            <td class="align-center" width="200">
              <v-btn
                class="mx-0"
                size="small"
                variant="outlined"
                color="#1E7D30"
                @click.stop="pickFileUpload"
                height="36px" width="180px"
              >
                <v-icon size="26" color="#1E7D30" class="mr-2">mdi-cloud-upload-outline</v-icon>
                <span style="font-size: 18px; text-transform: none;">Tải lên</span>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
    <input type="file" id="file_upload_tep_dinh_kem" :multiple="false" @input="uploadFile()" style="display:none"/>
  </v-card>
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
