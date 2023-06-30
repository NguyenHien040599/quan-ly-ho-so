import { defineStore } from "pinia";

export const hoiDapStore = defineStore("hoiDap", {
  state: () => ({
    dsHoiDap: [],
  }),

  getters: {},

  actions: {
    async getItemsApi({
      type,
      params = null
    }) {
      const {
        data
      } = await fetchGetApi("get", type, params);
      this.dsThuTucHanhChinh = data;
    },
    async addItemApi(payload) {
      try {
        const result = await fetchPostApi("post", "todos", payload);
        const cloneData = [...this.listTodo];
        cloneData.unshift(result.data);
        this.listTodo = cloneData;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItemApi(id) {
      try {
        const result = await fetchDeleteApi("delete", "todos", id);
        this.listTodo = this.listTodo.reduce(function (res, cur) {
          if (id !== cur.id) {
            res.push(cur);
          }
          return res;
        }, []);
      } catch (error) {
        console.log(error);
      }
    },
    async editItemApi(payload) {
      try {
        const result = await fetchEditApi("put", "todos", payload);
        this.listTodo = this.listTodo.reduce(function (res, cur) {
          if (payload.id === cur.id) return [...res, payload];
          else return [...res, cur];
        }, []);
      } catch (error) {
        console.log(error);
      }
    },
  },
});