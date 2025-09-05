<template>
  <HeaderBlock />
  <main :class="{ 'with-aside': shouldShowAsideMenu, 'main-container': !isHomePage }">
    <AsideMenu v-if="shouldShowAsideMenu" />
    <RouterView />
  </main>
  <FooterBlock v-if="!shouldShowAsideMenu" />
  <img src="@/assets/img/MainBg.png" alt="bg" class="bg-image" />

  <!-- Глобальные модальные окна -->
  <AuthModal @success="handleAuthSuccess" />
  <ForgotPasswordModal v-model="showForgotPasswordModal" @success="handleForgotPasswordSuccess" />
</template>
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderBlock from './components/HeaderBlock.vue'
import FooterBlock from './components/FooterBlock.vue'
import AuthModal from './components/Auth/AuthModal.vue'
import AsideMenu from './components/AsideMenu.vue'
import ForgotPasswordModal from './components/Auth/ForgotPasswordModal.vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const route = useRoute()
const { initAuth, closeAuthModal, closeForgotPasswordModal, showForgotPasswordModal, isLoggedIn } =
  useAuth()

const isHomePage = computed(() => {
  return route.path === '/'
})

// Проверяем, находимся ли мы на странице аккаунта
const isAccountPage = computed(() => {
  return route.path.startsWith('/account')
})


const shouldShowAsideMenu = computed(() => {
  return isLoggedIn.value && isAccountPage.value
})

// Инициализация авторизации при загрузке приложения
onMounted(() => {
  initAuth()
})

const handleAuthSuccess = () => {
  // После успешной авторизации перенаправляем на страницу аккаунта
  closeAuthModal()
  router.push('/account')
}

const handleForgotPasswordSuccess = () => {
  // После успешного восстановления пароля закрываем модалку и показываем сообщение
  closeForgotPasswordModal()
  // Можно добавить уведомление об успешном восстановлении
  console.log('Пароль успешно восстановлен')
}
</script>
<style lang="scss">
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  position: relative;
  height: 100%;
  display: flex;
  &.with-aside {
    height: 718px;
    margin-top: 40px;
    gap: 26px;
  }
}
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: cover;
  backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(29, 42, 57, 0) 0%, rgba(29, 42, 57, 0.89) 71.35%);
}
</style>
