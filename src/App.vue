<template>
  <HeaderBlock />
  <RouterView />
  <FooterBlock />
  <img src="@/assets/img/MainBg.png" alt="bg" class="bg-image" />

  <!-- Глобальное модальное окно авторизации -->
  <AuthModal @success="handleAuthSuccess" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderBlock from './components/HeaderBlock.vue'
import FooterBlock from './components/FooterBlock.vue'
import AuthModal from './components/AuthModal.vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { initAuth, closeAuthModal } = useAuth()

// Инициализация авторизации при загрузке приложения
onMounted(() => {
  initAuth()
})

const handleAuthSuccess = () => {
  // После успешной авторизации перенаправляем на страницу аккаунта
  closeAuthModal()
  router.push('/account')
}
</script>
<style lang="scss">
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
