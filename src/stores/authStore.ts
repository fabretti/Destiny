import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Состояние
  const isAuthenticated = ref(false)
  const user = ref<{ id: string; name: string } | null>(null)
  const showAuthModal = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Геттеры
  const isLoggedIn = computed(() => isAuthenticated.value)
  const currentUser = computed(() => user.value)

  // Действия
  const login = async (credentials: { username: string; password: string }) => {
    try {
      isLoading.value = true
      error.value = null

      // Здесь должна быть реальная логика авторизации через API
      // Для демонстрации просто устанавливаем авторизацию
      if (credentials.username && credentials.password) {
        isAuthenticated.value = true
        user.value = {
          id: '1',
          name: credentials.username,
        }

        // Сохраняем в localStorage
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(user.value))

        return true
      }
      return false
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка авторизации'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    const savedUser = localStorage.getItem('user')

    if (savedAuth === 'true' && savedUser) {
      isAuthenticated.value = true
      user.value = JSON.parse(savedUser)
    }
  }

  const openAuthModal = () => {
    showAuthModal.value = true
  }

  const closeAuthModal = () => {
    showAuthModal.value = false
  }

  return {
    // Состояние
    isAuthenticated,
    user,
    showAuthModal,
    isLoading,
    error,

    // Геттеры
    isLoggedIn,
    currentUser,

    // Действия
    login,
    logout,
    initAuth,
    openAuthModal,
    closeAuthModal,
  }
})
