<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  import { useHosoDvcStore } from '@/stores/hosodvc.js'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const hosoDvcStore = useHosoDvcStore()
  const appStore = useAppStore()
  const props = defineProps({
    maDanhMuc: '',
    headers: {
      type: Array,
      default: []
    },
    dataItems: {
      type: Array,
      default: []
    },
    selected: {
      type: Array,
      default: []
    }
  })
	const danhSachDanhMuc = ref([])
  const danhSachSelected = reactive(props.selected)
  const headers = reactive(props.headers)

  const loadingData = ref(false)
  const initData = function () {
    let filter = {
      maDanhMuc: props.maDanhMuc
    }
    hosoDvcStore.getDanhMucEform(filter).then(function(result) {
      let danhMuc = result.content
      if (danhSachSelected && danhSachSelected.length) {
        danhMuc.forEach(element => {
          let exits = danhSachSelected.find(function (item) {
            return item.MaMuc == element.MaMuc
          })
          if (exits) {
            element['Selected'] = true
          } else {
            element['Selected'] = false
          }
        })
      }
      danhSachDanhMuc.value = danhMuc
    }).catch(function(){
      let danhMuc = []
      if (danhSachSelected && danhSachSelected.length) {
        danhMuc.forEach(element => {
          let exits = danhSachSelected.find(function (item) {
            return item.MaMuc == element.MaMuc
          })
          if (exits) {
            element['Selected'] = true
          } else {
            element['Selected'] = false
          }
        })
      }
      danhSachDanhMuc.value = danhMuc
    })
  }
  initData()
  const changeSelect = function (data) {
    console.log('dataChange', data)
    console.log('danhSachDanhMuc', danhSachDanhMuc.value)
  }
  onMounted(() => {

  })
  defineExpose({
		danhSachDanhMuc
	})
</script>
<template>
  <v-card class="mx-auto pa-0 select-danhmuc" style="box-shadow: none !important; overflow: inherit;">
    <v-row class="mx-0 my-0">
      <!-- <v-col cols="12" class="px-0">
        <v-data-table
          :headers="headers"
          :items="danhSachDanhMuc"
          items-per-page="100"
          item-value="MaMuc"
          hide-default-footer
          class="table-base table-select"
          no-data="Không có dữ liệu"
          :loading="loadingData"
          loading-text="Đang tải... "
          return-object
        >
          <template v-slot:item="{ item, index }">
              <tr>
                <td v-for="(itemHeader, indexHeader) in headers" :key="indexHeader" :class="itemHeader['class']">
                  <v-checkbox v-if="itemHeader.type == 'select'"
                    width="50"
                    height="50"
                    v-model="item.raw['Selected']"
                    hide-details
                  ></v-checkbox>
                  <div v-else>
                    {{ item.raw[itemHeader.key] }}
                  </div>
                </td>
              </tr>
          </template>
        </v-data-table>
      </v-col> -->
      <v-col cols="12" md="6" class="px-2 py-1 col-select-dm" v-for="(item, index) in danhSachDanhMuc" :key="index">
        <v-checkbox
          v-model="item['Selected']"
          :label="item['TenMuc']"
          color="#1E7D30"
          :value="true"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>

  </v-card>
</template>

<style scoped>
</style>
