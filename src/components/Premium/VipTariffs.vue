<template>
  <div class="vip-tariffs" :class="size">
    <div class="vip-cards">
      <div v-for="tariff in tariffs" :key="tariff.id" class="vip-card">
        <div class="vip-card-image">
          <img :src="tariff.image" :alt="tariff.title" />
        </div>
        <div class="vip-card-content">
          <h3 class="vip-card-title text-body-20">{{ tariff.title }}</h3>
          <div class="vip-card-price">{{ tariff.price }} T</div>
        </div>
        <ButtonItem variant="solid-shadow" size="medium" class="vip-card-button" @click="handleBuy(tariff.id)">
          КУПИТЬ
        </ButtonItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonItem from '@/shared/ButtonItem.vue'

interface VipTariff {
  id: number
  title: string
  price: string
  image: string
}

interface Emits {
  (e: 'buy', tariffId: number): void
}

defineProps<{
  size?: 'large' | 'small'
}>()

// Данные для VIP тарифов
const tariffs = ref<VipTariff[]>([
  {
    id: 1,
    title: 'VIP (14 дней)',
    price: '399',
    image: '/src/assets/img/vip14.png',
  },
  {
    id: 2,
    title: 'VIP (30 дней)',
    price: '399',
    image: '/src/assets/img/vip30.png',
  },
])

const emit = defineEmits<Emits>()

const handleBuy = (tariffId: number) => {
  emit('buy', tariffId)
}
</script>

<style lang="scss" scoped>
.vip-tariffs {
  @include mq(laptop) {
    width: 100%;
  }

  .vip-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;

    .vip-card {
      background: #1a29374d;
      border: 1px solid #b3dff438;
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      text-align: center;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      padding: 18px;
      &:hover {
        transform: translateY(-5px);
        box-shadow:
          0px 0px 25px 0px rgba(103, 201, 247, 0.25),
          0px 0px 50px 0px rgba(43, 109, 141, 0.8);
      }

      .vip-card-image {
        img {
          width: 120px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));

          @include mq(laptop) {
            width: 90px;
          }
        }
      }

      .vip-card-title {
        color: var(--color-white);
        margin-bottom: 20px;
      }

      .vip-card-price {
        font-weight: 500;
        font-size: 40px;

        color: var(--color-white);
        margin-bottom: 24px;
        @include mq(laptop) {
          font-size: 24px;
        }
      }

      .vip-card-button {
        width: 100%;
        margin-top: auto;
      }
    }
  }

  &.large {
    .vip-cards .vip-card .vip-card-image img {
      width: 250px;
    }
  }

  &.small {
    .vip-cards {
      display: flex;
      flex-direction: column;
    }

    .vip-card {
      height: 116px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .vip-card-image,
      .vip-card-title,
      .vip-card-price,
      .vip-card-button {
        margin: 0;
      }

      .vip-card-button {
        width: 150px;
        @include mq(laptop) {
          width: 100px;
        }
      }
    }
  }
}

// Адаптивность
@media (max-width: 768px) {
  .vip-tariffs-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .vip-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .vip-card {
    padding: 20px;
  }
}
</style>
