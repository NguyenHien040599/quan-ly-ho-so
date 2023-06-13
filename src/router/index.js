import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: 'thu-tuc-hanh-chinh',
          name: 'ThuTucHanhChinh',
          component: () => import('@/views/ThuTucHanhChinh.vue'),
          props: true
        },
        {
          path: 'tra-cuu-ho-so',
          name: 'TraCuuHoSo',
          component: () => import('@/views/TraCuuHoSo.vue'),
          props: true
        },
        {
          path: '/',
          name: 'QuanLyHoSo',
          component: () => import('@/views/QuanLyHoSo.vue'),
          props: true
        },
        {
          path: '/:status',
          name: 'QuanLyHoSoDanhSach',
          component: () => import('@/views/QuanLyHoSo.vue'),
          props: true
        },
        {
          path: 'thong-tin-ho-so/:id',
          name: 'ThongTinHoSo',
          component: () => import('@/views/ThongTinHoSo.vue'),
          props: true
        },
        {
          path: 'hoi-dap',
          name: 'HoiDap',
          component: () => import('@/views/HoiDap.vue'),
          props: true
        },
        {
          path: 'components',
          name: 'Components',
          component: () => import('@/views/Component.vue'),
          props: true
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/Login.vue')
    }
  ]
})

export default router
