<template>
  <div class="main">
    <div class="main-container">
      <IconBase name="logo" class="main-logo" />
      <span class="main-version"> - 4.6 - </span>
      <span class="main-title">Уникальный сервер Aion с новым функционалом</span>
      <div class="main-btns">
        <router-link to="/download">
          <ButtonItem variant="solid-shadow" size="big">Установить</ButtonItem>
        </router-link>
        <ButtonItem variant="empty" color="white" size="big" @click="openAuthModal">
          Личный кабинет
        </ButtonItem>
      </div>
    </div>
    <img src="../assets/img/MainHero.png" alt="bg" class="main-bg" />
  </div>
</template>
<script setup lang="ts">
import ButtonItem from '@/shared/ButtonItem.vue'
import IconBase from '@/shared/IconBase.vue'
import { useAuth } from '@/composables/useAuth'

const { openAuthModal } = useAuth()
</script>
<style lang="scss">
.main {
  height: 100%;
  position: relative;
  z-index: 2;
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
  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 100px;
    position: relative;
    z-index: 2;
    .main-version {
      font-weight: 400;
      font-size: 45px;
      color: #ab7c62;
    }
    .main-title {
      font-weight: 400;
      font-size: 22px;
      line-height: 100%;
      letter-spacing: 1px;
      margin: 16px 0 40px;
    }
    .main-btns {
      display: flex;
      gap: 24px;
    }
  }

  .main-bg {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
}
</style>
