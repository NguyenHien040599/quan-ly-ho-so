
<template>
  <div class="wrapp-address-banner">
    <div>
      <span
        ><img src="../assets/images/documents-folder 1.png" alt="img"
      /></span>
      <p>văn bản pháp luật</p>
    </div>

    <div class="mt-4">
      <p class="mb-4">thông tin liên hệ</p>
      <ul>
        <li class="mb-4">
          <span><img src="../assets/images/Vector-1.png" alt="img" /></span>
          <p class="ms-4">
            Trụ sở: 207 Khuất Duy Tiến,
            <span class="text-address">Quận Thanh Xuân, Hà Nội</span>
          </p>
        </li>
        <li>
          <span><img src="../assets/images/Vector.png" alt="img" /></span>
          <p class="ms-4">069.2343647</p>
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <img src="../assets/images/image98.png" alt="img" style="width: 100%" />
    </div>
    <div class="mt-4">
      <img src="../assets/images/congdvc 1.png" alt="img" style="width: 100%" />
    </div>
  </div>
</template>

<style scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
  display: flex;
}
.wrapp-address-banner div:first-child {
  display: flex;
  padding: 8px 0;
  align-items: center;
  justify-content: space-evenly;
  background: url(../assets/images/Group5733.png) no-repeat;
  background-size: cover;
  border-radius: 5px;
}
.wrapp-address-banner div:first-child p {
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}
.wrapp-address-banner div:nth-child(2) {
  background: linear-gradient(180deg, #1e7d30 0%, #003e0c 58.62%);
  border-radius: 5px;
  padding: 10px 36px;
}
.wrapp-address-banner div:nth-child(2) > p {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}

.wrapp-address-banner div:nth-child(2) > ul li p,
.text-address {
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;

  color: #ffffff;
}

.text-address {
  display: block;
  padding-left: 45px;
  line-height: 2;
}
</style>
