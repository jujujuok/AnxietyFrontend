import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TravelWarnings from "@/components/DashboardContent.vue";

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
      component: () => import('../views/MapView.vue')
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
      component: () => import('../views/ErrorView.vue')
    },
  ]
})

export default router
