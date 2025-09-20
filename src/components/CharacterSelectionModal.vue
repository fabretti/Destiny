<template>
  <teleport to="body">
    <DefaultModal
      v-model="isVisible"
      title="Выбор персонажа"
      width="500px"
      class="character-selection-modal"
    >
      <div class="character-selection-modal__content">
        <h1 class="text-uppercase text-center">Выбор персонажа</h1>
        
        <CharacterSelector 
          v-model:selected-character="selectedCharacter"
          :characters="characters"
          @change="handleCharacterChange"
          ref="characterSelectorRef"
        />
      </div>
      
      <div class="character-selection-modal__footer">
        <ButtonItem variant="white" @click="handleClose">Отмена</ButtonItem>
        <ButtonItem 
          variant="solid"
          :disabled="!selectedCharacter"
          :loading="isLoading"
          @click="handleConfirm"
        >
          Получить награду
        </ButtonItem>
      </div>
    </DefaultModal>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import DefaultModal from '@/components/DefaultModal.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import type { ICharacter } from '@/stores/types/LkStoreTypes'

interface Props {
  characters: ICharacter[]
}

interface Emits {
  (e: 'confirm', charId: string): void
}

const props = defineProps<Props>()

const isVisible = defineModel<boolean>({ default: false })
const emit = defineEmits<Emits>()

const selectedCharacter = ref('')
const isLoading = ref(false)
const characterSelectorRef = ref()

watch(isVisible, async (newValue) => {
  if (!newValue) return
  selectedCharacter.value = ''
  
  await nextTick()
  
  if (props.characters.length > 0) {
    selectedCharacter.value = props.characters[0].char_id
  }
})

const handleCharacterChange = (charId: string) => {
  selectedCharacter.value = charId
}

const handleClose = () => {
  isVisible.value = false
}

const handleConfirm = () => {
  if (selectedCharacter.value) {
    isLoading.value = true
    emit('confirm', selectedCharacter.value)
  }
}

const resetLoading = () => {
  isLoading.value = false
}

defineExpose({
  resetLoading
})
</script>

<style scoped lang="scss">
.character-selection-modal__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 26px;
}

.character-selection-modal__footer {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  .ButtonItem {
    width: 100%;
  }
}
</style>
