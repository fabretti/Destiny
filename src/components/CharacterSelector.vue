<template>
  <div  class="character-selector">
    <div class="text-body-18">Персонаж</div>
    <el-select v-model="selectedCharacter" v-loading="isLoading" style="width: 180px" @change="handleChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useLkStore } from '@/stores/LkStore'
import type { ICharacter } from '@/stores/types/LkStoreTypes'
import { ElNotification } from 'element-plus'

interface Emits {
  (e: 'change', value: string): void
}

const emit = defineEmits<Emits>()
const lkStore = useLkStore()
const isLoading = ref(false)
const selectedCharacter = defineModel<string>()

const options = computed(() => {
  return lkStore.characters.map((char: ICharacter) => ({
    value: char.char_id,
    label: char.char_name
  }))
})

const handleChange = (value: string) => {
  selectedCharacter.value = value
  emit('change', value)
}

const getCharactersList = async () => {
  isLoading.value = true
  try {
    await lkStore.getCharacters()
    if (!selectedCharacter.value && lkStore.characters.length > 0) {
      selectedCharacter.value = lkStore.characters[0].char_id
      handleChange(lkStore.characters[0].char_id)
    }
  } catch (error) {
    ElNotification({
      title: 'Ошибка',
      message: 'Ошибка при загрузке персонажей',
      type: 'error',
    })
  } finally {
    isLoading.value = false
  }
}


watch(() => selectedCharacter.value, (newValue) => {
  selectedCharacter.value = newValue
})

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
