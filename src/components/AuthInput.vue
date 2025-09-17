<template>
  <div class="auth-input-group">
    <input
      :value="modelValue"
      :type="inputType"
      :placeholder="placeholder"
      :class="['auth-input', { 'auth-input--error': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <IconBase
      v-if="type === 'password'"
      name="Eye"
      size="24"
      class="auth-eye"
      @click="$emit('toggle-password')"
    />
    <span v-if="error" class="auth-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import IconBase from '@/shared/IconBase.vue'
import { computed } from 'vue'

interface Props {
  modelValue: string
  type?: string
  placeholder?: string
  showPassword?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  showPassword: false,
  error: '',
})

defineEmits<{
  'update:modelValue': [value: string]
  'toggle-password': []
}>()

const inputType = computed(() => {
  if (props.type === 'password') {
    return props.showPassword ? 'text' : 'password'
  }
  return props.type
})
</script>

<style scoped lang="scss">
.auth-input-group {
  position: relative;

  .auth-input {
    height: 55px;
    width: 100%;
    padding: 10px 26px;
    background: #1E2F444D;
    border: 1px solid rgba(81, 98, 119, 1);
    border-radius: 18px;
    color: var(--color-white);
    font-size: 18px;
    line-height: 100%;
    outline: none;
    transition: border 0.2s;
    @include mq(laptop) {
      height: 40px;
      border-radius: 12px;
    }

    &:focus {
      border: 1.5px solid rgb(103, 124, 149);
    }
    &::placeholder {
      color: var(--color-grey);
    }

    &--error {
      border-color: #ff6b6b;

      &:focus {
        border-color: #ff6b6b;
      }
    }
  }

  .auth-eye {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  .auth-error {
    position: absolute;
    bottom: -20px;
    left: 0;
    color: #ff6b6b;
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
