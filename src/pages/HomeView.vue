<template>
  <div class="home">
    <div class="home-block">
      <img src="@/assets/icons/logo.svg" alt="logo" class="home-logo" />
      <span class="home-version"> - 4.6 - </span>
      <span class="home-title">Уникальный сервер Aion с новым функционалом</span>
      <div class="home-btns">
        <router-link to="/download" class="home-block__install">
          <ButtonItem variant="solid-shadow" size="big">Установить</ButtonItem>
        </router-link>
        <ButtonItem variant="empty" color="white" size="big" @click="AuthStore.openAuthModal">
          Личный кабинет
        </ButtonItem>
      </div>
    </div>
    <img src="../assets/img/MainHero.png" alt="bg" class="home-bg" />
  </div>
</template>
<script setup lang="ts">
import ButtonItem from '@/shared/ButtonItem.vue'
import { useAuthStore } from '@/stores/AuthStore'

const AuthStore = useAuthStore()
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    height: 411px;
    background: linear-gradient(180deg, rgba(29, 42, 57, 0) 0%, rgba(29, 42, 57, 0.89) 71.35%);
  }

  .home-block {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 100px;
    position: relative;
    z-index: 2;
    @include mq(laptop) {
      justify-content: center;
      padding-bottom: 0;
    }
    .home-logo {
      @include mq(laptop) {
        height: 74px;
      }
    }
    .home-version {
      font-weight: 400;
      font-size: 45px;
      color: var(--color-brown);
      @include mq(laptop) {
        font-size: 16px;
      }
    }
    .home-title {
      font-weight: 400;
      font-size: 22px;
      line-height: 100%;
      letter-spacing: 1px;
      margin: 16px 0 40px;
      @include mq(laptop) {
        max-width: 180px;
        text-align: center;
        font-size: 14px;
        margin: 16px 0 20px;
      }
    }
    .home-block__install {
      @include mq(laptop) {
        display: none;
      }
    }
    .home-btns {
      display: flex;
      gap: 24px;
    }
  }

  .home-bg {
    position: absolute;
    top: -30px;
    left: calc(50% + 38px);
    transform: translateX(-50%);
    z-index: 1;
    @include mq(laptop) {
      height: 420px;
      top: 35px;
    }
  }
}
</style>
