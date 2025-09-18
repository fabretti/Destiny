<template>
  <div class="wrapper-block">
    <h2 v-if="title">{{ title }}</h2>
    <slot name="header" />
    <el-scrollbar>
      <slot />
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
<style lang="scss">
.wrapper-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  background: var(--color-primary);
  padding: 36px 46px;
  z-index: 2;
  border-radius: 25px;
  @include mq(laptop) {
    padding: 60px 16px 32px;
    border-radius: 0;
    background: initial;
    align-items: center;
  }
  .el-scrollbar {
    width: 100%;
  }
}
</style>
