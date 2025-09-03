<template>
  <div class="account-view">
    <div class="account-container">
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.account-container {
  text-align: center;
  max-width: 600px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #ccc;
  }
}

.account-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
