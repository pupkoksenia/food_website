import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import { useFirebaseConfigAuthStore } from '../stores/firebaseConfigAuth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: { requiresAuth: true, transition: 'slide-left' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/loader',
    name: 'loader',
    component: () => import('../components/kits/LoaderComponent.vue')
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
