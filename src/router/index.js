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
          path: '/',
          name: 'QuanLyHoSo',
          component: () => import('@/views/QuanLyHoSo.vue'),
          props: true
        },
        {
          path: '/:thutuc',
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
          path: '/nop-ho-so/:thutuc/:id',
          name: 'BieuMauDienTu',
          component: () => import('@/views/BieuMauDienTu.vue'),
          props: true
        },
        {
          path: 'thong-bao',
          name: 'ThongBao',
          component: () => import('@/views/ThongBao.vue'),
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
    },
    {
      path: '/tra-cuu-ho-so',
      name: 'TraCuuHoSo',
      component: () => import('@/views/TraCuuHoSo.vue')
    }
  ]
})

export default router
