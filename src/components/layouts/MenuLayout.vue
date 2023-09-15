<template>
    <div
      class="menu-layout border-end p-3"
      style="height: calc(100vh - 69px)"
    >
      <ul class="list-group list-group-flush">
        <MenuItemLayout
          v-for="(item, index) in menuItems"
          :key="index"
          :name="item.name"
        ></MenuItemLayout>
      </ul>
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MenuItemLayout from './MenuItemLayout.vue'

export default defineComponent({
  name: 'MenuLayout',
  components: {
    MenuItemLayout
  },
  setup () {
    const menuItems = ref([
      {
        name: 'Create new recipe'
      },
      {
        name: 'Filter'
      }
    ])
    return { menuItems }
  }
})
</script>

  <style scoped>
    .menu-layout {
      max-width: 19.8rem;
    }
  @media screen and (max-width: 1855px) {
    .menu-layout {
      max-width: 10rem;
    }
  }
  </style>
