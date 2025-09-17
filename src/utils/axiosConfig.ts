import axios from 'axios'
import { useAuthStore } from '@/stores/AuthStore'

// Создаем экземпляр axios с базовой конфигурацией
const apiClient = axios.create({
  baseURL: '', // Базовый URL будет настроен в vite.config.ts
  timeout: 10000,
})

// Interceptor для добавления Bearer токена к каждому запросу
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()

    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor для обработки ответов и автоматического обновления токенов
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    // Если получили 401 и это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Пытаемся обновить токен
        const refreshSuccess = await authStore.refreshAccessToken()
        console.log('refreshSuccess', refreshSuccess)
        if (refreshSuccess) {
          // Повторяем оригинальный запрос с новым токеном
          originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Если не удалось обновить токен, разлогиниваем пользователя
        authStore.logout()
        // Можно перенаправить на страницу логина
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
