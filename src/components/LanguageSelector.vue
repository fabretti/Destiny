<template>
  <div class="language-selector" ref="selectRef">
    <div class="select-trigger" @click="toggleDropdown">
      <div class="selected-option">
        <IconBase :name="selectedLanguage.value" />
        <span>{{ selectedLanguage.label }}</span>
      </div>
      <div class="arrow" :class="{ 'arrow-up': isOpen }">
        <IconBase name="arrow" />
      </div>
    </div>

    <div v-if="isOpen" class="dropdown">
      <div
        v-for="language in languages"
        :key="language.value"
        class="dropdown-option"
        :class="{ selected: language.value === selectedLanguage.value }"
        @click="selectLanguage(language)"
      >
        <IconBase :name="language.value" />
        <span>{{ language.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconBase from '@/shared/IconBase.vue'

const selectRef = ref<HTMLElement>()
const isOpen = ref(false)
const selectedLanguage = ref({
  value: 'ru',
  label: 'RU',
})

const languages = [
  {
    value: 'ru',
    label: 'RU',
  },
  {
    value: 'en',
    label: 'EN',
  },
  {
    value: 'ch',
    label: '中文',
  },
]

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Здесь логика выбора языка
const selectLanguage = (language: (typeof languages)[0]) => {
  selectedLanguage.value = language
  isOpen.value = false
}

const closeDropdown = (event: Event) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style lang="scss" scoped>
.language-selector {
  position: relative;
  width: 100px;

  .select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: inherit;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #c0c0c0;
    }
  }

  .selected-option {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-white);
    }
  }

  .arrow {
    margin-left: 12px;
    transition: transform 0.2s ease;

    &.arrow-up {
      transform: rotate(180deg);
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-primary);
    border-radius: 6px;
    z-index: 1000;
    margin-top: 4px;
    overflow: hidden;

    .dropdown-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: var(--color-primary-light);
      }

      &.selected {
        background-color: var(--color-primary-light);
        color: var(--color-white);
      }

      span {
        font-size: 14px;
        font-weight: 500;
        color: var(--color-white);
      }
    }
  }
}
</style>
