<script setup>
  import { useRoute } from 'vue-router'
  import { ref, reactive, watch, onMounted} from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
  const publicPath = ref(import.meta.env.VITE_APP_PULIC_PATH)
  const { mobile } = useDisplay()
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const route = useRoute()
  const counter = ref(0)
  const loadingData = ref(false)
	const dsTinNhanThongBao = ref([])
  const total = ref(0)
  const totalThongBao = ref(0)
  const pageCountTiepNhan = ref(0)
  const dialog = ref(false)
  const noiDungThongBao = ref()
	
  const getThongBao = function ({ done }) {
    let filter = {
      params: {
        page: counter.value,
        size: 15,
        trangThaiHoSo_MaMuc: '02'
      }
    }
    loadingData.value = true
    hosoDvcStore.getTraCuuHoSo(filter).then(function(result) {
      loadingData.value = false
      if (result.content.length) {
        counter.value += 1
      }
      dsTinNhanThongBao.value = dsTinNhanThongBao.value.concat(result.content)
      totalThongBao.value = result.totalElements
      pageCountTiepNhan.value = result.totalPages
      if (dsTinNhanThongBao.value.length <= result.totalElements) {
        done('empty')
      } else {
        done('ok')
      }
    }).catch(function(){
      loadingData.value = false
      dsTinNhanThongBao.value = []
      totalThongBao.value = 0
      done('empty')
    })
  }
  const viewThongBao = function (item) {
    noiDungThongBao.value = item
    dialog.value = true
  }
  const dateLocaleTime = function(dateInput) {
    let date = new Date(dateInput)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  watch(route, async (val) => {
    getThongBao()
  })
  onMounted(() => {

  })
</script>
<template>
  <v-card class="mx-auto pa-0" style="overflow: inherit;" :style="mobile ? 'box-shadow: none !important' : ''">
    <div>
			<v-row class="my-0 mb-5 mx-0">
        <v-col class="row-header d-flex align-center justify-start py-0 px-0" style="border: none">
          <div class="header-content" style="text-transform: uppercase;">
            Danh sách tin nhắn, thông báo
          </div>
          <div class="triangle-header"></div>
        </v-col>
      </v-row>
			<div :class="mobile ? 'px-0' : 'px-3'">
        <div v-if="!totalThongBao" style="height: 45px;padding: 10px 0;">KHÔNG CÓ THÔNG BÁO NÀO</div>
          <v-infinite-scroll :height="550" :items="dsTinNhanThongBao" :onLoad="getThongBao">
            <template v-for="(item) in dsTinNhanThongBao" :key="item.primKey">
              <v-row class="mx-0 my-0 px-3 mb-3 item-thongbao active" @click.stop="viewThongBao(item)">
                <v-col class="px-0 py-0" style="max-width: 50px">
                  <v-icon size="34" color="#1E7D30" class="">mdi-message-badge</v-icon>
                </v-col>
                <v-col class="py-0">
                  <div class="time-label">
                    <span>20/08/2023 08:20</span>
                  </div>
                  <div class="title-label">
                    <span>Thông báo xác nhận kết quả gửi hồ sơ </span>
                  </div>
                  <div class="content-label">
                    <span>Hồ sơ 000.00.04.H40-230414-0002 đã gửi thành công. Cán bộ cơ quan đã tiếp nhận hồ sơ và đang xử lý. 
                    </span>
                  </div>
                </v-col>
                <v-col class="px-0 py-0" style="max-width: 40px">
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn icon variant="flat" size="small" v-bind="props">
                        <v-icon size="26" color="#1E7D30">mdi-checkbox-marked-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Đánh dấu đã đọc</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row class="mx-0 my-0 px-3 mb-2 item-thongbao" @click.stop="viewThongBao(item)">
                <v-col class="px-0 py-0" style="max-width: 50px">
                  <v-icon size="34" color="#979797" class="">mdi-message-check-outline</v-icon>
                </v-col>
                <v-col class="py-0">
                  <div class="time-label">
                    <span>20/08/2023 08:20</span>
                  </div>
                  <div class="title-label">
                    <span>Thông báo xác nhận kết quả gửi hồ sơ </span>
                  </div>
                  <div class="content-label">
                    <span style="color: #707070;">Hồ sơ 000.00.04.H40-230414-0002 đã gửi thành công. Cán bộ cơ quan đã tiếp nhận hồ sơ và đang xử lý. 
                    </span>
                  </div>
                </v-col>
              </v-row>
            </template>
            <template v-slot:empty>
              <div v-if="totalThongBao" class="mt-3">Không còn thông báo nào!</div>
            </template>
          </v-infinite-scroll>
        </div>
		</div>
  </v-card>
  <v-dialog
    max-width="900"
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-toolbar
        dark
        :color="baseColor" class="px-0"
      >
        <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
          <div class="sub-header-content">
            Tin nhắn, thông báo
          </div>
          <div class="triangle-header"></div>
        </v-col>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="flat" size="small" icon color="#E9FFF2" @click="dialog = false" >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="px-3">
        <div style="color: #000;font-size: 24px;font-family: Roboto;font-style: normal;font-weight: 700;">
          Thông báo xác nhận kết quả gửi hồ sơ
        </div>
        <i style="color: grey;">(20/08/2023 10:20)</i>
        <div class="mt-2">
          Hồ sơ 000.00.04.H40-230414-0002 đã nộp thành công. Cán bộ cơ quan đã tiếp nhận hồ sơ và đang xử lý. Vui lòng chờ kết quả phản hồi trong thời hạn quy định 5 - 7 ngày.
          Mọi thắc mắc vui lòng gửi phản hồi sau thời gian xử lý! Xin cảm ơn!
        </div>
      </v-card-text>
      <v-card-actions class="justify-center pb-3 px-3">
        <v-btn
          size="small" variant="elevated"
          color="red"
          prepend-icon="mdi-close"
          @click="dialog = false"
        >
          Thoát
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
  .item-thongbao {
    border-radius: 8px;
    background: linear-gradient(180deg, #F0F0F0 0%, #FFF 100%);
    align-items: center;
    max-height: 80px;
    padding: 5px 0px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
  .item-thongbao.active{
    background: linear-gradient(180deg, #b8f6d1 0%, #FFF 100%);
    border: 1px solid #caebc3;
  }
  .time-label, .title-label, .content-label {
    height: 24px;
    overflow: hidden;
  }
  .active .time-label, .active .title-label, .active .content-label {
    color: #1E7D30
  }
  .active .time-label, .active .title-label {
    font-weight: 600;
  }
</style>