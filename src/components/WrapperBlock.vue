<template>
  <div class="wrapper-block">
    <h2 v-if="title">{{ title }}</h2>
    <el-scrollbar height="600px">
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
}
</style>
