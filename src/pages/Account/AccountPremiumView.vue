<template>
  <div class="account-premium default-wrapper">
    <h2>Варианты VIP</h2>
    <div class="account-premium__content">
      <VipTariffs size="small" />
      <VipInfoBlock />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VipTariffs from '@/components/Premium/VipTariffs.vue'
import VipInfoBlock from '@/components/Premium/VipInfoBlock.vue'

const isShowAbout = ref(false)
</script>
<style lang="scss">
.account-premium {
  .account-premium__content {
    display: grid;
    gap: 30px;
    width: 100%;
    .vipInfo {
      max-width: 100%;
      display: grid;
      .vipInfo-block {
        .vipInfo-block__list {
          flex-wrap: wrap;
          width: 100%;
          .vipInfo-item:nth-child(6) {
            border-bottom: none;
          }
        }
        &:first-child {
          .vipInfo-block__list{
            height: 198px;
          }
        }
      }
    }
  }
}
</style>
