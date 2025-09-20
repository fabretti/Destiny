<template>
  <div  class="character-selector">
    <div class="text-body-18">Персонаж</div>
    <el-select v-model="selectedCharacter" v-loading="isLoading" style="width: 180px" placeholder="Выберите персонажа" @change="handleChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { ICharacter } from '@/stores/types/LkStoreTypes'

interface Props {
  characters: ICharacter[]
}

interface Emits {
  (e: 'change', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const isLoading = ref(false)
const selectedCharacter = defineModel<string>()

const options = computed(() => {
  return props.characters.map((char: ICharacter) => ({
    value: char.char_id,
    label: char.char_name
  }))
})

const handleChange = (value: string) => {
  selectedCharacter.value = value
  emit('change', value)
}

const getCharactersList = async () => {
  // Теперь персонажи передаются через props, поэтому этот метод больше не нужен
  // Оставляем для совместимости, но логика перенесена в родительский компонент
  if (!selectedCharacter.value && props.characters.length > 0) {
    selectedCharacter.value = props.characters[0].char_id
    handleChange(props.characters[0].char_id)
  }
}


watch(() => selectedCharacter.value, (newValue) => {
  selectedCharacter.value = newValue
})

watch(() => props.characters, (newCharacters) => {
  if (newCharacters.length > 0 && !selectedCharacter.value) {
    selectedCharacter.value = newCharacters[0].char_id
    handleChange(newCharacters[0].char_id)
  }
}, { immediate: true })

defineExpose({
  getCharactersList
})
</script>

<style lang="scss">
.character-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
