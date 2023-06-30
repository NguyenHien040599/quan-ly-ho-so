<script setup>
import { ref, reactive, computed, onMounted } from "vue";
const appName = ref(import.meta.env.NODE_ENV);
const publicPath = ref(import.meta.env.VITE_APP_PULIC_PATH);
</script>

<template>
  <v-footer app id="footer" class="px-3">
    <div class="d-flex flex-wrap justify-space-between w-100">
      <div class="text-1 d-flex">
        <v-icon
          size="18"
          color="#1E7C30"
          icon="mdi:mdi-copyright"
          class="mr-2"
        ></v-icon
        >&nbsp;
        <span
          >CỤC AN NINH MẠNG và phòng chống tội phạm sử dụng công nghệ cao
        </span>
      </div>

      <div class="text-3 d-flex">
        <v-icon
          size="18"
          color="#1E7C30"
          icon="mdi:mdi-map-marker-outline"
          class="mr-2"
        ></v-icon
        >&nbsp;
        <span>Trụ sở: 207 Khuất Duy Tiến, quận Thanh Xuân, Hà Nội</span>
      </div>

      <div class="text-2 d-flex">
        <v-icon
          size="18"
          color="#1E7C30"
          icon="mdi:mdi-phone-in-talk-outline"
          class="mr-2"
        ></v-icon
        >&nbsp;
        <span>Hotline: 069.2343647</span>
      </div>
    </div>
  </v-footer>
</template>


<style>
#footer {
  height: 36px;
  /* background: url(/images/bg-footer.png) no-repeat; */
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3) !important;
  background-color: #e8eaed;
  background-size: cover;
  padding: 0;
  width: 100% !important;
}
#footer .container {
  height: 36px;
  padding: 10px;
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  align-content: center;
}
.image-footer {
  text-align: right;
}
#footer .text-1
{
  /* min-width: 250px; */
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  color: #00803d;
}

#footer .text-2 > span
 {
  font-weight: 400;
font-size: 14px;
line-height: 16px;

color: #1E7D30;

text-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
}

#footer .text-3 > span {
  font-weight: 400;
font-size: 13px;
line-height: 15px;

color: #1E7D30;

text-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
}
#footer span {
  font-weight: 700;
}
#footer .text-2 {
  text-align: center;
}
#footer .text-3 {
  text-align: right;
}
.image-footer .img-1 {
  margin-right: 15px;
}
@media screen and (max-width: 426px) {
  #footer,
  #footer .container {
    height: 90px;
  }
  #footer .text-2,
  #footer .text-3 {
    text-align: left;
    margin-top: 5px;
  }
}
@media screen and (min-width: 426px) and (max-width: 769px) {
  #footer,
  #footer .container {
    height: 56px;
  }
  #footer .text-2,
  #footer .text-3 {
    text-align: left;
    margin-top: 5px;
  }
}
@media screen and (min-width: 769px) and (max-width: 1023px) {
  #footer,
  #footer .container {
    height: 56px;
  }
  #footer .text-1 {
    width: 100%;
  }
  #footer .text-2,
  #footer .text-3 {
    text-align: left;
    margin-top: 5px;
  }
}
</style>
