<template>
  <el-dialog v-model="visible" title="Авторизация" width="400px" :before-close="handleClose" center>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="Логин" prop="username">
        <el-input v-model="form.username" placeholder="Введите логин" clearable />
      </el-form-item>

      <el-form-item label="Пароль" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Введите пароль"
          show-password
          clearable
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Отмена</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading"> Войти </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuth } from '@/composables/useAuth'

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

const { login, showAuthModal, closeAuthModal } = useAuth()

const visible = computed({
  get: () => showAuthModal,
  set: (value) => {
    if (!value) {
      closeAuthModal()
    }
  },
})

const formRef = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'Пожалуйста, введите логин', trigger: 'blur' }],
  password: [{ required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' }],
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    // Имитация задержки
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = login({
      username: form.username,
      password: form.password,
    })

    if (await success) {
      ElMessage.success('Успешная авторизация!')
      emit('success')
      handleClose()
    } else {
      ElMessage.error('Неверный логин или пароль')
    }
  } catch (error) {
    console.error('Validation failed:', error)
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  closeAuthModal()
  // Сброс формы
  form.username = ''
  form.password = ''
  if (formRef.value) {
    formRef.value.resetFields()
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
