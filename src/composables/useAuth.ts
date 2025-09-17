import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'

export function useAuth() {
  const authStore = useAuthStore()

  // Деструктурируем состояние и геттеры с реактивностью
  const { isAuthenticated, user, isLoading, error, showAuthModal, showForgotPasswordModal } =
    storeToRefs(authStore)
  const { isLoggedIn, currentUser, isAuthModalVisible, isForgotPasswordModalVisible } =
    storeToRefs(authStore)

  return {
    // Состояние авторизации
    isAuthenticated,
    isLoggedIn,
    user,
    currentUser,
    isLoading,
    error,

    // Состояние модальных окон
    showAuthModal,
    isAuthModalVisible,
    showForgotPasswordModal,
    isForgotPasswordModalVisible,

    // Действия авторизации
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    initAuth: authStore.initAuth,
    refreshAccessToken: authStore.refreshAccessToken,

    // API методы (если нужны напрямую)
    apiLogin: authStore.apiLogin,
    apiRegister: authStore.apiRegister,
    apiRefreshToken: authStore.apiRefreshToken,

    // Действия модальных окон
    openAuthModal: authStore.openAuthModal,
    closeAuthModal: authStore.closeAuthModal,
    toggleAuthModal: authStore.toggleAuthModal,
    openForgotPasswordModal: authStore.openForgotPasswordModal,
    closeForgotPasswordModal: authStore.closeForgotPasswordModal,
    toggleForgotPasswordModal: authStore.toggleForgotPasswordModal,
  }
}
