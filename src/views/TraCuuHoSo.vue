<script setup>
  import { useCookies } from 'vue3-cookies'
  import { ref, reactive, computed, onMounted, watch, defineAsyncComponent } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)

  const appStore = useAppStore()
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
  const listStudent = reactive([
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "Thông báo vi phạm",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "A2931-123412",
        "NgaySinh": "1999-04-27T17:00:00",
        "GioiTinh": {
            "type": "C_GioiTinh",
            "MaMuc": "1",
            "TenMuc": "Mới"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    },
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "Thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "A2931-123412",
        "NgaySinh": "1999-04-27T17:00:00",
        "GioiTinh": {
            "type": "C_GioiTinh",
            "MaMuc": "1",
            "TenMuc": "Đang xử lý"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    },
    {
        "type": "T_SinhVien",
        "PrimKey": "63fc1960b3bbb7226f56e0a1",
        "MaDinhDanh": "72627e9d-5304-4888-8121-10cdaa23e363-wzbi4snsomf5f4dl",
        "ThoiGianTao": "2023-02-27T02:45:52",
        "ThoiGianCapNhat": "2023-02-27T07:40:45",
        "TimeCreate": 1677465952701,
        "TimeUpdate": 1677483645662,
        "NguoiTaoLap": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "NguoiCapNhat": {
            "type": "T_DanhTinhDienTu",
            "maDinhDanh": "",
            "tenDinhDanh": "",
            "maSoID": ""
        },
        "MaSinhVien": "Thay đổi nội dung hồ sơ chuyển dữ liệu cá nhân ra nước ngoài",
        "SoHoSo": "2",
        "SoBaoDanh": "2",
        "MaNhapHoc": "2",
        "HoVaTen": "A2931-123412",
        "NgaySinh": "1999-04-27T17:00:00",
        "GioiTinh": {
            "type": "C_GioiTinh",
            "MaMuc": "1",
            "TenMuc": "Hoàn thành"
        },
        "DanToc": {
            "type": "C_DanToc",
            "MaMuc": "",
            "TenMuc": ""
        },
        "TonGiao": {
            "type": "C_TonGiao",
            "MaMuc": "",
            "TenMuc": ""
        },
        "QuocTich": {
            "type": "C_QuocGia",
            "MaMuc": "",
            "TenMuc": ""
        },
        "GiayToTuyThan": [],
        "DanhBaLienLac": {
            "type": "S_DanhBaLienLac",
            "ThuDienTu": "",
            "SoDienThoai": "0355620860",
            "SoFax": ""
        },
        "DanhTinhDienTu": [],
        "EmailVNU": "zxt@gmail.com",
        "ChungMinhThu": "012345678",
        "MainImage": {
            "type": "T_Attachment",
            "Id": null,
            "FileName": null,
            "FileUrl": null
        },
        "MaLopKhoaHoc": null,
        "TenLopKhoaHoc": null
    }
  ])
  const loadingData = ref(false)
  const loading = ref(false)
	const itemsPerPage = ref(10)
  const page = ref(1)
  const pageCount = ref(3)
  const total = ref(5)
	const dossierNo = ref("")
	const secretCode = ref("")
	const kqTraCuu = ref(false)
	const dsHoSo = reactive([
		{
			id: 1,
			dossierNo: "A90123-12314123",
			dossierName: "Thông báo vi phạm quy định về bảo vệ dữ liệu cá nhân",
			applicantName: "Lê Thị Hoàng Phương"
		},
		{
			id: 2,
			dossierNo: "B90123-12314123",
			dossierName: "Lập và gửi hồ sơ đánh giá tác động xử lý dữ liệu cá nhân ",
			applicantName: "Lê Thị Hoàng Phương"
		},
		{
			id: 3,
			dossierNo: "C90123-12314123",
			dossierName: "Thông báo thay đổi nội dung hồ sơ đánh giá tác động xử lý dữ liệu cá nhân",
			applicantName: "Lê Thị Hoàng Phương"
		},
	])
  const eventClick = function () {
    console.log('run callback')
  }
  const action = function () {
    loading.value = true
    setTimeout(function () {
      loading.value = false
    }, 300)
  }
	const traCuu = function () {
		kqTraCuu.value = true
	}
  const redirectTo = function (menu) {
    appStore.SET_MENU_SELECTED(menu)
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
  onMounted(() => {

  })
</script>
<template>
  <v-card class="wrap-c-tracuu mx-auto mt-3">
    <v-row justify="center" class="mx-0 my-0">
      <v-col cols="12" class="px-0 py-0 text-header">
				TRA CỨU HỒ SƠ
			</v-col>
    </v-row>
		<v-row class="mx-0 my-0" style="margin-bottom: 18px !important;">
      <v-col cols="12" sm="6" md="5" class="px-0 py-0" style="line-height: 32px;">
				<span class="label">Mã hồ sơ/ Mã số thuế/ Mã số doanh nghiệp </span>
				<span style="color: #EB0202">*</span>
			</v-col>
			<v-col cols="12" sm="6" md="7" class="px-0 py-0">
				<v-text-field
					class="flex input-form"
					v-model="dossierNo"
					placeholder="Nhập mã hồ sơ/ mã số thuế/ mã số doanh nghiệp"
					solo
					dense
					hide-details="auto"
					clearable
				></v-text-field>
			</v-col>
    </v-row>
		<v-row class="mx-0 my-0">
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
    </v-row>
		<v-row justify="center" class="mx-0 my-0" style="margin-top: 25px !important; margin-bottom: 25px !important">
			<v-btn
				size="small"
				color="#1E7D30"
				class="mx-0" style="float: right"
				@click.stop="traCuu"
				height="35px" width="120px"
			>
				<v-icon size="24" color="#ffffff" class="mr-2">mdi-magnify</v-icon>
				<span style="font-size: 16px">Tra cứu</span>
			</v-btn>
    </v-row>
    <!-- table -->
    <v-row v-if="kqTraCuu" class="mx-0 mt-3">
      <v-col cols="12" class="px-0">
				<div class="mb-2" style="font-style: italic;font-weight: 400;font-size: 14px;line-height: 16px;color: #1E7D30;">
					<span>Kết quả tra cứu: </span>
					<span style="font-weight: 600">{{ total }} hồ sơ</span>
				</div>
        <v-data-table
          :headers="headers"
          :items="listStudent"
          v-model:items-per-page="itemsPerPage"
          item-value="PrimKey"
          hide-default-footer
          class="table-base"
          no-data="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
        >
          <template v-slot:item="{ item, index }">
            <tr>
              <td class="align-center" width="70">{{ index + 1 }}</td>
              <td class="align-left">{{ item.columns.HoVaTen }}</td>
              <td>{{ dateLocale(item.columns.NgaySinh) }}</td>
              <td class="align-left">{{ item.columns.MaSinhVien }}</td>
              <td>{{ item.columns.GioiTinh.TenMuc }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <div class="mt-4">
			<v-row class="my-0 mx-0">
				<v-col cols="12" class="px-0 py-0 text-header-ho-so py-2">
					HỒ SƠ MỚI TIẾP NHẬN
				</v-col>
			</v-row>
			<div>
				<v-row v-for="(item, index) in dsHoSo" :key="index" class="mx-0 my-0 mt-2" style="align-items: center;">
					<v-col class="px-0 py-0" style="max-width: 40px">
						<v-icon size="28" color="#1E7D30" class="mr-2">mdi-file-document-check-outline</v-icon>
					</v-col>
					<v-col class="py-0">
						<div>
							<span style="font-weight: 600;">{{ item.dossierNo }}</span> - <span>{{ item.dossierName }}</span>
						</div>
						<div style="font-style: italic;">
							<span>(Chủ hồ sơ: </span> <span>{{ item.applicantName }})</span>
						</div>
					</v-col>
				</v-row>
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