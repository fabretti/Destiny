<template>
  <header class="header" :class="`${isOpenedMenu ? 'opened' : ''}`">
    <nav class="header-container">
      <div class="header-timer">
        <div class="header-timer__date">
          <div class="number">{{ seasonTime?.days }}</div>
          <span>{{ getDayDeclension(seasonTime?.days || 0) }}</span>
        </div>
        <div class="header-timer__func">
          <div class="text">До конца сезона</div>
          <ButtonItem size="sm" @click="goToSeason">ПОДРОБНЕЕ</ButtonItem>
        </div>
      </div>
      <Divider />
      <ul class="header-nav">
        <li v-for="item in navItems" :key="item.id" class="nav-item">
          <router-link class="text-body-20" :to="item.href">
            <IconBase :name="item.icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
      <Divider />
      <div class="header-info">
        <div class="header-info__online">
          <span class="text-body-16">В сети:</span>
          <span class="online-count text-body-16">{{ online?.total }}</span>
        </div>
        <div class="header-info__race text-body-16">
          <div class="online">
            <IconBase name="elies" />
            {{ online?.light }}
          </div>
          <div class="online">
            <IconBase name="asm" />
            {{ online?.dark }}
          </div>
        </div>
      </div>
      <Divider />
      <div class="header-btns">
        <LanguageSelector />
        <ButtonItem variant="solid" @click="$router.push('/download')" class="header-btns__install">Установить
        </ButtonItem>
        <ButtonItem v-if="!isLoggedIn" :variant="isDesktop ? 'empty' : 'white'" @click="openAuthModal">
          Личный кабинет
        </ButtonItem>
        <router-link v-else to="/account" class="header-btns__account">
          <ButtonItem variant="empty">Личный кабинет</ButtonItem>
        </router-link>
      </div>
    </nav>
    <IconBase name="hamburger" class="header-humburger" @click="isOpenedMenu = !isOpenedMenu" />
    <IconBase name="close" class="header-close" @click="isOpenedMenu = !isOpenedMenu" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IconBase from '@/shared/IconBase.vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import Divider from './Divider.vue'
import LanguageSelector from './LanguageSelector.vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/HeaderStore'
import { useScreenSize } from '@/composables/useScreenSize'
import type { IOnlineResponse, ISeasonTimeData } from '@/stores/types/HeaderStoreTypes'
import { getDayDeclension } from '@/utils/declension'

const { isLoggedIn, openAuthModal } = useAuth()
const router = useRouter()
const headerStore = useHeaderStore()
const { isDesktop } = useScreenSize()

const isOpenedMenu = ref(false)
const navItems = [
  { id: 1, icon: 'Home', href: '/', name: 'Главная' },
  { id: 2, icon: 'Forum', href: '/forum', name: 'Форум' },
  { id: 3, icon: 'Premium', href: '/premium', name: 'Премиум' },
]

const goToSeason = () => {
  if (isLoggedIn.value) {
    router.push('/account/seasonal-rating')
  } else {
    openAuthModal()
  }
}

const online = ref<IOnlineResponse | null>(null)
const seasonTime = ref<ISeasonTimeData | null>(null)

const getOnline = async () => {
  try {
    online.value = await headerStore.getOnline()
  } catch (error) {
    console.error(error)
  }
}

const getSeasonTime = async () => {
  try {
    seasonTime.value = await headerStore.getSeasonTime()
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getOnline()
  await getSeasonTime()
})
</script>

<style lang="scss">
.header {
  z-index: 3;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);

  .divider {
    display: none;

    @include mq(laptop) {
      display: block;
    }
  }


  &.opened {
    @include mq(laptop) {
      background: var(--color-primary);

      .header-container {
        opacity: 1;
      }

      .header-humburger {
        display: none;
      }

      .header-close {
        display: block;
      }
    }
  }

  .header-humburger,
  .header-close {
    display: none;
    cursor: pointer;
    position: absolute;
    right: 18px;
    top: 18px;
  }

  @include mq(laptop) {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 4;

    .header-humburger {
      display: block;
    }
  }

  .header-container {
    position: relative;
    width: 100%;
    height: 100px;
    max-width: 1380px;
    padding: 0 30px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mq(laptop) {
      padding: 80px 20px;
      height: auto;
      flex-direction: column;
      opacity: 0;
    }
  }

  .header-timer {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: 12px;

    @include mq(laptop) {
      margin-right: 0;
      margin-bottom: 16px;
    }

    .header-timer__date {
      text-align: center;

      .number {
        font-family: Orelega One;
        font-weight: 400;
        font-size: 38px;
        line-height: 100%;
        letter-spacing: 1px;

        @include mq(laptop) {
          line-height: 24px;
        }
      }

      span {
        font-family: Cochin;
        font-weight: 700;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    }

    .header-timer__func {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;

      @include mq(laptop) {
        flex-direction: row;
      }

      .text {
        font-weight: 400;
        font-size: 10px;
        line-height: 100%;
        letter-spacing: 1px;
      }
    }
  }

  .header-nav {
    position: relative;
    height: 100%;
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0 24px 0 12px;

    @include mq(laptop) {
      flex-direction: column;
      padding: 12px 0;
      gap: 0;
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);

      @include mq(laptop) {
        display: none;
      }
    }

    &:before {
      left: 0;
    }

    &:after {
      right: 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: opacity 0.2s;

      a {
        display: flex;
        align-items: center;
      }
    }
  }

  .header-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;

    @include mq(laptop) {
      padding: 24px 0;
      gap: 16px;
    }

    .header-info__online {
      display: flex;
      flex-direction: column;
      gap: 12px;

      @include mq(laptop) {
        flex-direction: row;
        align-items: center;
      }

      .online-count {
        min-width: 70px;
        height: 24px;
        border-radius: 20px;

        border: 1px solid #b3dff438;
        backdrop-filter: blur(10px);
        box-shadow: 0px 0px 30px 0px #67c9f721 inset;

        font-family: Georgia Pro;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 2px;
        text-align: center;
      }
    }

    .header-info__race {
      display: flex;
      flex-direction: column;
      gap: 10px;

      @include mq(laptop) {
        flex-direction: row;
        align-items: center;
      }

      .online {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);

      @include mq(laptop) {
        display: none;
      }
    }
  }

  .header-lang {
    position: relative;
    margin-left: 12px;
  }

  .header-btns {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 12px;

    @include mq(laptop) {
      margin: 36px 0;
      flex-direction: column-reverse;
    }

    .header-btns__install {
      @include mq(laptop) {
        display: none;
      }
    }

    .header-btns__account {
      @include mq(laptop) {
        width: 100%;
      }
    }
  }
}
</style>
