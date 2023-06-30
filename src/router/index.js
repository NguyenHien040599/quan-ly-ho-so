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
          path: 'chi-tiet-thu-tuc-hanh-chinh/:id',
          name: 'ChiTietThuTucHanhChinh',
          component: () => import('@/views/ChiTietThuTucHanhChinh.vue'),
          props: true
        },
        {
          path: 'quan-ly-ho-so',
          name: 'QuanLyHoSo',
          component: () => import('@/views/QuanLyHoSo.vue'),
          props: true
        },
        {
          path: 'hoi-dap',
          name: 'HoiDap',
          component: () => import('@/views/HoiDap.vue'),
          props: true
        },
        {
          path: 'chi-tiet-hoi-dap',
          name: 'ChiTietHoiDap',
          component: () => import('@/views/ChiTietHoiDap.vue'),
          props: true
        },
        {
          path: 'thong-tin-tai-khoan',
          name: 'ThongTinTaiKhoan',
          component: () => import('@/views/ThongTinTaiKhoan.vue'),
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
