import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const authStore = useAuthStore()

  return {
    isLoggedIn: authStore.isLoggedIn,
    user: authStore.currentUser,
    login: authStore.login,
    logout: authStore.logout,
    initAuth: authStore.initAuth,
    showAuthModal: authStore.showAuthModal,
    openAuthModal: authStore.openAuthModal,
    closeAuthModal: authStore.closeAuthModal,
    isLoading: authStore.isLoading,
    error: authStore.error,
  }
}
