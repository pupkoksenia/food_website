import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import { useFirebaseConfigAuthStore } from '../stores/firebaseConfigAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const state = useFirebaseConfigAuthStore().stateUser
  if (to.meta.requiresAuth && !state.isAuthenticated) next({ path: '/login' })
  else next()
})

export default router
