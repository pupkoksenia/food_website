<template>
  <main>
    <HeaderLayout />
    <div class="d-flex flex-row">
      <MenuLayout class="col" />
    <div
      class="col h-100 ps-5 pe-5 bg-white"
      style="min-height: calc(100vh - 69px); background: #f8f8f8"
    >
      <MainLayout />
    </div>
  </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import HeaderLayout from '../components/layouts/HeaderLayout.vue'
import MainLayout from '../components/layouts/main/MainLayout.vue'
import MenuLayout from '@/components/layouts/MenuLayout.vue'

export default defineComponent({
  name: 'MainPage',
  components: {
    HeaderLayout,
    MainLayout,
    MenuLayout
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//. Чтобы создать переменную в Sass нужно использовать символ $.

</style>
