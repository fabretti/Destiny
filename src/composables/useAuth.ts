import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

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
    logout: authStore.logout,
    initAuth: authStore.initAuth,

    // Действия модальных окон
    openAuthModal: authStore.openAuthModal,
    closeAuthModal: authStore.closeAuthModal,
    toggleAuthModal: authStore.toggleAuthModal,
    openForgotPasswordModal: authStore.openForgotPasswordModal,
    closeForgotPasswordModal: authStore.closeForgotPasswordModal,
    toggleForgotPasswordModal: authStore.toggleForgotPasswordModal,
  }
}
