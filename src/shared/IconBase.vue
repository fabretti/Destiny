<template>
  <div class="iconBase" v-html="iconSvg" :class="{ [`size-${size}`]: size, color: color }"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  name: string
  size?: string
  color?: string
}>()

const iconSvg = ref('')

// Fallback иконка (простой круг)
const fallbackIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'

onMounted(async () => {
  try {
    const module = await import(`@/assets/icons/${props.name}.svg?raw`)
    iconSvg.value = module.default
  } catch (error) {
    console.error(`Ошибка загрузки иконки ${props.name}:`, error)
    iconSvg.value = fallbackIcon
  }
})
</script>
<style lang="scss">
.iconBase {
  display: flex;
  &.size-40 {
    svg {
      width: 40px;
      height: 40px;
    }
  }
  &.size-24 {
    svg {
      width: 24px;
      height: 24px;
    }
  }
  &.size-14 {
    svg {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
