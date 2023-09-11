<template>
    <button :class="type" class="small" style="width: 184px; height: 46px">
      <strong style="width: max-content">{{ label }}</strong>
    </button>
  </template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    type: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
$font-color-hover: #f03785;
$font-color: #cb3171;
$font-color-active: #952252;

button {
  background: $font-color;
  border-radius: 10px;
  border: 2px solid $font-color;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  transition: all 0.2s ease;
}
button:hover {
  background: $font-color-hover;
  border: 2px solid $font-color-hover;
}
button:active {
  background: $font-color-active;
  border: 2px solid $font-color-active;
}
</style>
