<template>
  <HeaderBlock v-if="shouldShowHeader" />
  <main
    :class="{ 'with-aside': shouldShowAsideMenu, 'main-container': !isHomePage, 'opened-aside': isOpenedAsideMenu }">
    <AsideMenu v-if="isAuthPage" @closeAsideMenu="isOpenedAsideMenu = false" :class="{ 'full-pages': isPagesWithoutAsideMenu }" />
    <RouterView />

    <IconBase name="hamburger" class="aside-humburger" @click="isOpenedAsideMenu = !isOpenedAsideMenu" />
    <IconBase name="close" class="aside-close" @click="isOpenedAsideMenu = !isOpenedAsideMenu" />
  </main>
  <FooterBlock v-if="!isAccountPage" />
  <img src="@/assets/img/MainBg.png" alt="bg" class="bg-image" />

  <AuthModal @success="handleAuthSuccess" />
  <ForgotPasswordModal v-model="AuthStore.showForgotPasswordModal" @success="handleForgotPasswordSuccess" />
</template>
<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderBlock from './components/HeaderBlock.vue'
import FooterBlock from './components/FooterBlock.vue'
import AuthModal from './components/Auth/AuthModal.vue'
import AsideMenu from './components/AsideMenu.vue'
import ForgotPasswordModal from './components/Auth/ForgotPasswordModal.vue'
import IconBase from './shared/IconBase.vue'
import { useAuthStore } from './stores/AuthStore'
import { useScreenSize } from './composables/useScreenSize'

const router = useRouter()
const route = useRoute()
const AuthStore = useAuthStore()
const { isDesktop } = useScreenSize()

const isOpenedAsideMenu = ref(false)

const isHomePage = computed(() => {
  return route.path === '/'
})

const isPagesWithoutAsideMenu = computed(() => {
  return route.path === '/account/seasonal-rating' || route.path === '/account/roulette' || route.path === '/premium'
})
const isAccountPage = computed(() => {
  return route.path.startsWith('/account')
})

const isAuthPage = computed(() => {
  return isPagesWithoutAsideMenu.value ? false : isAccountPage.value
})

const shouldShowAsideMenu = computed(() => {
  return AuthStore.isAuthenticated && isAccountPage.value
})

const shouldShowHeader = computed(() => {
  return isDesktop.value || !AuthStore.isAuthenticated
})

const updateAppHeight = () => {
  const appElement = document.getElementById('app')
  if (appElement) {
    if (isHomePage.value) {
      appElement.style.height = '100vh'
    } else {
      appElement.style.height = ''
    }
  }
}

onMounted(() => {
  AuthStore.initAuth()
  updateAppHeight()
})

watch(isHomePage, () => {
  updateAppHeight()
})

const handleAuthSuccess = () => {
  // После успешной авторизации перенаправляем на страницу аккаунта
  AuthStore.closeAuthModal()
  router.push('/account')
}

const handleForgotPasswordSuccess = () => {
  // После успешного восстановления пароля закрываем модалку и показываем сообщение
  AuthStore.closeForgotPasswordModal()
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
    flex: inherit;

    @include mq(laptop) {
      height: 100%;
      padding: 0;
      margin-top: 0;
    }

    &.opened-aside {
      @include mq(laptop) {
        .aside-menu {
          display: flex;
          flex-direction: column;
        }

        .aside-humburger {
          display: none;
        }

        .aside-close {
          display: block;
        }
      }
    }


    @include mq(laptop) {
      .aside-humburger {
        display: block;
      }
    }
  }

  .aside-humburger,
  .aside-close {
    display: none;
    cursor: pointer;
    position: absolute;
    right: 18px;
    top: 18px;
    z-index: 5;
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
