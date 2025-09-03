<template>
  <div class="vip-tariffs">
    <div class="vip-cards">
      <div v-for="tariff in tariffs" :key="tariff.id" class="vip-card">
        <div class="vip-card-image">
          <img :src="tariff.image" :alt="tariff.title" />
        </div>
        <h3 class="vip-card-title text-body-20">{{ tariff.title }}</h3>
        <div class="vip-card-price">{{ tariff.price }} T</div>
        <ButtonItem
          variant="solid-shadow"
          size="medium"
          class="vip-card-button"
          @click="handleBuy(tariff.id)"
        >
          КУПИТЬ
        </ButtonItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonItem from '@/shared/ButtonItem.vue'

interface VipTariff {
  id: number
  title: string
  price: string
  image: string
}

interface Props {
  title?: string
  tariffs: VipTariff[]
}

interface Emits {
  (e: 'buy', tariffId: number): void
}

withDefaults(defineProps<Props>(), {
  title: 'ТАРИФЫ VIP',
})

const emit = defineEmits<Emits>()

const handleBuy = (tariffId: number) => {
  emit('buy', tariffId)
}
</script>

<style lang="scss" scoped>
.vip-tariffs {
  margin-bottom: 60px;

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

      &:hover {
        transform: translateY(-5px);
        box-shadow:
          0px 0px 25px 0px rgba(103, 201, 247, 0.25),
          0px 0px 50px 0px rgba(43, 109, 141, 0.8);
      }

      .vip-card-image {
        margin-bottom: 20px;

        img {
          width: 120px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));
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
      }

      .vip-card-button {
        width: 100%;
        margin-top: auto;
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
