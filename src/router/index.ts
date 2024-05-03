import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/map',
      name: 'map',
      component:  MapView
    },
    {
      path: '/world',
      name: 'world',
      component: WorldView
    },
    {
      path: '/dashboard/',
      name: 'dashboard_default',
      redirect: '/dashboard/food-product-warnings'
    },
    {
      path: '/dashboard/:type',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      props: route => ({ type: route.params.type })
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: ErrorView
    },
  ]
})

export default router
