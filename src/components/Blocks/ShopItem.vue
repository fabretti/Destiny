<template>
  <div class="shop-item">
    <img src="@/assets/img/shopItem.png" alt="item" class="shop-item__image" />
    <div class="shop-item__name">Название</div>
    <div class="shop-item__price">100 T</div>
  </div>
</template>
<style lang="scss">
.shop-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 15px;
  border: 1px solid #b3dff438;
  background: #1e2f4480;
  border-radius: 25px;
}
</style>
