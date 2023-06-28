<script setup>
  import { useCookies } from 'vue3-cookies'
  import { useRoute } from 'vue-router'
  import { ref, reactive, watch, onMounted} from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  import { useDisplay } from 'vuetify'
  const { mobile } = useDisplay()
  const appStore = useAppStore()
  const hosoDvcStore = useHosoDvcStore()
  const route = useRoute()
  const counter = ref(0)
  const { cookies } = useCookies()
  const headers = reactive([
    {
      sortable: false,
      title: "STT",
      align: "center",
      key: "stt"
    },
    {
      sortable: false,
      title: "Mã hồ sơ",
      align: "left",
      key: "HoVaTen"
    },
    {
      sortable: false,
      title: "Ngày tạo",
      align: "left",
      key: "NgaySinh"
    },
    {
      sortable: false,
      title: "Thủ tục",
      align: "left",
      key: "MaSinhVien"
    },
    {
      sortable: false,
      title: "Tình trạng",
      align: "left",
      key: "GioiTinh"
    }
  ])
  const keywordSearch = ref('')
  const dsHsTraCuu = ref([])
  const loadingData = ref(false)
	const kqTraCuu = ref(false)
	const dsHoSoMoiTiepNhan = ref([])
  const total = ref(0)
  const totalTiepNhan = ref(0)
  const pageCountTiepNhan = ref(0)
	const traCuuHoSo = function () {
    if (!keywordSearch.value || !String(keywordSearch.value).trim()) {
      return
    }
		kqTraCuu.value = true
    let filter = {
      params: {
        page: 0,
        size: 20,
        keyword: String(keywordSearch.value).trim()
      }
    }
    loadingData.value = true
    hosoDvcStore.getTraCuuHoSo(filter).then(function(result) {
      loadingData.value = false
      dsHsTraCuu.value = result.content
      total.value = result.totalElements
    }).catch(function(){
      loadingData.value = false
      dsHoSo.value = []
      total.value = 0
      pageCount.value = 0
    })
	}
  const getHsTiepNhan = function ({ done }) {
    let filter = {
      params: {
        page: counter.value,
        size: 5,
        trangThaiHoSo_MaMuc: '02'
      }
    }
    loadingData.value = true
    hosoDvcStore.getTraCuuHoSo(filter).then(function(result) {
      loadingData.value = false
      if (result.content.length) {
        counter.value += 1
      }
      dsHoSoMoiTiepNhan.value = dsHoSoMoiTiepNhan.value.concat(result.content)
      totalTiepNhan.value = result.totalElements
      pageCountTiepNhan.value = result.totalPages
      if (dsHoSoMoiTiepNhan.value.length <= result.totalElements) {
        done('empty')
      } else {
        done('ok')
      }
    }).catch(function(){
      loadingData.value = false
      dsHoSoMoiTiepNhan.value = []
      totalTiepNhan.value = 0
      done('empty')
    })
  }
  const dateLocale = function (dateInput) {
		if (!dateInput) return ''
		let date = new Date(dateInput)
		return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
	}
  watch(route, async (val) => {
    getHsTiepNhan()
  })
  onMounted(() => {

  })
</script>
<template>
  <v-card :class="!mobile ? 'wrap-c-tracuu mx-auto mt-3' : 'wrap-c-tracuu  wrap-c-tracuu-mobile mx-auto'">
    <v-row justify="center" class="mx-0 my-0">
      <v-col cols="12" class="px-0 py-0 text-header">
				TRA CỨU HỒ SƠ 
			</v-col>
    </v-row>
		<v-row class="mx-0" style="margin-top: 12px !important;margin-bottom: 24px !important;margin: 0 auto">
      <v-col cols="12"  class="px-0 py-0" style="line-height: 32px; max-width: 700px; margin: 0 auto">
				<span style="font-weight: 600;">Mã hồ sơ/ Số CCCD/ Mã số thuế/ Mã số doanh nghiệp </span>
			</v-col>
			<v-col cols="12" class="px-0 py-0" style="max-width: 700px;margin: 0 auto;">
				<v-text-field
          prepend-inner-icon="mdi-file-document-edit-outline"
					class="flex input-form"
					v-model="keywordSearch"
					placeholder="Nhập thông tin tra cứu"
					solo
					dense
					hide-details="auto"
					clearable
          @keyup.enter="traCuuHoSo"
				></v-text-field>
			</v-col>
    </v-row>
		<!-- <v-row class="mx-0 my-0">
      <v-col cols="12" sm="6" md="5" class="px-0 py-0" style="line-height: 32px;">
				<span class="label">Mã bảo mật </span>
				<span style="color: #EB0202">*</span>
			</v-col>
			<v-col cols="12" sm="6" md="7" class="px-0 py-0">
				<v-row>
					<v-col>
						<v-text-field
							class="flex input-form"
							v-model="secretCode"
							placeholder="Nhập mã bảo mật"
							solo
							dense
							hide-details="auto"
							clearable
						></v-text-field>
					</v-col>
					<v-col class="px-0" style="max-width: 150px;">
						<v-img
							:width="150"
							:height="32"
							cover
							src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
						></v-img>
					</v-col>
					<v-col style="max-width: 60px;">
						<v-btn icon color="#1E7D30" size="small">
							<v-icon size="24" >mdi-refresh</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
    </v-row> -->
		<v-row justify="center" class="mx-0 my-0" style="margin-top: 25px !important; margin-bottom: 25px !important">
			<v-btn
				size="small"
				color="#1E7D30"
				class="mx-0" style="float: right"
				@click.stop="traCuuHoSo"
				height="35px" width="150px"
			>
				<v-icon size="24" color="#ffffff" class="mr-2">mdi-magnify</v-icon>
				<span style="font-size: 16px">Tra cứu</span>
			</v-btn>
    </v-row>
    <!-- table -->
    <div v-if="kqTraCuu" class="mt-3" style="max-width: 900px; margin: 0 auto;margin-bottom: 30px;">
      <v-row class="my-0 mx-0">
				<v-col cols="12" class="px-0 py-0 text-header-ho-so py-2">
          <v-icon size="28" color="#1E7D30" class="mr-2">mdi-text-box-search-outline</v-icon>
					KẾT QUẢ TRA CỨU
				</v-col>
			</v-row>
			<div>
				<v-row v-for="(item) in dsHsTraCuu" :key="item" class="mx-0 my-0" style="align-items: center;max-height: 60px;border-bottom: 1px dotted rgb(167, 165, 165);padding: 5px 0px;">
					<v-col class="px-0 py-0" style="max-width: 40px">
						<v-icon size="28" color="#1E7D30" class="mr-2">mdi-chevron-double-right</v-icon>
					</v-col>
					<v-col class="py-0">
						<div>
							<span style="font-weight: 600;">{{ item.MaDinhDanh }}</span> - <span>{{ item.TrichYeuHoSo }}</span>
						</div>
						<div>
							<span>Chủ hồ sơ: </span> <span style="font-weight: 600;">{{ item.ChuHoSo['TenGoi'] }}</span> - 
              <span>Ngày nộp: </span> <span style="font-weight: 600;">{{ item['NgayNopHoSo'] ? dateLocale(item['NgayNopHoSo']) : '' }}</span> - 
              <span>Trạng thái hồ sơ: </span> <span style="font-weight: 600;">{{ item.TrangThaiHoSo['TenMuc'] }}</span>
						</div>
					</v-col>
				</v-row>
        <div v-if="kqTraCuu && !total" style="height: 45px;padding: 10px 0;">KHÔNG CÓ HỒ SƠ NÀO ĐƯỢC TÌM THẤY</div>
			</div>
    </div>
    <div class="mt-4" style="max-width: 900px; margin: 0 auto">
			<v-row class="my-0 mx-0">
				<v-col cols="12" class="px-0 py-0 text-header-ho-so py-2">
          <v-icon size="28" color="#1E7D30" class="mr-2">mdi-text-box-check-outline</v-icon>
					HỒ SƠ MỚI TIẾP NHẬN
				</v-col>
			</v-row>
			<div>
				<!-- <v-row v-for="(item, index) in dsHoSoMoiTiepNhan" :key="index" class="mx-0 my-0 mt-2" style="align-items: center;">
					<v-col class="px-0 py-0" style="max-width: 40px">
						<v-icon size="28" color="#1E7D30" class="mr-2">mdi-file-document-check-outline</v-icon>
					</v-col>
					<v-col class="py-0">
						<div>
							<span style="font-weight: 600;">{{ item.MaDinhDanh }}</span> - <span>{{ item.TrichYeuHoSo }}</span>
						</div>
						<div style="font-style: italic;">
							<span>Chủ hồ sơ: </span> <span style="font-weight: 600;">{{ item.ChuHoSo['TenGoi'] }}</span> - 
              <span>Trạng thái hồ sơ: </span> <span style="font-weight: 600;">{{ item.TrangThaiHoSo['TenMuc'] }}</span>
						</div>
					</v-col>
				</v-row> -->
        <div v-if="!totalTiepNhan" style="height: 45px;padding: 10px 0;">KHÔNG CÓ HỒ SƠ NÀO</div>
        <v-infinite-scroll :height="250" :items="dsHoSoMoiTiepNhan" :onLoad="getHsTiepNhan">
          <template v-for="(item) in dsHoSoMoiTiepNhan" :key="item.primKey">
            <v-row class="mx-0 my-0" style="align-items: center;max-height: 60px;border-bottom: 1px dotted rgb(167, 165, 165);padding: 5px 0px;">
              <v-col class="px-0 py-0" style="max-width: 40px">
                <v-icon size="28" color="#1E7D30" class="mr-2">mdi-chevron-double-right</v-icon>
              </v-col>
              <v-col class="py-0">
                <div>
                  <span style="font-weight: 600;">{{ item.MaDinhDanh }}</span> - <span>{{ item.TrichYeuHoSo }}</span>
                </div>
                <div style="font-style: italic;">
                  <span>Chủ hồ sơ: </span> <span style="font-weight: 600;">{{ item.ChuHoSo['TenGoi'] }}</span> - 
                  <span>Trạng thái hồ sơ: </span> <span style="font-weight: 600;">{{ item.TrangThaiHoSo['TenMuc'] }}</span>
                </div>
              </v-col>
            </v-row>
          </template>
          <template v-slot:empty>
            <div v-if="totalTiepNhan">Không còn hồ sơ nào!</div>
          </template>
        </v-infinite-scroll>
        
			</div>
		</div>
  </v-card>
</template>

<style scoped>
	.wrap-c-tracuu {
		box-shadow: none !important;
    width: 100%;
		max-width: 1200px;
		background: #FFFFFF;
		border: 1px solid #DADADA;
		padding: 25px 57px;
	}
  .wrap-c-tracuu-mobile {
    box-shadow: none !important;
    width: 100%;
		max-width: 1200px;
		background: #FFFFFF;
		border: 1px solid #DADADA;
		padding: 15px 15px;
  }
	.wrap-c-tracuu .text-header {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		font-size: 22px;
		line-height: 19px;
		color: #1E7D30;
		text-align: center;
		margin-bottom: 25px;
	}
	.wrap-c-tracuu .label {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #000000;
	}
	.wrap-c-tracuu .text-header-ho-so {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		text-transform: uppercase;
		color: #1E7D30;
		border-bottom: 1px solid #1E7D30;
	}
	.wrap-c-tracuu table {
		border-top: 0px solid #dedede !important
	}
	@media (min-width: 1024px) {
		.about {
			min-height: 100vh;
			display: flex;
			align-items: center;
		}
	}
</style>