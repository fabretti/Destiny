<template>
  <div class="roulette">
    <div class="roulette-content">
      <img src="@/assets/img/roulette/roulette.png" alt="roulette" />
      <img src="@/assets/img/roulette/strelka.png" alt="strelka" class="arrow" />
    </div>
  </div>
</template>
<script setup lang="ts">

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
  .arrow {
    position: absolute;
    left: 294px;
    top: 190px;
  }
}
</style>