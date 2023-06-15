<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import { useAppStore } from '@/stores/global.js'
  const baseColor = ref(import.meta.env.VITE_APP_BASE_COLOR)
  const appStore = useAppStore()
  const props = defineProps({
    apiSource: '',
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
	const danhSachDanhMuc = reactive(props.dataItems)
  const danhSachSelected = reactive(props.selected)
  const headers = reactive(props.headers)
  const dialog = ref(false)
  const loadingData = ref(false)
  const loading = ref(false)

  const eventClick = function () {
    console.log('run callback')
  }
  const submitAdvanceSearch = function (dataSearch) {
    console.log('dataSearch', dataSearch)
  }
  const submitFormCrud = async function () {
    let valid = await crudFormReference.value.validateForm()
    console.log('validForm', valid)
    if (valid) {
      let dataOutput = crudFormReference.value.submit()
      console.log('dataOutputCrud', dataOutput)
    }
  }
  const showDialog = function (type, data) {
  }

  onMounted(() => {

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
                    :model-value="item.raw['selected']"
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
    <!-- dialog -->
    <v-dialog
      max-width="700"
      v-model="dialog"
      persistent
      absolute
    >
      <v-card>
        <v-toolbar
          dark
          :color="baseColor" class="px-0"
        >
          <v-col class="sub-header d-flex align-center justify-start py-0 px-0">
            <div class="sub-header-content">
              Thêm mới hồ sơ
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
        <v-card-text class="mt-2 px-3">
          <!-- Content dialog -->
        </v-card-text>
        <v-card-actions class="justify-center pb-3 px-3">
          <v-btn
            size="small" variant="elevated"
            :loading="loading"
            :disabled="loading"
            color="error"
            prepend-icon="mdi-close"
            @click.stop="dialog = false"
            class="mr-2"
          >
            Thoát
          </v-btn>
          <v-btn
            size="small" variant="elevated"
            :loading="loading"
            :disabled="loading"
            :color="baseColor"
            prepend-icon="mdi-content-save"
            @click.stop="submitFormCrud"
          >
            Thêm mới
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->

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
