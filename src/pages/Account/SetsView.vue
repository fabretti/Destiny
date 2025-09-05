<template>
  <WrapperBlock title="Наборы" class="sets">
    <div class="sets-content">
      <SetBlock v-for="item in 3" :key="item" />
    </div>
  </WrapperBlock>
</template>
<script setup lang="ts">
import WrapperBlock from '@/components/WrapperBlock.vue'
import SetBlock from '@/components/Blocks/SetBlock.vue'
</script>
<style lang="scss">
.sets {
  .sets-content {
    display: grid;
    gap: 30px;
  }
}
</style>
