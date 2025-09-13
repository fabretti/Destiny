<template>
  <div class="roulette">
    <div class="roulette-content">
      <div class="roulette-content__spin">
        <!-- Секторы рулетки -->
        <div class="roulette-sectors">
          <div v-for="(prize, index) in prizes" :key="`sector-${index}`" class="sector" :style="{
            transform: `rotate(${index * 40}deg)`
          }"></div>
        </div>

        <div class="block-prices">
          <div v-for="(prize, index) in prizes" :key="index" class="price-item">
            <img :src="prize.image" :alt="prize.name" class="price-img" />
          </div>
        </div>
        <img src="@/assets/img/roulette/strelka.png" alt="strelka" class="arrow" :class="{ spinning: isSpinning }"
          :style="{ transform: `rotate(${arrowRotation}deg)` }" />
      </div>
      <div class="roulette-content__info">
        <div class="result">
          <div class="result-price">
            <img v-if="selectedPrize" :src="selectedPrize.image" :alt="selectedPrize.name" class="prize-image" />
          </div>
          <ButtonItem variant="solid-shadow" size="medium">ПОЛУЧИТЬ</ButtonItem>
          <div class="text-body-12 text-center">Подарок придет на почту персонажа</div>
        </div>
        <Divider variant="vertical" />
        <div class="actions">
          <div class="text-body-16 text-center">
            До конца акции:<br />
            <span>00 : 00 : 00 : 00</span>
          </div>
          <div class="text-body-14 mt-auto">Баланс:</div>
          <div class="actions-balance">
            {{ formatCurrency(5000, 'TOLL') }}
          </div>
          <div class="actions-btn">
            <ButtonItem variant="solid-shadow" size="medium" :disabled="isSpinning" @click="spinRoulette">
              Крутить
            </ButtonItem>
            <div class="text-body-12">1 попытка = {{ formatCurrency(50, 'TOLL') }}</div>
          </div>
        </div>
      </div>
      <img src="@/assets/img/roulette/roulette.png" alt="roulette" class="roulette-img" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import { formatCurrency } from '@/utils/formatters'
import Divider from '@/components/Divider.vue'

// Тип для приза
interface Prize {
  name: string
  image: string
  probability: number
}

const prizes = ref<Prize[]>([
  { name: '100 монет', image: '/src/assets/img/price.png', probability: 92 },
  { name: '200 монет', image: '/src/assets/img/price.png', probability: 1 },
  { name: '500 монет', image: '/src/assets/img/price.png', probability: 1 },
  { name: '1000 монет', image: '/src/assets/img/price.png', probability: 1 },
  { name: '2000 монет', image: '/src/assets/img/price.png', probability: 1 },
  { name: '5000 монет', image: '/src/assets/img/price.png', probability: 1 },
  { name: '10000 монет', image: '/src/assets/img/price.png', probability: 1 },
  { name: 'VIP 7 дней', image: '/src/assets/img/price.png', probability: 1 },
  { name: 'VIP 30 дней', image: '/src/assets/img/price.png', probability: 1 }
])

// Состояние рулетки
const isSpinning = ref(false)
const arrowRotation = ref(0)
const selectedPrize = ref<Prize | null>(null)

// Функция выбора приза на основе вероятностей
const selectPrizeByProbability = (): Prize => {
  const random = Math.random() * 100 // Случайное число от 0 до 100
  let cumulativeProbability = 0

  for (const prize of prizes.value) {
    cumulativeProbability += prize.probability
    if (random <= cumulativeProbability) {
      return prize
    }
  }

  // Если что-то пошло не так, возвращаем первый приз
  return prizes.value[0]
}

// Функция определения приза по углу стрелки
const getPrizeByAngle = (angle: number): Prize => {
  // Нормализуем угол к диапазону 0-360
  const normalizedAngle = ((angle % 360) + 360) % 360

  // Вычисляем индекс приза (каждый приз занимает 40 градусов)
  // Смещаем на 20 градусов, чтобы стрелка указывала на центр сектора
  const prizeIndex = Math.floor((normalizedAngle + 20) / 40) % prizes.value.length

  return prizes.value[prizeIndex]
}

// Функция выбора приза с учетом вероятностей
const selectPrizeWithProbability = (): { prize: Prize, angle: number } => {
  // Сначала выбираем приз по вероятности
  const chosenPrize = selectPrizeByProbability()
  const prizeIndex = prizes.value.findIndex(prize => prize === chosenPrize)

  // Вычисляем базовый угол для этого приза
  const baseAngle = prizeIndex * 40

  // Добавляем случайное смещение в пределах сектора (±20 градусов)
  const randomOffset = (Math.random() - 0.5) * 40
  const finalAngle = baseAngle + randomOffset

  return { prize: chosenPrize, angle: finalAngle }
}

const spinRoulette = () => {

  if (isSpinning.value) return

  isSpinning.value = true
  selectedPrize.value = null

  // Выбираем приз с учетом вероятностей и получаем финальный угол
  const { prize: chosenPrize, angle: targetAngle } = selectPrizeWithProbability()

  // Добавляем несколько полных оборотов для эффекта вращения
  const fullRotations = 5 + Math.random() * 3 // 5-8 полных оборотов
  const finalRotation = fullRotations * 360 + targetAngle

  arrowRotation.value = finalRotation

  // Завершаем вращение через 3 секунды
  setTimeout(() => {
    isSpinning.value = false

    // Определяем приз по финальному углу стрелки
    const finalAngle = finalRotation % 360
    const actualPrize = getPrizeByAngle(finalAngle)
    selectedPrize.value = actualPrize
    arrowRotation.value = 0
  }, 3000)
}
</script>
<style lang="scss">
.roulette {
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;

  .roulette-content {
    position: relative;
    display: flex;
    align-items: center;
    width: 1121px;

    .roulette-content__spin {
      width: 628px;
      height: 628px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      position: relative;

      .roulette-sectors {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;

        .sector {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 250px;
          height: 250px;
          margin-left: -125px;
          margin-top: -125px;
          transform-origin: 50% 50%;
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          border-radius: 0 0 50% 50%;
        }
      }

      .block-prices {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;

        .price-item {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 80px;
          margin-left: -40px;
          margin-top: -40px;

          // Располагаем призы по кругу на расстоянии 250px от центра
          &:nth-child(1) {
            transform: rotate(0deg) translateY(var(--rotation-radius)) rotate(0deg);
          }

          &:nth-child(2) {
            transform: rotate(40deg) translateY(var(--rotation-radius)) rotate(-40deg);
          }

          &:nth-child(3) {
            transform: rotate(80deg) translateY(var(--rotation-radius)) rotate(-80deg);
          }

          &:nth-child(4) {
            transform: rotate(120deg) translateY(var(--rotation-radius)) rotate(-120deg);
          }

          &:nth-child(5) {
            transform: rotate(160deg) translateY(var(--rotation-radius)) rotate(-160deg);
          }

          &:nth-child(6) {
            transform: rotate(200deg) translateY(var(--rotation-radius)) rotate(-200deg);
          }

          &:nth-child(7) {
            transform: rotate(240deg) translateY(var(--rotation-radius)) rotate(-240deg);
          }

          &:nth-child(8) {
            transform: rotate(280deg) translateY(var(--rotation-radius)) rotate(-280deg);
          }

          &:nth-child(9) {
            transform: rotate(320deg) translateY(var(--rotation-radius)) rotate(-320deg);
          }

          .price-img {
            width: 80px;
            height: 80px;
            object-fit: contain;
          }
        }
      }
    }

    .roulette-content__info {
      display: flex;
      gap: 20px;
      height: 300px;
      position: relative;
      transform: translateX(-25px);
      z-index: 2;

      .result {
        width: 100%;
        height: 100%;
        max-width: 190px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;

        .result-price {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          border: 1px solid var(--color-border);
          border-radius: 18px;
        }
      }

      .actions {
        display: flex;
        flex-direction: column;
        align-items: center;

        .actions-balance {
          font-weight: 400;
          font-size: 14px;
          letter-spacing: 2px;
          padding: 4px 12px;
          margin: 20px 0 30px;
          background: #1E2F444D;
          border: 1px solid #B3DFF438;
          backdrop-filter: blur(10px);
          box-shadow: 0px 0px 10px 0px #67C9F729, 0px 0px 30px 0px #67C9F721 inset;
          border-radius: 20px;

        }
        .actions-btn {
          text-align: center;
          display: grid;
          gap: 50px;
          margin-top: auto;
        }
      }
    }

    .roulette-img {
      position: absolute;
      top: 0;
    }

    .arrow {
      margin-bottom: 46px;
      z-index: 3;

      &.spinning {
        transition: transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    }
  }
}
</style>