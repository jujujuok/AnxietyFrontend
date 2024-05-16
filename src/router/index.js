import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MapView from '../views/MapView.vue';
import WorldView from '../views/WorldView.vue';
import ErrorView from '../views/ErrorView.vue';

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
});

export default router;
