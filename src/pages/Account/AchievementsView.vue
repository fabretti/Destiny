<template>
  <WrapperBlock title="Достижения" class="achievements">
    <template #header>
      <div class="achievements-header">
        <CharacterSelector ref="characterSelectorRef" v-model="selectedCharacter" :characters="lkStore.characters" @change="getAchievements(selectedCharacter)" />
      </div>
    </template>
    <div v-if="!isLoading" class="achievements-content">
      <AchievementBlock 
        v-for="achievement in achievements" 
        :key="achievement.id" 
        :item="achievement"
        :char-id="selectedCharacter"
        :is-loading-btn="isLoadingBtn"
        @claim="handleClaimReward"
        @reset="handleResetAchievement"
      />
    </div>

    <el-skeleton v-else animated>
      <template #template>
        <div class="achievements-content">
          <el-skeleton-item v-for="i in 4" :key="i" variant="p" style="width: 100%; height: 280px;" />
        </div>
      </template>
    </el-skeleton>
  </WrapperBlock>
</template>
<script setup lang="ts">
import WrapperBlock from '@/components/Blocks/WrapperBlock.vue'
import AchievementBlock from '@/components/Blocks/AchievementBlock.vue'
import CharacterSelector from '@/components/CharacterSelector.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useLkStore } from '@/stores/LkStore'
import { showError, showSuccess } from '@/utils/notifications'
import type { IAchievement } from '@/stores/types/LkStoreTypes'
import { ResetResult, RewardResult, AchievementStatus } from '@/stores/enums/AchievementStatuses'

const lkStore = useLkStore()
const selectedCharacter = ref('')
const isLoading = ref(false)
const characterSelectorRef = ref()
const isLoadingBtn = ref(false)

const achievements = ref<IAchievement[]>([])

const getAchievements = async (charId: string) => {
  isLoading.value = true
  try {
    const response = await lkStore.getAchievements(charId)
    achievements.value = response.achiv_list

  } catch (error) {
    showError('Ошибка при загрузке достижений')
  } finally {
    isLoading.value = false
  }
}

const handleClaimReward = async (data: { char_id: string, achiv_id: number }) => {
  isLoadingBtn.value = true
  try {
    const response = await lkStore.claimAchievementReward(data)
    
    switch (response.result) {
      case RewardResult.REWARD_SUCCESS:
        const achievement = achievements.value.find(a => a.id === data.achiv_id)
        if (achievement) {
          achievement.status = AchievementStatus.COMPLETED
        }
        showSuccess('Награда отправлена на почту')
        break
      case RewardResult.NO_REWARD:
        showError('Нет награды для получения')
        break
      case RewardResult.NO_VIP:
        showError('Для получения награды необходим VIP')
        break
      default:
        showError('Неизвестный статус ответа')
    }
  } catch (error) {
    showError('Ошибка при получении награды')
  } finally {
    isLoadingBtn.value = false
  }
}

const handleResetAchievement = async (data: { char_id: string, achiv_id: number }) => {
  isLoadingBtn.value = true
  try {
    const response = await lkStore.resetAchievement(data)
    
    switch (response.result) {
      case ResetResult.RESET_SUCCESS:
        const achievement = achievements.value.find(a => a.id === data.achiv_id)
        if (achievement) {
          achievement.current_progress = 0
          achievement.status = AchievementStatus.REWARD_NOT_AVAILABLE
        }
        showSuccess('Достижение обнулено')
        break
      case ResetResult.RESET_NOT_AVAILABLE:
        showError('Обнуление не доступно')
        break
      case ResetResult.NOT_ALL_REWARD_GIVEN:
        showError('Для обнуления необходимо получить все награды')
        break
      default:
        showError('Неизвестный статус ответа')
    }
  } catch (error) {
    showError('Ошибка при обнулении достижения')
  } finally {
    isLoadingBtn.value = false
  }
}

onMounted(async () => {
  if (lkStore.characters.length > 0) {
    selectedCharacter.value = lkStore.characters[0].char_id
    await getAchievements(lkStore.characters[0].char_id)
  }
})
</script>
<style lang="scss">
.achievements {
  .achievements-header {
    display: flex;
    align-items: center;
    justify-content: center;
  } 
  .achievements-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
}
</style>
