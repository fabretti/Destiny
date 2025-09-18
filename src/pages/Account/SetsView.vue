<template>
  <WrapperBlock title="Наборы" class="sets">
    <div class="sets-content">
      <SetBlock v-for="item in 7" :key="item" />
    </div>
  </WrapperBlock>
</template>
<script setup lang="ts">
import WrapperBlock from '@/components/Blocks/WrapperBlock.vue'
import SetBlock from '@/components/Blocks/SetBlock.vue'
</script>
<style lang="scss">
.sets {
  .sets-content {
    display: grid;
    gap: 30px;
    @include mq(laptop) {
      gap: 20px;
    }
  }
}
</style>
