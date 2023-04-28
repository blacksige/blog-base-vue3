import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/home/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
]
console.log(routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
