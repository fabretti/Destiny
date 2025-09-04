import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Состояние авторизации
    isAuthenticated: false,
    user: null as User | null,
    isLoading: false,
    error: null as string | null,

    // Состояние модальных окон
    showAuthModal: false,
    showForgotPasswordModal: false,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
    isAuthModalVisible: (state) => state.showAuthModal,
    isForgotPasswordModalVisible: (state) => state.showForgotPasswordModal,
  },

  actions: {
    // Действия авторизации
    async login(credentials: { username: string; password: string }) {
      try {
        this.isLoading = true
        this.error = null

        // Здесь должна быть реальная логика авторизации через API
        // Для демонстрации просто устанавливаем авторизацию
        if (credentials.username && credentials.password) {
          this.isAuthenticated = true
          this.user = {
            id: '1',
            name: credentials.username,
          }

          // Сохраняем в localStorage
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(this.user))

          return true
        }
        return false
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Ошибка авторизации'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
    },

    initAuth() {
      const savedAuth = localStorage.getItem('isAuthenticated')
      const savedUser = localStorage.getItem('user')

      if (savedAuth === 'true' && savedUser) {
        this.isAuthenticated = true
        this.user = JSON.parse(savedUser)
      }
    },

    // Действия модальных окон
    openAuthModal() {
      this.showAuthModal = true
      this.error = null // Очищаем ошибки при открытии
    },

    closeAuthModal() {
      this.showAuthModal = false
      this.error = null // Очищаем ошибки при закрытии
    },

    toggleAuthModal() {
      this.showAuthModal = !this.showAuthModal
    },

    openForgotPasswordModal() {
      this.showForgotPasswordModal = true
      this.error = null
    },

    closeForgotPasswordModal() {
      this.showForgotPasswordModal = false
      this.error = null
    },

    toggleForgotPasswordModal() {
      this.showForgotPasswordModal = !this.showForgotPasswordModal
    },
  },
})
