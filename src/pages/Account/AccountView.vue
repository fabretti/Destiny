<template>
  <div class="account-view default-wrapper">
    <div>
      <h1>Личный кабинет</h1>
      <p>Добро пожаловать в личный кабинет!</p>
      <div class="account-actions">
        <ButtonItem variant="solid" @click="handleLogout"> Выйти </ButtonItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ButtonItem from '@/shared/ButtonItem.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style lang="scss" scoped>
.account-view {
  .account-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
