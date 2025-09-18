<template>
  <BaseAuthModal
    v-model="isVisible"
    :tabs="tabs"
    :form="form"
    :errors="errors"
    @submit="handleSubmit"
    @tab-change="handleTabChange"
    @close="handleClose"
  >
    <template #default="{ activeTab, form, errors }">
      <AuthInput
        v-if="activeTab === 'resetEmail'"
        v-model="form.email"
        type="email"
        placeholder="Новый email"
        :error="errors.email"
      />

      <AuthInput
        v-model="form.password"
        type="password"
        placeholder="Текущий пароль"
        :show-password="showPassword"
        :error="errors.password"
        @toggle-password="showPassword = !showPassword"
      />
      <template v-if="activeTab === 'resetPassword'">
        <AuthInput
          v-model="form.newPassword"
          type="password"
          placeholder="Новый пароль"
          :show-password="showNewPassword"
          :error="errors.newPassword"
          @toggle-password="showNewPassword = !showNewPassword"
        />
        <AuthInput
          v-model="form.repeatNewPassword"
          type="password"
          placeholder="Подтвердите новый пароль"
          :show-password="showRepeatNewPassword"
          :error="errors.repeatNewPassword"
          @toggle-password="showRepeatNewPassword = !showRepeatNewPassword"
        />
      </template>
      <div class="code d-flex gap-3 items-center">
        <AuthInput
          v-model="form.code"
          type="text"
          placeholder="Код подтверждения"
          :error="errors.code"
        />
        <ButtonItem variant="solid-shadow" size="medium">Получить</ButtonItem>
      </div>
    </template>
  </BaseAuthModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AuthInput from '@/components/AuthInput.vue'
import BaseAuthModal from '@/components/Auth/BaseAuthModal.vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import { useLkStore } from '@/stores/LkStore'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const LkStore = useLkStore()

const tabs = [
  {
    value: 'resetPassword',
    label: 'Смена пароля',
    title: 'Смена пароля',
    subtitle: '',
    buttonText: 'СОХРАНИТЬ ИЗМЕНЕНИЯ',
    description: 'Код восстановления будет отправлен на указанный email',
  },
  {
    value: 'resetEmail',
    label: 'Смена email',
    title: 'Смена email',
    subtitle: 'Ваш текущий email: <span class="text-underline">' + LkStore.accountInfo.email + '</span>',
    buttonText: 'СОХРАНИТЬ ИЗМЕНЕНИЯ',
  },
]

const showPassword = ref(false)
const showNewPassword = ref(false)
const showRepeatNewPassword = ref(false)
const form = ref({
  email: '',
  password: '',
  newPassword: '',
  repeatNewPassword: '',
  code: '',
})

const errors = ref({
  email: '',
  password: '',
  newPassword: '',
  repeatNewPassword: '',
  code: '',
})

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const validateEmail = (value: string): string => {
  if (!value) return 'Email обязателен'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Введите корректный email'
  return ''
}

const validatePassword = (value: string): string => {
  if (!value) return 'Пароль обязателен'
  if (value.length < 6) return 'Пароль должен содержать минимум 6 символов'
  return ''
}

const clearErrors = () => {
  errors.value = {
    email: '',
    password: '',
    newPassword: '',
    repeatNewPassword: '',
    code: '',
  }
}

const clearForm = () => {
  form.value = {
    email: '',
    password: '',
    newPassword: '',
    repeatNewPassword: '',
    code: '',
  }
}

const validateForm = (activeTab: string): boolean => {
  clearErrors()
  let isValid = true

  // Валидация email для всех табов
  errors.value.email = validateEmail(form.value.email)
  if (errors.value.email) isValid = false

  // Дополнительная валидация для сброса пароля
  if (activeTab === 'resetEmail') {
    errors.value.password = validatePassword(form.value.password)
    if (errors.value.password) isValid = false
  }

  if (activeTab === 'resetPassword') {
    errors.value.newPassword = validatePassword(form.value.newPassword)
    errors.value.repeatNewPassword = validatePassword(form.value.repeatNewPassword)
    if (errors.value.newPassword) isValid = false
    if (errors.value.repeatNewPassword) isValid = false
    if (errors.value.newPassword) isValid = false
  }

  return isValid
}

const handleSubmit = (activeTab: string, formData: Record<string, any>) => {
  if (!validateForm(activeTab)) {
    console.log('Ошибки валидации:', errors.value)
    return
  }

  if (activeTab === 'resetPassword') {
    console.log('resetPassword password:', {
      email: formData.email,
      newPassword: formData.newPassword,
    })
    // Здесь будет логика отправки кода восстановления
    // После успешной отправки переключаемся на таб сброса пароля
    // Можно добавить логику переключения табов
  } else {
    console.log('resetEmail:', {
      email: formData.email,
      password: formData.password,
      newPassword: formData.newPassword,
    })
    // Здесь будет логика сброса пароля
    emit('success')
  }
}

const handleTabChange = (tab: string) => {
  clearErrors()
  // Не очищаем форму при смене табов, так как email нужен в обоих случаях
}

const handleClose = () => {
  emit('update:modelValue', false)
  clearForm()
}
</script>

<style lang="scss">
// Стили наследуются от BaseAuthModal
</style>
