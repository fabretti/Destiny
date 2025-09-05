<template>
  <div class="vipInfo">
    <div class="vipInfo-block">
      <div class="vipInfo-block__title">Преимущества</div>
      <div class="vipInfo-block__list">
        <div v-for="benefit in benefits" :key="benefit.id" class="vipInfo-item">
          <span class="vipInfo-item__name">{{ benefit.name }}</span>
          <span class="vipInfo-item__value">{{ benefit.value }}</span>
        </div>
      </div>
    </div>
    <div class="vipInfo-block">
      <div class="vipInfo-block__title">Команды</div>
      <div class="vipInfo-block__list">
        <div v-for="command in commands" :key="command.id" class="vipInfo-item">
          <span class="vipInfo-item__name">{{ command.description }}</span>
          <span class="vipInfo-item__value">{{ command.code }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Интерфейсы
interface VipBenefit {
  id: number
  name: string
  value: string
}

interface VipCommand {
  id: number
  description: string
  code: string
}

// Данные преимуществ VIP
const benefits = ref<VipBenefit[]>([
  { id: 1, name: 'Опыт с монстров', value: 'x2' },
  { id: 2, name: 'Опыт с миссий/заданий', value: 'x2' },
  { id: 3, name: 'Выпадение предметов', value: 'x2' },
  { id: 4, name: 'Прокачка сбора', value: 'x2' },
  { id: 5, name: 'Прокачка ремесла', value: 'x2' },
  { id: 6, name: 'Разбор ресурсов', value: '1 сек' },
  { id: 7, name: 'Дебаф после смерти', value: 'Отсутствует' },
  { id: 8, name: 'Перелет', value: 'Бесплатно' },
  { id: 9, name: 'Очки бездны в PvP и PvE', value: '+10%' },
  { id: 10, name: 'Получение знаков арены', value: '+10%' },
  { id: 11, name: 'Система достижений', value: 'Расширенная' },
  { id: 12, name: 'Увеличенный лимит продаж', value: 'x1.5' },
])

// Данные команд VIP
const commands = ref<VipCommand[]>([
  { id: 1, description: 'Снимает вид конфеты', code: '.cancel' },
  { id: 2, description: 'Отображает урон по монстру', code: '.dmg' },
  { id: 3, description: 'Смена внешнего вида', code: '.rem' },
  { id: 4, description: 'Смена сета', code: '.set' },
])
</script>

<style lang="scss" scoped>
.vipInfo {
  max-width: 415px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .vipInfo-block {
    .vipInfo-block__title {
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 1px;
      color: var(--color-white);
      margin-bottom: 20px;
    }

    .vipInfo-block__list {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      overflow: hidden;
    }
  }

  .vipInfo-item {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 4px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);

    &:last-child {
      border-bottom: none;
    }

    .vipInfo-item__name {
      color: var(--color-white);
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    .vipInfo-item__value {
      color: #67c9f7;
      font-size: 16px;
      font-weight: 600;
      font-family: 'Courier New', monospace;
      padding: 2px 8px;
      border-radius: 4px;
      text-align: center;
      min-width: 80px;
    }
  }
}

// Адаптивность
@media (max-width: 768px) {
  .vipInfo {
    gap: 30px;

    .vipInfo-block {
      &__title {
        font-size: 18px;
        margin-bottom: 16px;
      }
    }

    .vipInfo-item {
      padding: 12px 16px;
      grid-template-columns: 1fr;
      gap: 8px;

      &__name {
        font-size: 14px;
      }

      &__value {
        font-size: 14px;
        justify-self: start;
        min-width: auto;
      }
    }
  }
}
</style>
