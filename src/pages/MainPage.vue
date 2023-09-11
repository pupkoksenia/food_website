<template>
  <div class="main">
    <p>
      Main Page
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainPage'
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//. Чтобы создать переменную в Sass нужно использовать символ $.

.main {
  display: inline-block;
  margin: 0 10px;
}
</style>
