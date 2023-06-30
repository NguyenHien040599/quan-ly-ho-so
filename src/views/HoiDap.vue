<script setup>
import { ref, onMounted, reactive } from "vue";
import TraCuuHoiDap from "./TraCuuHoiDap.vue";


const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR);
const stateComponents = ref(true);
const fileRef = ref(null);
const nameFile = ref("");
const dataForm = reactive({
  HoTen: "",
  ThuDienTu: "",
  SoDienThoai: "",
  DiaChi: "",
  NoiDung: "",
  CapCha: "",
});

const handleSubmit = () => {
  console.log("submit: ", dataForm);
};
const handleReloadCapCha = () => {
  console.log("reload capcha");
};
const handleChangeState = () => {
  stateComponents.value = true;
};
const handleClickFile = () => {
  fileRef.value.click();
};
const handleChangeFile = (evt) => {
  const file = evt?.target.files[0];
  const name = file.name;

  nameFile.value = name;

  console.log("files: ", file, name);
};

onMounted(() => {});
</script>
<template>
  <div class="wrap-content">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12">
          <div class="header-directional">
            <span>Trang chủ &nbsp; > &nbsp; </span>
            <span>&nbsp;Thông tin hỗ trợ</span>
            <span>&nbsp; > &nbsp;</span>
            <span>&nbsp;Hỏi đáp tư vấn</span>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="stateComponents">
        <v-col cols="12" sm="9">
          <div class="wrap-form">
            <div class="header-form">Đặt câu hỏi</div>
            <div class="header-line my-5"></div>
            <v-form class="wrap-form__form">
              <div class="form-group my-2">
                <div class="titleText mb-2">
                  Họ và tên người gửi: <span style="color: red">*</span>
                </div>
                <v-text-field
                  v-model="dataForm.HoTen"
                  solo
                  dense
                  hide-details="auto"
                  required
                  class="input-form"
                ></v-text-field>
              </div>
              <div class="form-group my-2">
                <div class="titleText mb-2">
                  Thư điện tử: <span style="color: red">*</span>
                </div>
                <v-text-field
                  v-model="dataForm.ThuDienTu"
                  solo
                  dense
                  hide-details="auto"
                  required
                  class="input-form"
                ></v-text-field>
              </div>
              <div class="form-group my-2">
                <div class="titleText mb-2">
                  Số điện thoại liên hệ: <span style="color: red">*</span>
                </div>
                <v-text-field
                  v-model="dataForm.SoDienThoai"
                  solo
                  dense
                  hide-details="auto"
                  required
                  class="input-form"
                ></v-text-field>
              </div>
              <div class="form-group my-2">
                <div class="titleText mb-2">
                  Địa chỉ: <span style="color: red">*</span>
                </div>
                <v-text-field
                  v-model="dataForm.DiaChi"
                  solo
                  dense
                  hide-details="auto"
                  required
                  class="input-form"
                ></v-text-field>
              </div>

              <div class="form-group my-2">
                <div class="titleText mb-2">
                  Tài liệu đính kèm: <span style="color: red">*</span>
                </div>
                <div>
                  <v-btn
                    @click="handleClickFile"
                    size="small"
                    :color="baseColor"
                  >
                    Chọn tệp
                  </v-btn>

                  <p class="ms-4">{{ nameFile }}</p>
                </div>
              </div>

              <div class="form-group my-2">
                <div class="titleText mb-2">
                  Nội dung câu hỏi: <span style="color: red">*</span>
                </div>
                <v-textarea
                  v-model="dataForm.NoiDung"
                  solo
                  dense
                  hide-details="auto"
                  required
                  class="input-form"
                  :rows="2"
                ></v-textarea>
              </div>
              <div class="form-group form-capcha my-2">
                <div class="titleText mb-2">
                  Mã capcha: <span style="color: red">*</span>
                </div>

                <div class="d-flex align-center">
                  <v-text-field
                    v-model="dataForm.CapCha"
                    solo
                    dense
                    hide-details="auto"
                    required
                    class="input-form"
                  ></v-text-field>
                  <span class="wrap-img-capcha"
                    ><img src="../assets/images/image100.png" alt="capcha"
                  /></span>
                  <v-btn
                    @click="handleReloadCapCha"
                    size="small"
                    icon="mdi-sync"
                    :color="baseColor"
                  ></v-btn>
                </div>
              </div>
              <div class="d-flex justify-center mt-5">
                <v-btn
                  size="small"
                  variant="outlined"
                  :color="baseColor"
                  @click="handleSubmit"
                >
                  Gửi câu hỏi
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" sm="3">
          <div class="wrapp-address-banner" @click="handleChangeState">
            <span><img src="../assets/images/magnifier.png" alt="img" /></span>
            <p>Tra cứu kết quả</p>
          </div>
          <div class="wrapp-note">
            <p>Lưu ý</p>
            <div>
              <p>Vui lòng <span>đăng nhập</span> để thực hiện đặt câu hỏi</p>
            </div>
          </div>
        </v-col>
      </v-row>
      <TraCuuHoiDap v-else />
    </v-container>
    <input
      ref="fileRef"
      @change="handleChangeFile"
      class="hidden-input"
      type="file"
    />
  </div>
</template>

<style scoped>
.wrap-form {
  padding: 20px;
  border: 1px solid #dadada;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
}
.wrap-img-capcha {
  margin: 0 32px;
  border: 1px solid #1e7d30;
}
.header-form {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #1e7c30;
}

.form-capcha > div:last-child {
  flex: 1;
}

.wrapp-address-banner {
  cursor: pointer;
  display: flex;
  padding: 8px 0;
  align-items: center;
  justify-content: space-evenly;
  background: url(../assets/images/Group5733.png) no-repeat;
  background-size: cover;
  border-radius: 5px;
}
.wrapp-address-banner p {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}

.wrapp-note {
  margin-top: 32px;
}
.wrapp-note > p {
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-transform: uppercase;

  color: #1e7d30;
}
.wrapp-note div {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  padding: 15px;
  border-top: 1px solid #1e7d30;
}
.wrapp-note div > p {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
}
.wrapp-note div > p > span {
  cursor: pointer;
  color: #1e7d30 !important;
}

.header-line {
  border: 10px solid;
  border-image-slice: 1;
  border-width: 1px;
  border-image-source: linear-gradient(to left, #fff, #1e7d30);
}

.form-group {
  display: flex;
}

.form-group .titleText {
  width: 22%;
}

.header-directional > span:last-child {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;

  color: #1e7d30;
}

.hidden-input {
  position: absolute;
  top: -1000px;
  left: -1000px;
  opacity: 0;
}

@media (min-width: 1024px) {
  .wrap-content {
    min-height: 100vh;
  }
}
</style>
