<template>
  <div class="download-view">
      <h1 class="text-center">ЯЗЫК КЛИЕНТА ЗАВИСИТ ОТ ЯЗЫКА САЙТА</h1>
      <div class="download-view__content">
        <DownloadBlock
          v-for="item in downloadBlocks"
          :key="item.id"
          :img="item.img"
          :variant="item.variant"
          :link="item.link"
        />
    </div>
  </div>
</template>
<script setup lang="ts">
import DownloadBlock from '@/pages/widgets/DownloadBlock.vue'

const downloadBlocks = [
  {
    id: 1,
    img: 'Launcher',
    variant: 'vertical',
    link: 'https://cdn.aiondestiny.net/torrents/AionDestiny.exe',
  },
  {
    id: 2,
    img: 'torrent',
    variant: 'horizontal',
    link: 'https://cdn.aiondestiny.net/torrents/Aion%20Destiny%204.6%20RUS.torrent',
  },
  {
    id: 3,
    img: 'google',
    variant: 'horizontal',
    link: 'https://drive.google.com/file/d/1PeSsxkhfLBJM59QDnpCqkDZtL_sohfEO/view?usp=sharing',
  },
] as const
</script>
<style lang="scss">
// @import '@/assets/mixins/media.scss';

.download-view {
  width: 100%;
  padding: 70px 0;
  overflow: hidden;
  .download-view__content {
    padding-top: 70px;
    display: grid;
    grid-template-columns: 440px 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: 26px;
    .download-block:first-child {
      grid-area: 1 / 1 / 3 / 2;
      @include mq(laptop) {
        grid-area: inherit;
      }
    }
    .download-block:nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
      @include mq(laptop) {
        grid-area: inherit;
      }
    }
    .download-block:last-child {
      grid-area: 2 / 2 / 3 / 3;
      @include mq(laptop) {
        grid-area: inherit;
      }
    }
    @include mq(laptop) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
  }
}
</style>
