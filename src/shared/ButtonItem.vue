<template>
  <button
    class="ButtonItem"
    :class="[variant && `variant--${variant}`, size && `size--${size}`, color && `color--${color}`]"
    type="button"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'base',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.ButtonItem {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.3s ease;
  &:disabled {
    opacity: 0.5;
  }

  &.variant {
    &--primary {
      height: 55px;
      border-radius: 10px;
      border: 1px solid rgba(103, 201, 247, 0.3);
      background: rgba(35, 67, 82, 0.12);
      box-shadow:
        0px 0px 15px 0px rgba(103, 201, 247, 0.18),
        0px 0px 40px 0px rgba(43, 109, 141, 0.72) inset;
      color: rgba(189, 234, 255, 1);
      font-weight: 400;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 2px;

      gap: 8px;
      backdrop-filter: blur(10px);

      &:hover {
        box-shadow: 0px 0px 40px 0px rgba(43, 109, 141, 0.72) inset;
      }
    }
    &--solid {
      color: var(--color-white);
      background: var(--color-primary-light);
      &:hover {
        background: var(--color-primary);
      }
    }
    &--empty {
      color: var(--color-primary-light);
      background: none;
      border: 1px solid var(--color-primary-light);
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
    &--solid,
    &--empty {
      height: 44px;
      border-radius: 50px;

      font-weight: 500;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 2px;
      padding: 0 16px;
      text-transform: uppercase;
    }
    &--solid-shadow {
      text-transform: uppercase;
      border-radius: 50px;
      color: var(--color-white);
      backdrop-filter: blur(10px);
      border: 1px solid #cff0ff38;
      box-shadow:
        0px 0px 10px 0px #67c9f729,
        0px 0px 50px 0px #67c9f761 inset;
      transition: all 0.3s ease;

      &:hover {
        box-shadow:
          0px 0px 20px 0px #67c9f750,
          0px 0px 60px 0px #67c9f780 inset;
      }
    }
  }
  &.size {
    &--icon-52 {
      height: 52px;
      width: 52px;
    }
    &--sm {
      height: 22px;
      border: 1px solid #b3dff438;
      backdrop-filter: blur(10px);
      box-shadow: 0px 0px 30px 0px #67c9f721;

      padding: 0 16px;
      font-weight: 400;
      font-size: 9px;
      line-height: 100%;
      letter-spacing: 2px;
      text-align: center;
      transition: 0.2s ease;
      &:hover {
        box-shadow: 0px 0px 10px 0px #67c9f729;
        background: #b3dff438;
      }
    }
    &--medium {
      font-size: 18px;
      letter-spacing: 1px;
      height: 50px;
      padding: 0 44px;
    }
    &--big {
      font-weight: 700;
      font-size: 22px;
      line-height: 100%;
      letter-spacing: 1px;
      text-transform: uppercase;
      height: 75px;
      padding: 0 60px;
    }
  }
  &.color {
    &--white {
      border-color: #cff0ff45;
      color: var(--color-white);
    }
  }
}
</style>
