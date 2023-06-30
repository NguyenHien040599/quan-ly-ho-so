<template>
  <div class="wrap-content">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12">
          <div class="header-directional">
            <span>Trang chủ &nbsp; > &nbsp; </span>
            <span>&nbsp;Thông tin tài khoản</span>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="12">
          <FormInforAccount
            @emit-submit="handleSubmit"
            v-if="typeDisplayForm === 'CN'"
          >
            <template #content-form>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Họ và tên:</div>
                  <v-text-field
                    disabled
                    v-model="formDataCN.HoVaTen"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Số CMTND:</div>
                  <v-text-field
                    disabled
                    v-model="formDataCN.cmt"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Số định danh cá nhân (CCCD):</div>
                  <v-text-field
                    disabled
                    v-model="formDataCN.cccd"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Ngày sinh:</div>
                  <VueDatePicker
                    v-model="formDataCN.NgaySinh"
                    :enable-time-picker="false"
                    :format="dateFormat"
                    class="field-datePicker"
                    :disabled="true"
                  >
                    <template
                      #dp-input="{
                        value,
                        onInput,
                        onEnter,
                        onTab,
                        onClear,
                        onBlur,
                        onKeypress,
                        onPaste,
                        isMenuOpen,
                      }"
                    >
                      <v-text-field
                        disabled
                        :value="value"
                        solo
                        dense
                        hide-details="auto"
                        required
                        class="input-form"
                      ></v-text-field>
                    </template>
                  </VueDatePicker>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Giới tính:</div>
                  <v-autocomplete
                    v-model="formDataCN.GioiTinh"
                    class="flex input-form"
                    hide-no-data
                    :items="dsGioiTinh"
                    disabled
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="9">
                  <div class="titleText mb-2">Nơi sinh:</div>
                  <v-text-field
                    disabled
                    v-model="formDataCN.NoiSinh"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Thường trú:</div>
                  <v-autocomplete
                    v-model="formDataCN.ThuongTruTT"
                    class="flex input-form"
                    hide-no-data
                    :items="dsTinhThanh"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    disabled
                    dense
                    solo
                    hide-details="auto"
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText" style="margin-top: 31px"></div>
                  <v-autocomplete
                    v-model="formDataCN.ThuongTruQH"
                    class="flex input-form"
                    hide-no-data
                    disabled
                    :items="dsThuongTruQH"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText" style="margin-top: 31px"></div>
                  <v-autocomplete
                    v-model="formDataCN.ThuongTruPX"
                    class="flex input-form"
                    hide-no-data
                    disabled
                    :items="dsThuongTruPX"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Số điện thoại liên hệ:</div>
                  <v-text-field
                    v-model="formDataCN.sdt"
                    disabled
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="titleText mb-2">Địa chỉ chi tiết:</div>
                  <v-text-field
                    disabled
                    v-model="formDataCN.DiaChiChiTiet"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Email:</div>
                  <v-text-field
                    disabled
                    v-model="formDataCN.email"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
            <template #content-form-extra>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Địa chỉ liên hệ:</div>
                  <v-autocomplete
                    v-model="formDataCN.DiaChiLienHeTT"
                    placeholder="Chọn tỉnh/thành"
                    class="flex input-form"
                    hide-no-data
                    :items="dsTinhThanh"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                    @update:modelValue="handleChangeDiaChiChiTiet('TT', 'CN')"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText" style="margin-top: 31px"></div>
                  <v-autocomplete
                    v-model="formDataCN.DiaChiLienHeQH"
                    placeholder="Chọn quận/huyện"
                    class="flex input-form"
                    hide-no-data
                    :items="dsDiaChiChiTietQH"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                    @update:modelValue="handleChangeDiaChiChiTiet('QH', 'CN')"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText" style="margin-top: 31px"></div>
                  <v-autocomplete
                    v-model="formDataCN.DiaChiLienHePX"
                    placeholder="Chọn phường/xã"
                    class="flex input-form"
                    hide-no-data
                    :items="dsDiaChiChiTietPX"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                    @update:modelValue="handleChangeDiaChiChiTiet('PX', 'CN')"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="titleText mb-2">Chi tiết:</div>
                  <v-text-field
                    v-model="formDataCN.ChiTiet"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập địa chỉ chi tiết tên đường, thôn xóm"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </FormInforAccount>

          <FormInforAccount
            @emit-submit="handleSubmit"
            v-else-if="typeDisplayForm === 'DN'"
          >
            <template #content-form>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Mã số thuế:</div>
                  <v-text-field
                    v-model="formDataDN.MaSoThue"
                    placeholder="Nhập..."
                    disabled
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Mã số doanh nghiệp:</div>
                  <v-text-field
                    v-model="formDataDN.MaSoDoanhNghiep"
                    disabled
                    placeholder="Nhập..."
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Email:</div>
                  <v-text-field
                    v-model="formDataDN.Email"
                    disabled
                    placeholder="Nhập địa chỉ email cá nhân"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Số điện thoại liên hệ:</div>
                  <v-text-field
                    v-model="formDataDN.Sdt"
                    disabled
                    placeholder="Nhập số điện thoại"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="titleText mb-2">Tên doanh nghiệp:</div>
                  <v-text-field
                    v-model="formDataDN.TenDoanNghiep"
                    disabled
                    placeholder="Nhập..."
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="titleText mb-2">Địa chỉ doanh nghiệp:</div>
                  <v-text-field
                    v-model="formDataDN.DiaChi"
                    disabled
                    placeholder="Nhập địa chỉ chi tiết tê đường, thôn xóm"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template #content-form-extra>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="titleText mb-2">Địa chỉ giao dịch:</div>
                  <v-text-field
                    v-model="formDataDN.DiaChiGiaoDich"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập địa chỉ chi tiết tên đường, thôn xóm"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </FormInforAccount>

          <FormInforAccount @emit-submit="handleSubmit" v-else>
            <template #content-form>
              <v-row>
                <v-col col="12" sm="3">
                  <div class="titleText mb-2">Mã đơn vị:</div>
                  <v-autocomplete
                    v-model="formDataNN.MaDonVi"
                    class="flex input-form"
                    placeholder="Chọn"
                    hide-no-data
                    :items="[]"
                    disabled
                    item-text="tenGoi"
                    item-value="maHanhChinh"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                  >
                  </v-autocomplete>
                </v-col>
                <v-col col="12" sm="9">
                  <div class="titleText mb-2">Đơn vị chủ quản:</div>
                  <v-autocomplete
                    v-model="formDataNN.DonViChuQuan"
                    class="flex input-form"
                    hide-no-data
                    placeholder="Chọn"
                    :items="[]"
                    disabled
                    item-text="tenGoi"
                    item-value="maHanhChinh"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12" sm="12">
                  <div class="titleText mb-2">Tên tổ chức:</div>
                  <v-text-field
                    v-model="formDataNN.TenToChuc"
                    disabled
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập..."
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12" sm="12">
                  <div class="titleText mb-2">Địa chỉ cơ quan nhà nước:</div>
                  <v-text-field
                    v-model="formDataNN.DiaChiCoQuan"
                    disabled
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập địa chỉ chi tiết"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Email:</div>
                  <v-text-field
                    v-model="formDataNN.Email"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập địa chỉ email cá nhân"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Số điện thoại liên hệ:</div>
                  <v-text-field
                    solo
                    v-model="formDataNN.Sdt"
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập số điện thoại"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
            <template #content-form-extra>
              <v-row>
                <v-col cols="12" sm="3">
                  <div class="titleText mb-2">Địa chỉ liên hệ:</div>
                  <v-autocomplete
                    v-model="formDataNN.DiaChiLienHeTT"
                    placeholder="Chọn tỉnh/thành"
                    class="flex input-form"
                    hide-no-data
                    :items="dsTinhThanh"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                    @update:modelValue="handleChangeDiaChiChiTiet('TT', 'NN')"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText" style="margin-top: 31px"></div>
                  <v-autocomplete
                    v-model="formDataNN.DiaChiLienHeQH"
                    placeholder="Chọn quận/huyện"
                    class="flex input-form"
                    hide-no-data
                    :items="dsDiaChiChiTietQH"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                    @update:modelValue="handleChangeDiaChiChiTiet('QH', 'NN')"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <div class="titleText" style="margin-top: 31px"></div>
                  <v-autocomplete
                    v-model="formDataNN.DiaChiLienHePX"
                    placeholder="Chọn phường/xã"
                    class="flex input-form"
                    hide-no-data
                    :items="dsDiaChiChiTietPX"
                    item-title="TenMuc"
                    item-value="MaMuc"
                    dense
                    solo
                    hide-details="auto"
                    clearable
                    return-object
                    @update:modelValue="handleChangeDiaChiChiTiet('PX', 'NN')"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12">
                  <div class="titleText mb-2">Chi tiết:</div>
                  <v-text-field
                    v-model="formDataNN.ChiTiet"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                    placeholder="Nhập địa chỉ chi tiết tên đường, thôn xóm"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </FormInforAccount>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import FormInforAccount from "../containerComponents/FormInforAccount.vue";
import { thongTinTaiKhoanStore } from "../stores/thongTinTaiKhoan";
import { storeToRefs } from "pinia";
import { fetchGetApi } from "../api/index";
import toastr from "toastr";

const { getItemsApi, postItemApi } = thongTinTaiKhoanStore();
const { thongTinTaiKhoan } = storeToRefs(thongTinTaiKhoanStore());
const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR);
const typeDisplayForm = ref("");
const dsTinhThanh = ref([]);
const dsThuongTruQH = ref([]);
const dsThuongTruPX = ref([]);
const dsDiaChiChiTietQH = ref([]);
const dsDiaChiChiTietPX = ref([]);
const dsGioiTinh = ref([]);
const thongtinChiTiet = ref(null);
const formDataCN = ref({
  HoVaTen: "",
  cmt: "",
  cccd: "",
  NgaySinh: "",
  GioiTinh: "",
  NoiSinh: "",
  ThuongTruTT: "",
  ThuongTruQH: "",
  ThuongTruPX: "",
  sdt: "",
  email: "",
  DiaChiLienHeTT: "",
  DiaChiLienHeQH: "",
  DiaChiLienHePX: "",
  ChiTiet: "",
  DiaChiChiTiet: "",
});
const formDataDN = ref({
  MaSoThue: "",
  MaSoDoanhNghiep: "",
  Email: "",
  Sdt: "",
  TenDoanNghiep: "",
  DiaChi: "",
  DiaChiGiaoDich: "",
});
const formDataNN = ref({
  MaDonVi: "",
  DonViChuQuan: "",
  TenToChuc: "",
  DiaChiCoQuan: "",
  Email: "",
  Sdt: "",
  DiaChiLienHeTT: "",
  DiaChiLienHeQH: "",
  DiaChiLienHePX: "",
  ChiTiet: "",
});

const dateFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const handleSubmit = () => {
  if (typeDisplayForm.value === "CN") {
    const payload = {
      ...thongtinChiTiet.value,
      NoiOHienTai: {
        HuyenQuan: {
          MaMuc: formDataCN.value.DiaChiLienHeQH.MaMuc,
          TenMuc: formDataCN.value.DiaChiLienHeQH.TenMuc,
        },
        SoNhaChiTiet: formDataCN.value.DiaChiChiTiet,
        TinhThanh: {
          MaMuc: formDataCN.value.DiaChiLienHeTT.MaMuc,
          TenMuc: formDataCN.value.DiaChiLienHeTT.TenMuc,
        },
        XaPhuong: {
          MaMuc: formDataCN.value.DiaChiLienHePX.MaMuc,
          TenMuc: formDataCN.value.DiaChiLienHePX.TenMuc,
        },
      },
    };

    postItemApi({
      type: `citizenmgt/internal/canhan/1.0/${thongtinChiTiet.value.primKey}`,
      payload,
      cb: () => toastr.success("Thao tác thành công"),
    });

    console.log("submit form CN", payload, formDataCN.value);
  } else if (typeDisplayForm.value === "DN") {
    const payload = {
      ...thongtinChiTiet.value,
    };

    postItemApi({
      type: `cmcmgt/internal/donvikinhdoanh/1.0/${thongtinChiTiet.value.primKey}`,
      payload,
      cb: () => toastr.success("Thao tác thành công"),
    });

    console.log("submit form DN");
  } else {
    const payload = {
      ...thongtinChiTiet.value,
    };

    postItemApi({
      type: `orgmgt/internal/coquandonvi/1.0/${thongtinChiTiet.value.primKey}`,
      payload,
      cb: () => toastr.success("Thao tác thành công"),
    });
    console.log("submit form");
  }
};
const getData = async (type, varirableRef, params = null) => {
  const result = await fetchGetApi(
    "get",
    `cmonmgt/internal/${type}/1.0/filter`,
    params
  );
  varirableRef.value = result.data.content;
};
const handleChangeDiaChiChiTiet = (type, typeForm) => {
  const formData = typeForm === "NN" ? formDataNN : formDataCN;

  if (type === "TT") {
    formData.value = {
      ...formData.value,
      ChiTiet: "",
      DiaChiLienHeQH: "",
      DiaChiLienHePX: "",
    };
  } else if (type === "QH") {
    formData.value = {
      ...formData.value,
      ChiTiet: "",
      DiaChiLienHePX: "",
    };
  } else {
    formData.value = {
      ...formData.value,
      ChiTiet: "",
    };
  }
};
getItemsApi({
  type: "idpmgt/internal/security/profile",
});

watch(thongTinTaiKhoan, async (value) => {
  console.log("value: ", value);
  if (value.CaNhan && value.CaNhan?.primKey) {
    const result = await fetchGetApi(
      "get",
      `citizenmgt/internal/canhan/1.0/${value.CaNhan?.primKey}`
    );

    thongtinChiTiet.value = result.data.resp;

    getData("tinhthanh", dsTinhThanh);
    getData("huyenquan", dsThuongTruQH);
    getData("xaphuong", dsThuongTruPX);
    getData("gioitinh", dsGioiTinh);
    typeDisplayForm.value = "CN";
    const data = value.CaNhan;
    formDataCN.value = {
      HoVaTen: data.HoVaTen || "",
      cmt: data.MaDinhDanh || "",
      cccd: data.MaDinhDanh || "",
      NgaySinh: data.NgaySinh || "",
      GioiTinh: data.GioiTinh || "",
      NoiSinh:
        data.NoiSinh.XaPhuong.TenMuc &&
        data.NoiSinh.HuyenQuan.TenMuc &&
        data.NoiSinh.TinhThanh.TenMuc
          ? `${data.NoiSinh.XaPhuong.TenMuc} - ${data.NoiSinh.HuyenQuan.TenMuc} - ${data.NoiSinh.TinhThanh.TenMuc}`
          : "",
      ThuongTruTT: data.DiaChiThuongTru.TinhThanh || "",
      ThuongTruQH: data.DiaChiThuongTru.HuyenQuan || "",
      ThuongTruPX: data.DiaChiThuongTru.XaPhuong || "",
      sdt: data.DanhBaLienLac[0].SoDienThoai || "",
      email: data.DanhBaLienLac[0].ThuDienTu || "",
      DiaChiLienHeTT: data.NoiOHienTai.TinhThanh || "",
      DiaChiLienHeQH: data.NoiOHienTai.HuyenQuan || "",
      DiaChiLienHePX: data.NoiOHienTai.XaPhuong || "",
      ChiTiet: data.NoiOHienTai.SoNhaChiTiet
        ? `${data.NoiOHienTai.SoNhaChiTiet} - ${data.NoiOHienTai.XaPhuong.TenMuc} - ${data.NoiOHienTai.HuyenQuan.TenMuc} - ${data.NoiOHienTai.TinhThanh.TenMuc}`
        : "",
      DiaChiChiTiet: data.DiaChiThuongTru.SoNhaChiTiet
        ? `${data.DiaChiThuongTru.SoNhaChiTiet} - ${data.DiaChiThuongTru.XaPhuong.TenMuc} - ${data.DiaChiThuongTru.HuyenQuan.TenMuc} - ${data.DiaChiThuongTru.TinhThanh.TenMuc}`
        : "",
    };
  } else if (value.DonViKinhDoanh && value.DonViKinhDoanh?.primKey) {
    const result = await fetchGetApi(
      "get",
      `cmcmgt/internal/donvikinhdoanh/1.0/${value.DonViKinhDoanh?.primKey}`
    );

    thongtinChiTiet.value = result.data.resp;
    typeDisplayForm.value = "DN";
    const data = value.DonViKinhDoanh;
    formDataDN.value = {
      MaSoThue: data.MaSoThue || "",
      MaSoDoanhNghiep: data.MaDinhDanh || "",
      Email: data.DanhBaLienLac[0].ThuDienTu || "",
      Sdt: data.DanhBaLienLac[0].SoDienThoai || "",
      TenDoanNghiep: data.TenGoi || "",
      DiaChi:
        data.DiaChiHoatDong.TinhThanh.TenMuc &&
        data.DiaChiHoatDong.HuyenQuan.TenMuc &&
        data.DiaChiHoatDong.XaPhuong.TenMuc
          ? `${data.DiaChiHoatDong.TinhThanh.TenMuc} - ${data.DiaChiHoatDong.HuyenQuan.TenMuc} - ${data.DiaChiHoatDong.XaPhuong.TenMuc}`
          : "",
      DiaChiGiaoDich: "",
    };
  } else {
    getData("tinhthanh", dsTinhThanh);
    const result = await fetchGetApi(
      "get",
      `orgmgt/internal/coquandonvi/1.0/${value.CoQuanDonVi?.primKey}`
    );
    thongtinChiTiet.value = result.data.resp;
    typeDisplayForm.value = "NN";
    const data = value.CoQuanDonVi;
    formDataNN.value = {
      MaDonVi: data.MaDinhDanh || "",
      DonViChuQuan: "",
      TenToChuc: data.TenGoi || "",
      DiaChiCoQuan:
        data.DiaChiHoatDong.TinhThanh.TenMuc &&
        data.DiaChiHoatDong.HuyenQuan.TenMuc &&
        data.DiaChiHoatDong.XaPhuong.TenMuc
          ? `${data.DiaChiHoatDong.TinhThanh.TenMuc} - ${data.DiaChiHoatDong.HuyenQuan.TenMuc} - ${data.DiaChiHoatDong.XaPhuong.TenMuc}`
          : "",
      Email: data.DanhBaLienLac[0].ThuDienTu || "",
      Sdt: data.DanhBaLienLac[0].SoDienThoai || "",
      DiaChiLienHeTT: "",
      DiaChiLienHeQH: "",
      DiaChiLienHePX: "",
      ChiTiet: "",
    };
  }
});

const valueThuongTruTT = computed(() => formDataCN.value.DiaChiLienHeTT);
const valueThuongTruQH = computed(() => formDataCN.value.DiaChiLienHeQH);
const valueThuongTruTTfromNN = computed(() => formDataNN.value.DiaChiLienHeTT);
const valueThuongTruQHfromNN = computed(() => formDataNN.value.DiaChiLienHeQH);

watch([valueThuongTruTT, valueThuongTruTTfromNN], (value) => {
  for (const item of value) {
    if (typeof item === "object") {
      getData("huyenquan", dsDiaChiChiTietQH, { thamChieu_maMuc: item.MaMuc });
      break;
    }
  }
});
watch([valueThuongTruQH, valueThuongTruQHfromNN], (value) => {
  for (const item of value) {
    if (typeof item === "object") {
      getData("xaphuong", dsDiaChiChiTietPX, { thamChieu_maMuc: item.MaMuc });
      break;
    }
  }
});
</script>

<style>
.field-datePicker i::before {
  color: #1e7d30 !important;
}
.header-directional > span:last-child {
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;

  color: #1e7d30;
}
@media (min-width: 1024px) {
  .wrap-content {
    min-height: 100vh;
  }
}
</style>
