import {
    defineStore
} from "pinia";
import {
    fetchGetApi,
    fetchPostApi
} from "../api";


export const thongTinTaiKhoanStore = defineStore("thongTinTaiKhoan", {
    state: () => ({
        thongTinTaiKhoan: null,
    }),

    getters: {

    },

    actions: {
        async getItemsApi({
            type,
            payload = null,
            params = null
        }) {
            const {
                data
            } = await fetchGetApi("get", type, params);
            this.thongTinTaiKhoan = data;
        },
        async postItemApi({type,
            payload = null, cb}) {

            try {
                const result = await fetchPostApi("post", type, payload);
                cb()
                console.log("result: ", result, )
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