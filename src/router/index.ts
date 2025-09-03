import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import DownloadView from '../pages/DownloadView.vue'
import PremiumView from '../pages/PremiumView.vue'
import AccountView from '../pages/AccountView.vue'
import { useAuth } from '../composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresGuest: true }, // Доступно только неавторизованным
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
      meta: { public: true }, // Публичный роут
    },
    {
      path: '/premium',
      name: 'premium',
      component: PremiumView,
      meta: { public: true }, // Публичный роут
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
  ],
})

// Навигационный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const { isLoggedIn, initAuth } = useAuth()

  // Инициализируем состояние авторизации
  initAuth()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
  const isPublic = to.matched.some((record) => record.meta.public)

  if (requiresAuth && !isLoggedIn) {
    // Если требуется авторизация, но пользователь не авторизован
    next('/')
  } else if (requiresGuest && isLoggedIn) {
    // Если требуется быть гостем, но пользователь авторизован
    next('/account')
  } else {
    // Разрешаем переход
    next()
  }
})

export default router
