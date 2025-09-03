<template>
  <footer class="footer">
    <div class="footer-container">
      <ul class="text-body-16">
        <li><a href="">Политика конфиденциальности</a></li>
        <li><a href="">Безопасность платежей</a></li>
        <li><a href="">Пользовательское соглашение </a></li>
      </ul>
      <div class="footer-name text-body-16">Aion Destiny {{ currentYear }}</div>
      <div class="footer-socials">
        <ButtonItem v-for="item in socials" :key="item.id" size="icon-52">
          <IconBase :name="item.name" />
        </ButtonItem>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import ButtonItem from '@/shared/ButtonItem.vue'
import IconBase from '@/shared/IconBase.vue'
const currentYear = new Date().getFullYear()

const socials = [
  { id: 1, name: 'VK', href: 'https://vk.com/aiondestiny' },
  { id: 2, name: 'discord', href: 'https://discord.com/aiondestiny' },
  { id: 3, name: 'tg', href: 'https://t.me/aiondestiny' },
]
</script>
<style lang="scss">
footer {
  background: #1f2c3b;
  border-top: 0.3px solid #667c95;
  .footer-container {
    width: 100%;
    max-width: 1320px;
    padding: 0 60px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul {
    display: flex;
    gap: 24px;
  }
  .footer-socials {
    display: flex;
    gap: 32px;
  }
}
</style>
