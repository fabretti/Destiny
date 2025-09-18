<template>
  <div class="roulette">
    <div class="roulette-title">
      <h2>Колесо фортуны</h2>
      <BalanceDisplay :value="5000" currency="TOLL" />
    </div>
    <div class="roulette-content">
      <div class="roulette-content__spin">
        <!-- Колесо рулетки -->
        <div ref="wheelElement" class="wheel" :style="{ transform: `rotate(${wheelRotation}rad)` }">
          <div v-for="(item, index) in itemsWheel" :key="index" class="itemWheel" :style="item.style">
            <img :src="item.image.url" :alt="item.image.name" class="itemWheel-img" />
          </div>
        </div>
        <img src="@/assets/img/roulette/strelka.png" alt="strelka" class="arrow" />
      </div>
      <div class="roulette-content__info">
        <div class="result">
          <div class="result-time text-body-16 text-center">
            До конца акции:<br />
            <span>00 : 00 : 00 : 00</span>
          </div>
          <div class="result-price">
            <img v-if="selectedPrize" :src="selectedPrize.image" :alt="selectedPrize.name" class="prize-image" />
          </div>
          <ButtonItem variant="solid" size="medium">ПОЛУЧИТЬ</ButtonItem>
          <div class="result-help text-body-12 text-center">Подарок придет на почту персонажа</div>
        </div>
        <Divider variant="vertical" />
        <div class="actions">
          <div class="actions-time text-body-16 text-center">
            До конца акции:<br />
            <span>00 : 00 : 00 : 00</span>
          </div>
          <BalanceDisplay :value="5000" currency="TOLL" />
          <div class="actions-btn">
            <ButtonItem variant="solid-shadow" size="medium" :disabled="isSpinning" @click="spinRoulette">
              Крутить
            </ButtonItem>
            <div class="text-body-12">1 попытка = {{ formatCurrency(50, 'TOLL') }}</div>
          </div>
        </div>
        <div class="back" @click="handleBack">
          <IconBase name="close" />
        </div>
      </div>
      <img src="@/assets/img/roulette/roulette.png" alt="roulette" class="roulette-img" />
      <img src="@/assets/img/roulette/rouletteMobile.png" alt="roulette" class="roulette-img-mobile" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import ButtonItem from '@/shared/ButtonItem.vue'
import { formatCurrency } from '@/utils/formatters'
import Divider from '@/components/Divider.vue'
import IconBase from '@/shared/IconBase.vue'
import BalanceDisplay from '@/components/BalanceDisplay.vue'
import { useRouter } from 'vue-router'
import { useScreenSize } from '@/composables/useScreenSize'

const router = useRouter()
const { isDesktop } = useScreenSize()

interface IPrize {
  name: string
  image: string
  url: string
  probability: number
}

interface IItemWheel {
  element: HTMLElement | null
  cos: number
  sin: number
  image: IPrize
  style: string
}

const prizes = ref<IPrize[]>([
  { name: '100 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 92 },
  { name: '200 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: '500 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: '1000 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: '2000 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: '5000 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: '10000 монет', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: 'VIP 7 дней', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 },
  { name: 'VIP 30 дней', image: '/src/assets/img/price.png', url: '/src/assets/img/price.png', probability: 1 }
])


const handleBack = () => {
  router.push('/')
}

const wheelElement = ref<HTMLElement | null>(null)
const wheelRotation = ref(0)
const isSpinning = ref(false)
const selectedPrize = ref<IPrize | null>(null)
const itemsWheel = ref<IItemWheel[]>([])

const minImagesToSpin = 30
const maxImagesToSpin = 50
const duration = 6000

const state = ref({
  radiansToSpin: 0,
  step: 0,
  spinnedRadiansCount: 0,
  spinnedImagesCount: 0,
  frameID: 0,
  startSpinTime: 0,
  isSpinned: false
})

let spinResult: IPrize | null = null

const easeInOutCubic = (t: number): number => {
  return Math.sqrt(1 - Math.pow(t - 1, 2))
}

const fillWheel = () => {
  if (!wheelElement.value) return

  itemsWheel.value = []
  state.value.step = Math.PI * 2 / prizes.value.length

  prizes.value.forEach((prize, index) => {
    const angle = -Math.PI / 2 + state.value.step * index

    itemsWheel.value.push({
      element: null,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
      image: prize,
      style: ''
    })
  })

  nextTick(() => {
    resizeCircles()
  })
}

const dynamicWheelSize = computed(() => {
  return isDesktop.value ? 560 : 340
})

const resizeCircles = () => {
  if (!wheelElement.value) return

  itemsWheel.value.forEach((item, i) => {
    const x = item.cos * dynamicWheelSize.value / 3
    const y = item.sin * dynamicWheelSize.value / 3

    item.style = `transform: translate(${x}px, ${y}px) rotate(${state.value.step * i}rad)`
  })
}

const selectPrizeByProbability = (): IPrize => {
  const random = Math.random() * 100
  let cumulativeProbability = 0

  console.log('🎲 Случайное число:', random.toFixed(2))

  for (const prize of prizes.value) {
    cumulativeProbability += prize.probability
    console.log(`📊 ${prize.name}: накопленная вероятность ${cumulativeProbability.toFixed(2)}%`)
    if (random <= cumulativeProbability) {
      console.log(`🎉 Выбран приз: ${prize.name}`)
      return prize
    }
  }

  console.log('⚠️ Возвращаем первый приз по умолчанию')
  return prizes.value[0]
}

const startSpin = () => {
  if (state.value.isSpinned) return

  state.value.isSpinned = true
  isSpinning.value = true
  selectedPrize.value = null

  const chosenPrize = selectPrizeByProbability()
  const prizeIndex = prizes.value.findIndex(prize => prize === chosenPrize)

  const fullRotations = Math.floor(minImagesToSpin + Math.random() * maxImagesToSpin)
  const targetPosition = fullRotations + prizeIndex

  state.value.spinnedRadiansCount += state.value.radiansToSpin
  state.value.radiansToSpin = state.value.step * targetPosition
  state.value.spinnedImagesCount += targetPosition

  spinResult = chosenPrize

  state.value.startSpinTime = Date.now()
  state.value.frameID = requestAnimationFrame(tick)
}

const stopSpin = () => {
  spin(1)
  cancelAnimationFrame(state.value.frameID)

  state.value.isSpinned = false
  isSpinning.value = false

  if (spinResult) {
    selectedPrize.value = spinResult
  }
}

const tick = () => {
  const now = Date.now()
  const t = (now - state.value.startSpinTime) / 1000 / (duration / 1000)
  const et = easeInOutCubic(t)

  if (t >= 1) {
    stopSpin()
    return
  }

  spin(et)
  state.value.frameID = requestAnimationFrame(tick)
}

const spin = (t: number) => {
  wheelRotation.value = state.value.spinnedRadiansCount + t * state.value.radiansToSpin
}

const handleResize = () => {
  resizeCircles()
}

const spinRoulette = () => {
  startSpin()
}

onMounted(() => {
  fillWheel()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (state.value.frameID) {
    cancelAnimationFrame(state.value.frameID)
  }
})
</script>
<style lang="scss">
.roulette {
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  margin-top: 80px;

  .roulette-title {
    display: none;

    @include mq(laptop) {
      display: block;
    }

    .balance-display {
      display: none;

      @include mq(laptop) {
        display: flex;
        margin-top: 12px;
      }
    }
  }

  .roulette-content {
    position: relative;
    display: flex;
    align-items: center;
    width: 1121px;

    @include mq(laptop) {
      flex-direction: column;
      width: auto;
      padding-bottom: 20px;
      border-radius: 20px;
      border: 1px solid #31445B;
    }

    .roulette-content__spin {
      width: 628px;
      height: 628px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      position: relative;

      @include mq(laptop) {
        width: 340px;
        height: 340px;
      }

      .wheel {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;

        .itemWheel {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          margin-left: -40px;
          margin-top: -40px;
          display: flex;
          align-items: center;
          justify-content: center;

          .itemWheel-img {
            width: 80px;
            height: 80px;
            object-fit: contain;

            @include mq(laptop) {
              width: 60px;
              height: 60px;
            }
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

      @include mq(laptop) {
        flex-direction: column;
        height: auto;
        transform: none;

        .ButtonItem {
          width: 100%;
        }
      }

      .result {
        width: 100%;
        height: 100%;
        max-width: 190px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;

        @include mq(laptop) {
          gap: 12px;
        }

        .result-time {
          display: none;

          @include mq(laptop) {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
        }

        .result-price {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          border: 1px solid var(--color-border);
          border-radius: 18px;

          @include mq(laptop) {
            width: 120px;
            height: 120px;
          }
        }

        .result-help {
          @include mq(laptop) {
            display: none;
          }
        }
      }

      .actions {
        display: flex;
        flex-direction: column;
        align-items: center;

        .actions-time {
          @include mq(laptop) {
            display: none;
          }
        }

        .balance-display {
          @include mq(laptop) {
            display: none;
          }
        }

        .actions-btn {
          text-align: center;
          display: grid;
          gap: 50px;
          margin-top: auto;

          @include mq(laptop) {
            gap: 20px;
          }
        }
      }

      .back {
        position: absolute;
        right: -28px;
        top: -28px;
        cursor: pointer;

        @include mq(laptop) {
          display: none;
        }
      }

      .divider {
        @include mq(laptop) {
          display: none;
        }
      }
    }

    .roulette-img {
      position: absolute;
      top: 0;

      @include mq(laptop) {
        display: none;
      }
    }

    .roulette-img-mobile {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
      display: none;

      @include mq(laptop) {
        display: block;
      }
    }

    .arrow {
      margin-bottom: 46px;
      z-index: 3;
      position: relative;

      @include mq(laptop) {
        width: 120px;
        margin-bottom: 30px;
      }
    }
  }
}
</style>