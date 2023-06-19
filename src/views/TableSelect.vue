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
    hosoDvcStore.getDanhMuc(filter).then(function(result) {
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
      let danhMuc = [
        {'TenMuc': 'DLCNCB fake-1', 'MaMuc': 'f1', 'Selected': false},
        {'TenMuc': 'DLCNCB fake-2', 'MaMuc': 'f2', 'Selected': false},
        {'TenMuc': 'DLCNCB fake-3', 'MaMuc': 'f3', 'Selected': false}
      ]
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

  onMounted(() => {

  })
  defineExpose({
		danhSachDanhMuc
	})
</script>
<template>
  <v-card class="mx-auto pa-0" style="box-shadow: none !important; overflow: inherit;">
    <v-row class="mx-0">
      <v-col cols="12" class="px-0">
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
                    :model-value="item.raw['Selected']"
                    hide-details
                  ></v-checkbox>
                  <div v-else>
                    {{ item.raw[itemHeader.key] }}
                  </div>
                </td>
              </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

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
