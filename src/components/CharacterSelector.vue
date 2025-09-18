<template>
  <div class="character-selector">
    <div class="text-body-18">Персонаж</div>
    <el-select v-model="selectedCharacter" style="width: 180px" @change="handleChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface CharacterOption {
  value: string
  label: string
}

interface Props {
  modelValue?: string
  options?: CharacterOption[]
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'Ikonika23',
  options: () => [
    {
      value: 'Ikonika23',
      label: 'Ikonika23',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ]
})

const emit = defineEmits<Emits>()

const selectedCharacter = ref(props.modelValue)

const handleChange = (value: string) => {
  emit('update:modelValue', value)
  emit('change', value)
}

watch(() => props.modelValue, (newValue) => {
  selectedCharacter.value = newValue
})
</script>

<style lang="scss">
.character-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
