<template>
  <el-dialog v-model="isVisible" class="default-modal" :width="width" :before-close="handleClose" :show-close="false"
    center>
    <template #header="{ close }">
      <div class="default-modal__header">
        <IconBase name="close" @click="close" />
      </div>
    </template>
    <slot />
  </el-dialog>
</template>
<script setup lang="ts">
import IconBase from '@/shared/IconBase.vue'
import { ref, computed } from 'vue'

interface Props {
  width?: string
}

withDefaults(defineProps<Props>(), {
  width: '950px',
})

const isVisible = defineModel<boolean>()
const emit = defineEmits(['close'])
const handleClose = () => {
  isVisible.value = false
  emit('close')
}
</script>
<style lang="scss">
.el-overlay-dialog {
  @include mq(laptop) {
    top: initial !important;
  }
}

.default-modal.el-dialog {
  padding: 16px 60px 56px;
  background: var(--color-primary);
  border-radius: 25px;

  @include mq(laptop) {
    margin: 0;
    width: 100%;
    border-radius: 25px 25px 0 0;
  }
  @include mq(phone-430) {
    padding: 16px 20px 40px;
  }

  .el-dialog__header {
    position: relative;
    z-index: 3;

    .default-modal__header {
      position: absolute;
      right: 0;
      top: 10px;
      cursor: pointer;
    }
  }

  .el-dialog__body {
    color: var(--color-white);
  }
}
</style>