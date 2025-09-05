<template>
  <BaseAuthModal
    v-model="showAuthModal"
    :tabs="tabs"
    :form="form"
    :errors="errors"
    :loading="isLoading"
    @submit="handleSubmit"
    @tab-change="handleTabChange"
    @close="handleClose"
  >
    <template #default="{ activeTab, form, errors }">
      <AuthInput v-model="form.login" type="text" placeholder="Логин" :error="errors.login" />
      <AuthInput
        v-if="activeTab === 'register'"
        v-model="form.email"
        type="email"
        placeholder="Email"
        :error="errors.email"
      />
      <div class="password-block">
        <AuthInput
          v-model="form.password"
          type="password"
          placeholder="Пароль"
          :show-password="activeTab === 'login' ? showLoginPassword : showRegisterPassword"
          :error="errors.password"
          @toggle-password="
            activeTab === 'login'
              ? (showLoginPassword = !showLoginPassword)
              : (showRegisterPassword = !showRegisterPassword)
          "
        />
        <div v-if="activeTab === 'login'" class="password-block-forgot">
          <p class="text-link color-white" @click="openForgotPasswordModal">Забыли пароль?</p>
        </div>
      </div>
      <AuthInput
        v-if="activeTab === 'register'"
        v-model="form.repeatPassword"
        type="password"
        placeholder="Повторите пароль"
        :show-password="showRegisterRepeat"
        :error="errors.repeatPassword"
        @toggle-password="showRegisterRepeat = !showRegisterRepeat"
      />
    </template>
  </BaseAuthModal>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useAuth } from '@/composables/useAuth'
import AuthInput from '@/components/AuthInput.vue'
import BaseAuthModal from '@/components/Auth/BaseAuthModal.vue'
import { ref } from 'vue'
import shigoImg from '@/assets/img/auth/shigo.png'
import shigo2Img from '@/assets/img/auth/shigo2.png'

const tabs = [
  {
    value: 'register',
    label: 'Регистрация',
    title: 'Регистрация',
    subtitle: '',
    buttonText: 'ЗАРЕГИСТРИРОВАТЬСЯ',
    image: shigoImg,
    description: 'Используйте уникальные данные для регистрации',
  },
  {
    value: 'login',
    label: 'Войти',
    title: 'Войти в аккаунт',
    subtitle: 'Укажи свои данные, чтобы попасть в личный кабинет',
    buttonText: 'ВОЙТИ',
    image: shigo2Img,
  },
]

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showRegisterRepeat = ref(false)
const form = ref({
  login: '',
  password: '',
  email: '',
  repeatPassword: '',
})

const errors = ref({
  login: '',
  password: '',
  email: '',
  repeatPassword: '',
})

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

const { login, showAuthModal, closeAuthModal, openForgotPasswordModal, isLoading } = useAuth()

const validateLogin = (value: string): string => {
  if (!value.trim()) return 'Логин обязателен'
  if (value.length < 3) return 'Логин должен содержать минимум 3 символа'
  return ''
}

const validatePassword = (value: string): string => {
  if (!value) return 'Пароль обязателен'
  if (value.length < 6) return 'Пароль должен содержать минимум 6 символов'
  return ''
}

const validateEmail = (value: string): string => {
  if (!value) return 'Email обязателен'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Введите корректный email'
  return ''
}

const validateRepeatPassword = (value: string): string => {
  if (!value) return 'Повторите пароль'
  if (value !== form.value.password) return 'Пароли не совпадают'
  return ''
}

const clearErrors = () => {
  errors.value = {
    login: '',
    password: '',
    email: '',
    repeatPassword: '',
  }
}

const clearForm = () => {
  form.value = {
    login: '',
    password: '',
    email: '',
    repeatPassword: '',
  }
}

const validateForm = (activeTab: string): boolean => {
  clearErrors()
  let isValid = true

  // Валидация логина
  errors.value.login = validateLogin(form.value.login)
  if (errors.value.login) isValid = false

  // Валидация пароля
  errors.value.password = validatePassword(form.value.password)
  if (errors.value.password) isValid = false

  // Дополнительная валидация для регистрации
  if (activeTab === 'register') {
    errors.value.email = validateEmail(form.value.email)
    if (errors.value.email) isValid = false

    errors.value.repeatPassword = validateRepeatPassword(form.value.repeatPassword)
    if (errors.value.repeatPassword) isValid = false
  }

  return isValid
}

const handleSubmit = async (activeTab: string, formData: Record<string, any>) => {
  if (!validateForm(activeTab)) {
    console.log('Ошибки валидации:', errors.value)
    return
  }

  if (activeTab === 'login') {
    await handleLogin(formData)
  } else {
    await handleRegister(formData)
  }
}

const handleLogin = async (formData: Record<string, any>) => {
  try {
    const success = await login({
      username: formData.login,
      password: formData.password,
    })

    if (success) {
      emit('success')
    } else {
      errors.value.login = 'Неверный логин или пароль'
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    errors.value.login = 'Ошибка авторизации'
  }
}

const handleRegister = async (formData: Record<string, any>) => {
  try {
    // Для регистрации пока просто авторизуем с введенными данными
    const success = await login({
      username: formData.login,
      password: formData.password,
    })

    if (success) {
      emit('success')
    } else {
      errors.value.login = 'Ошибка регистрации'
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    errors.value.login = 'Ошибка регистрации'
  }
}

const handleTabChange = (tab: string) => {
  clearErrors()
  clearForm()
}

const handleClose = () => {
  closeAuthModal()
  clearForm()
}
</script>

<style lang="scss">
// Стили теперь находятся в BaseAuthModal.vue
</style>
