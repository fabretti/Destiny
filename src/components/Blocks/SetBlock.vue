<template>
  <div class="set-block">
    <img src="@/assets/icons/big-chest.svg" alt="item_img" class="set-block__img" />
    <div class="set-block__info">
      <div class="name">
        <p>Набор новичка</p>
        <span class="price-desktop text-underline">{{ formatCurrency('190') }}</span>
      </div>
      <div class="items">
        <img v-for="item in 7" src="@/assets/img/item.png" alt="item" />
      </div>
      <div class="btn">
        <span class="price-mobile text-underline">{{ formatCurrency('190') }}</span>
        <ButtonItem variant="solid-shadow" size="medium">Купить</ButtonItem>
      </div>
    </div>
    <img src="@/assets/img/setCycle.png" alt="cycle" class="set-block__cycle" />
  </div>
</template>
<script setup>
import ButtonItem from '@/shared/ButtonItem.vue'
import { formatCurrency } from '@/utils/formatters'
</script>
<style lang="scss">
.set-block {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #b3dff438;
  background: #1e2f4480;
  border-radius: 25px;
  padding-right: 60px;
  overflow: hidden;

  @include mq(laptop) {
    padding-right: 0;
  }

  .set-block__img {
    @include mq(laptop) {
      width: 120px;
      height: 120px;
    }
  }

  .set-block__info {
    display: grid;
    gap: 28px;
    z-index: 2;

    @include mq(laptop) {
      gap: 12px;
      padding: 12px 32px 12px 0;
    }

    .name {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .items {
      display: flex;
      gap: 16px;
      @include mq(laptop) {
        overflow: auto;
        gap: 8px;
      }
    }
  }
  .price-desktop {
    @include mq(laptop) {
      display: none;
    }
  }
  .price-mobile {
    display: none;
    white-space: nowrap;
    @include mq(laptop) {
      display: block;
    }
  }
  .btn {
    @include mq(laptop) {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
    }
  }
  .set-block__cycle {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;

    @include mq(laptop) {
      height: 160px;
      width: 160px;
    }
  }
}
</style>
