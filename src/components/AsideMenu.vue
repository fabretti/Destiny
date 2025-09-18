<template>
  <aside class="aside-menu">
    <OnlineInfoBlock />
    <nav class="menu-nav">
      <ul class="menu-list">
        <li v-for="item in menuItems" :key="item.id" class="menu-item" :class="{
          'menu-item--logout': item.isLogout,
        }">
          <!-- Для пунктов с маршрутами используем router-link -->
          <router-link v-if="item.route && !item.action" :to="item.route" class="menu-item__link" :class="{
            'menu-item__link--active': $route.path === item.route,
          }" @click="closeAsideMenu()">
            <div class="menu-item__content">
              <div class="menu-item__icon">
                <IconBase v-if="$route.path === item.route" name="blueBlur" class="blur" />
                <IconBase :name="item.icon" class="icon" />
              </div>
              <span class="menu-item__text">{{ item.text }}</span>
              <IconBase v-if="$route.path === item.route" class="menu-item__indicator" name="indicator" />
            </div>
          </router-link>

          <!-- Для пунктов с кастомными действиями используем обычный div -->
          <div v-else class="menu-item__link" :class="{
            'menu-item__link--logout': item.isLogout,
          }" @click="handleItemClick(item)">
            <div class="menu-item__content">
              <div class="menu-item__icon">
                <IconBase name="redBlur" class="blur" />
                <IconBase :name="item.icon" class="icon" />
              </div>
              <span class="menu-item__text">{{ item.text }}</span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import OnlineInfoBlock from './OnlineInfoBlock.vue'
import IconBase from '@/shared/IconBase.vue'
import { useAuthStore } from '@/stores/AuthStore'

interface MenuItem {
  id: string
  text: string
  icon: string
  route?: string
  isActive?: boolean
  isLogout?: boolean
  action?: () => void
}

const props = defineProps<{
  items?: MenuItem[]
}>()

const router = useRouter()
const AuthStore = useAuthStore()
const emit = defineEmits(['closeAsideMenu'])
const defaultMenuItems: MenuItem[] = [
  {
    id: 'account',
    text: 'Аккаунт и баланс',
    icon: 'user',
    route: '/account',
  },
  {
    id: 'premium',
    text: 'Премиум',
    icon: 'crown',
    route: '/premium',
  },
  {
    id: 'shop',
    text: 'Магазин',
    icon: 'shopping-bag',
    route: '/account/shop',
  },
  {
    id: 'sets',
    text: 'Наборы',
    icon: 'treasure-chest',
    route: '/account/sets',
  },
  {
    id: 'achievements',
    text: 'Достижения',
    icon: 'trophy',
    route: '/account/achievements',
  },
  {
    id: 'wheel',
    text: 'Колесо фортуны',
    icon: 'star-outline',
    route: '/account/roulette',
  },
  {
    id: 'seasonal-rating',
    text: 'Сезонный рейтинг',
    icon: 'badge',
    route: '/account/seasonal-rating',
  },
  {
    id: 'rating',
    text: 'Рейтинг',
    icon: 'star',
    route: '/account/rating',
  },
  {
    id: 'logout',
    text: 'Выйти',
    icon: 'logout',
    isLogout: true,
    action: () => handleLogout(),
  },
]

const menuItems = ref<MenuItem[]>(props.items || defaultMenuItems)

watch(
  () => props.items,
  (newItems) => {
    if (newItems) {
      menuItems.value = newItems
    }
  },
  { deep: true },
)

const closeAsideMenu = () => {
  emit('closeAsideMenu')
}

const handleItemClick = (item: MenuItem) => {
  if (item.action) {

    item.action()
  }
}

const handleLogout = () => {
  AuthStore.logout()
  router.push('/')
}
</script>

<style scoped lang="scss">
.aside-menu {
  min-width: 380px;
  background: var(--color-primary);
  border-radius: 25px;
  padding: 30px 40px;
  overflow: hidden;
  z-index: 2;
  &.full-pages {
    display: none;
  }
  .online-info {
    display: none;
  }

  @include mq(laptop) {
    display: none;
    min-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0;
    padding: 16px;
    z-index: 5;

    .online-info {
      display: flex;
      padding: 15px;
    }
  }

  .menu-nav {
    height: 100%;
  }

  .menu-list {
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;

    @include mq(laptop) {
      padding: 15px;
    }
  }

  .menu-item {
    position: relative;
    transition: all 0.3s ease;

    &:not(:last-child) {
      border-bottom: 1px solid #a8b5c51a;

      .menu-item__link {
        padding-bottom: 20px;
      }
    }

    &:not(:first-child) {
      .menu-item__link {
        padding-top: 20px;
      }
    }

    &.menu-item--logout {
      margin-top: auto;
    }
  }

  .menu-item__link {
    display: block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      .menu-item__text {
        transform: translateX(8px);
      }
    }

    .menu-item__link--active {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

      .menu-item__icon {
        background: #67c9f7bf;
      }
    }

    &.menu-item__link--logout {
      .menu-item__text {
        color: #da8686;
      }
    }
  }

  .menu-item__content {
    display: flex;
    align-items: center;
    position: relative;

    .menu-item__icon {
      position: relative;
      display: flex;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-right: 14px;
      transition: color 0.3s ease;

      .blur {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .icon {
        z-index: 2;
      }
    }

    .menu-item__text {
      font-weight: 400;
      font-size: 22px;
      line-height: 100%;
      letter-spacing: 1px;
      transition: 0.3s ease;
    }

    .menu-item__indicator {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
