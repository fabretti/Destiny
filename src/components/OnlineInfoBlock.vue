<template>
  <div class="online-info">
    <div class="online-info__online">
      <span class="text-body-16">В сети:</span>
      <span class="online-count text-body-16">{{ online?.total }}</span>
    </div>
    <div class="online-info__race text-body-16">
      <div class="online">
        <IconBase name="elies" />
        {{ online?.light }}
      </div>
      <div class="online">
        <IconBase name="asm" />
        {{ online?.dark }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IconBase from '@/shared/IconBase.vue'
import type { IOnlineResponse } from '@/stores/types/HeaderStoreTypes'
import { useHeaderStore } from '@/stores/HeaderStore'

const headerStore = useHeaderStore()

const online = ref<IOnlineResponse | null>(null)
const getOnline = async () => {
  try {
    online.value = await headerStore.getOnline()
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  await getOnline()
})  
</script>

<style lang="scss">
.online-info {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;

  @include mq(laptop) {
    padding: 24px 0;
    gap: 16px;
  }

  .online-info__online {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include mq(laptop) {
      flex-direction: row;
      align-items: center;
    }

    .online-count {
      min-width: 70px;
      height: 24px;
      border-radius: 20px;

      border: 1px solid #b3dff438;
      backdrop-filter: blur(10px);
      box-shadow: 0px 0px 30px 0px #67c9f721 inset;

      font-family: Georgia Pro;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 2px;
      text-align: center;
    }
  }

  .online-info__race {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @include mq(laptop) {
      flex-direction: row;
      align-items: center;
    }

    .online {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);

    @include mq(laptop) {
      display: none;
    }
  }
}
</style>
