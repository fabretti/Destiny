<template>
  <div class="download-block" :class="`${variant}`">
    <img :src="getImageSrc(img)" alt="img" class="download-block__img" />
    <div class="download-block__btn">
      <ButtonItem variant="solid-shadow" size="big" @click="handleDownload(link)">Скачать</ButtonItem>
    </div>
    <img :src="getCircleSrc(variant)" alt="circle" class="circle" />
  </div>
</template>
<script setup lang="ts">
import googleImg from '@/assets/img/download-block/google.png'
import launcherImg from '@/assets/img/download-block/Launcher.png'
import torrentImg from '@/assets/img/download-block/torrent.png'
import circleImg from '@/assets/img/download-block/circle.png'
import circleBigImg from '@/assets/img/download-block/circle-big.png'
import ButtonItem from '@/shared/ButtonItem.vue'

defineProps<{
  img: string
  variant: 'horizontal' | 'vertical'
  link: string
}>()

const images = {
  google: googleImg,
  Launcher: launcherImg,
  torrent: torrentImg,
}

const circleImages = {
  circle: circleImg,
  'circle-big': circleBigImg,
}

const getImageSrc = (imgName: string) => {
  return images[imgName as keyof typeof images] || ''
}

const getCircleSrc = (variant: 'horizontal' | 'vertical') => {
  const circleType = variant === 'vertical' ? 'circle-big' : 'circle'
  return circleImages[circleType as keyof typeof circleImages] || ''
}

const handleDownload = (link: string) => {
  window.open(link, '_blank')
}
</script>
<style lang="scss">
.download-block {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary);
  padding: 60px;
  border-radius: 26px;
  @include mq(laptop) {
    height: 200px;
    padding: 30px;
  }
  .download-block__img {
    object-fit: contain;
  }
  &.vertical {
    flex-direction: column;
    .circle {
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }
    @include mq(laptop) {
      flex-direction: row;
      .download-block__img {
        width: 150px;
      }
    }
  }
  &.horizontal {
    height: 280px;
    @include mq(laptop) {
      height: 200px;
      .download-block__img {
        width: 150px;
      }
    }
  }
  .circle {
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
