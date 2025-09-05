<template>
  <div class="set-block">
    <IconBase name="big-chest" />
    <div class="set-block__info">
      <div class="name">
        <p>Набор новичка</p>
        <span class="text-underline">190 tool</span>
      </div>
      <div class="items">
        <img v-for="item in 7" src="@/assets/img/item.png" alt="item" />
      </div>
      <ButtonItem variant="solid-shadow" size="medium">Купить</ButtonItem>
    </div>
    <img src="@/assets/img/setCycle.png" alt="cycle" class="set-block__cycle" />
  </div>
</template>
<script setup>
import IconBase from '@/shared/IconBase.vue'
import ButtonItem from '@/shared/ButtonItem.vue'
</script>
<style lang="scss">
.set-block {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #b3dff438;
  background: #1e2f4480;
  border-radius: 25px;
  padding-right: 60px;
  .set-block__info {
    display: grid;
    gap: 28px;
    .name {
      display: flex;
      align-items: center;
      gap: 30px;
    }
    .items {
      display: flex;
      gap: 16px;
    }
  }
  .set-block__cycle {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
