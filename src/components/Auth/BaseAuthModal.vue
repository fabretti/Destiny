<template>
  <el-dialog
    v-model="isVisible"
    class="auth-modal"
    width="400px"
    :before-close="handleClose"
    center
  >
    <div class="auth-left">
      <div class="auth-tabs">
        <span
          v-for="(tabOption, index) in tabs"
          :key="tabOption.value"
          :class="['auth-tab', activeTab === tabOption.value ? 'active' : '']"
          @click="changeTab(tabOption.value)"
        >
          {{ tabOption.label }}
        </span>
      </div>
      <div class="auth-form-block" :class="`auth-form-block-${activeTab}`">
        <div class="auth-title">
          <h1 class="text-body-24 text-uppercase">{{ currentTab.title }}</h1>
          <span v-if="currentTab.subtitle" class="text-body-18" v-html="currentTab.subtitle" />
        </div>

        <!-- Слот для формы -->
        <div class="auth-form">
          <slot
            :activeTab="activeTab"
            :form="form"
            :errors="errors"
            :onUpdateForm="updateForm"
            :onUpdateErrors="updateErrors"
            :onClearErrors="clearErrors"
            :onClearForm="clearForm"
          />
        </div>

        <!-- Кнопка с настраиваемым текстом -->
        <ButtonItem
          class="auth-btn"
          variant="solid-shadow"
          size="medium"
          :loading="props.loading"
          @click="handleSubmit"
        >
          {{ props.loading ? 'Загрузка...' : currentTab.buttonText }}
        </ButtonItem>
      </div>
    </div>
    <div class="auth-right">
      <img :src="currentTab.image" alt="bg" class="auth-right-img" />
      <p v-if="currentTab.description" class="color-white">
        {{ currentTab.description }}
      </p>
    </div>
    <img src="@/assets/img/auth/circle.png" alt="bg" class="auth-circle" />
  </el-dialog>
</template>

<script setup lang="ts">
import ButtonItem from '@/shared/ButtonItem.vue'
import { ref, computed, watch, nextTick } from 'vue'

interface TabOption {
  value: string
  label: string
  title: string
  subtitle?: string
  buttonText: string
  image: string
  description?: string
}

interface Props {
  modelValue: boolean
  tabs: TabOption[]
  defaultTab?: string
  form: Record<string, any>
  errors: Record<string, string>
  loading?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', tab: string, form: Record<string, any>): void
  (e: 'tab-change', tab: string): void
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: undefined,
  loading: false,
})

const emit = defineEmits<Emits>()

const activeTab = ref(props.defaultTab || props.tabs[0]?.value || '')

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const currentTab = computed(
  () => props.tabs.find((t) => t.value === activeTab.value) || props.tabs[0],
)

const changeTab = (value: string) => {
  activeTab.value = value
  emit('tab-change', value)
}

const updateForm = (newForm: Record<string, any>) => {
  Object.assign(props.form, newForm)
}

const updateErrors = (newErrors: Record<string, string>) => {
  Object.assign(props.errors, newErrors)
}

const clearErrors = () => {
  Object.keys(props.errors).forEach((key) => {
    props.errors[key] = ''
  })
}

const clearForm = () => {
  Object.keys(props.form).forEach((key) => {
    props.form[key] = ''
  })
}

const handleSubmit = () => {
  emit('submit', activeTab.value, props.form)
}

const handleClose = () => {
  emit('close')
  clearForm()
  clearErrors()
}

// Инициализация активного таба
watch(
  () => props.tabs,
  (newTabs) => {
    if (newTabs.length > 0 && !activeTab.value) {
      activeTab.value = newTabs[0].value
    }
  },
  { immediate: true },
)

// Обновление индикатора при изменении активного таба
watch(activeTab, () => {
  nextTick(() => {
    // Принудительное обновление стилей индикатора
  })
})
</script>

<style lang="scss">
.auth-modal.el-dialog {
  height: 670px;
  width: 950px;
  padding: 10px 30px 56px 60px;
  background: var(--color-primary);
  border-radius: 25px;
  .el-dialog__body {
    height: 100%;
    display: flex;
    gap: 40px;
  }
  .auth-left {
    width: 100%;
    max-width: 480px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .auth-tabs {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 22px;
      font-size: 22px;
      font-weight: 400;
      letter-spacing: 0.1em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      position: relative;

      .auth-tab {
        color: var(--color-white);
        cursor: pointer;
        padding-bottom: 12px;
        border-bottom: 2px solid transparent;
        transition:
          color 0.2s,
          border-color 0.2s;

        &.active {
          color: var(--color-white);
          border-bottom: 2px solid var(--color-white);
        }
      }

      .auth-tab-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--color-white);
        transition: all 0.3s ease-in-out;
        border-radius: 1px;
      }
    }

    .auth-form-block {
      height: 100%;
      width: 100%;
      background: none;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 30px;
      .auth-title {
        display: grid;
        gap: 8px;
        color: var(--color-white);
        margin-bottom: 30px;
      }
      .auth-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        .password-block {
          display: grid;
          gap: 16px;
          .password-block-forgot {
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
          }
        }
      }
      .auth-btn {
        width: 100%;
        margin-top: auto;
      }
      .auth-forgot {
        display: block;
        margin: 26px auto 0 auto;
        color: var(--color-white);
        font-size: 16px;
        text-align: center;
        text-decoration: underline;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        cursor: pointer;
      }
    }
    @include mq(laptop) {
    }
  }
  .auth-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    width: 100%;
    max-width: 360px;
  }
  .auth-circle {
    position: absolute;
    right: 0;
    z-index: 1;
  }
}
</style>
