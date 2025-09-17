<template>
  <div class="custom-input-group" :class="color, size">
    <input :value="modelValue" :type="type" :placeholder="placeholder" class="custom-input" @input="handleInput"
      @keydown="handleKeydown" />
    <IconBase v-if="search" name="search" size="24" class="custom-input-icon" />
    <div v-if="balance" class="custom-input-toll text-uppercase">toll</div>
  </div>
</template>

<script setup lang="ts">
import IconBase from '@/shared/IconBase.vue'

interface Props {
  modelValue: string | number | null;
  type?: string
  placeholder?: string
  color?: string
  search?: boolean
  size?: string
  balance?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  search: false,
  size: 'md',
  balance: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const handleKeydown = (event: KeyboardEvent) => {
  // Если это поле для ввода суммы (balance), блокируем ввод нецифровых символов
  if (props.balance) {
    // Разрешаем: цифры (0-9), Backspace, Delete, Tab, Escape, Enter, стрелки
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End'
    ]

    // Разрешаем Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
    if (event.ctrlKey && ['a', 'c', 'v', 'x', 'z'].includes(event.key.toLowerCase())) {
      return
    }

    // Блокируем все остальные символы, кроме цифр и разрешенных клавиш
    if (!allowedKeys.includes(event.key) && !/^[0-9]$/.test(event.key)) {
      event.preventDefault()
    }
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  // Если это поле для ввода суммы (balance), разрешаем только цифры
  if (props.balance) {
    value = value.replace(/[^0-9]/g, '')
  }

  emit('update:modelValue', value as string | number | null)
}
</script>

<style scoped lang="scss">
.custom-input-group {
  position: relative;

  .custom-input {
    height: 46px;
    width: 100%;
    padding: 10px 50px 10px 26px;
    background: #1e2f4440;
    border: 1px solid rgba(81, 98, 119, 1);
    border-radius: 18px;
    color: var(--color-white);
    font-size: 18px;
    line-height: 100%;
    outline: none;
    transition: border 0.2s;

    &:focus {
      border: 1.5px solid rgb(103, 124, 149);
    }

    &::placeholder {
      color: var(--color-grey);
    }
  }

  &.white {
    .custom-input {
      border: none;
      background: var(--color-white);
      color: #747D86;
    }
  }

  &.sm {
    .custom-input {
      font-size: 12px;
      padding: 0 12px;
      height: 30px;
      border-radius: 6px;
    }
  }

  &.md {
    .custom-input {
      font-size: 14px;
      padding: 0 20px;
      height: 50px;
      border-radius: 6px;
    }
  }

  .custom-input-toll {
    @include text-body-12;
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    color: #293A4A;
  }

  .custom-input-icon {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    color: rgba(81, 98, 119, 1);
    pointer-events: none;
  }
}
</style>
