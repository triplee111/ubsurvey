import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Container from '@/views/SurveyContainer.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Container
  }
]

const router = createRouter({
  history: createWebHistory(process.env.PROJ_ROUTER_BASE),
  routes
})

export default router
