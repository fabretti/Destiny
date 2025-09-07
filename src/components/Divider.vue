<template>
  <div class="divider" :class="`${variant}`"></div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'horizontal' | 'vertical'
}>(), {
  variant: 'horizontal'
})
</script>
<style lang="scss">
.divider {
  background: #FFFFFF4F;
  &.vertical {
    height: 100%;
    width: 1px;
  }
  &.horizontal {
    height: 1px;
    width: 100%;
  }
}
</style>