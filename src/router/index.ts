import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import DownloadView from '../pages/DownloadView.vue'
import PremiumView from '../pages/PremiumView.vue'
import AccountView from '../pages/Account/AccountView.vue'
import SetsView from '@/pages/Account/SetsView.vue'
import AchievementsView from '@/pages/Account/AchievementsView.vue'
import ShopView from '@/pages/Account/ShopView.vue'
import RatingView from '@/pages/Account/RatingView.vue'
import SeasonalRatingView from '@/pages/Account/SeasonRatingView.vue'
import RouletteView from '@/pages/Account/RouletteView.vue'
import { useAuthStore } from '@/stores/AuthStore'

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
    {
      path: '/account/sets',
      name: 'sets',
      component: SetsView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
    {
      path: '/account/achievements',
      name: 'achievements',
      component: AchievementsView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
    {
      path: '/account/shop',
      name: 'shop',
      component: ShopView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
    {
      path: '/account/rating',
      name: 'rating',
      component: RatingView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
    {
      path: '/account/seasonal-rating',
      name: 'seasonal-rating',
      component: SeasonalRatingView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
    {
      path: '/account/roulette',
      name: 'roulette',
      component: RouletteView,
      meta: { requiresAuth: true }, // Требует авторизации
    },
  ],
})

// Навигационный guard для проверки авторизации
router.beforeEach((to, from, next) => {
  const AuthStore = useAuthStore()
  AuthStore.initAuth()

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
  const isPublic = to.matched.some((record) => record.meta.public)

  const isUserLoggedIn = AuthStore.isAuthenticated
  if (requiresAuth && !isUserLoggedIn) {
    next('/')
  } else if (requiresGuest && isUserLoggedIn) {
    next('/account')
  } else {
    next()
  }
})

export default router
