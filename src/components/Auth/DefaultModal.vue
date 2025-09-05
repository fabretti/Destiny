<template>
  <el-dialog
    v-model="isVisible"
    class="default-modal"
    width="400px"
    :before-close="handleClose"
    :show-close="false"
    center
  >
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

const isVisible = defineModel<boolean>()
const emit = defineEmits(['close'])
const handleClose = () => {
  isVisible.value = false
  emit('close')
}
</script>
<style lang="scss">
.default-modal.el-dialog {
  height: 670px;
  width: 950px;
  padding: 10px 30px 56px 60px;
  background: var(--color-primary);
  border-radius: 25px;
  
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