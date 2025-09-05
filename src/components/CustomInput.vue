<template>
  <div class="custom-input-group" :class="color, size">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="custom-input"
      @input="handleInput"
    />
    <IconBase v-if="search" name="search" size="24" class="custom-input-icon" />
  </div>
</template>

<script setup lang="ts">
import IconBase from '@/shared/IconBase.vue'

interface Props {
  modelValue: string
  type?: string
  placeholder?: string
  color?: string
  search?: boolean
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  search: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
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
