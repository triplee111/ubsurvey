import { h } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'survey',
    component: {
      setup() {
        return () => h('span')
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.PROJ_ROUTER_BASE),
  routes
})

export default router
