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
          type="button"
          @click="makeAction(item)"
        ></MenuItemLayout>
      </ul>
    </div>

  <ModalWindow :isOpen="isOpen" :class-props="'popupBigSize'" @closeModalWindow="closeModalWindow">
    <template #body><NewRecipe /></template>
</ModalWindow>
  </template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import MenuItemLayout from './MenuItemLayout.vue'
import ModalWindow from '../kits/ModalWindow.vue'
import NewRecipe from './main/NewRecipe.vue'

export default defineComponent({
  name: 'MenuLayout',
  components: {
    MenuItemLayout,
    ModalWindow,
    NewRecipe
  },
  setup () {
    const menuItems = ref([
      {
        id: 0,
        name: 'Create new recipe'
      },
      {
        id: 1,
        name: 'Filter'
      }
    ])

    const isOpen = ref(false)
    const closeModalWindow = () => {
      isOpen.value = false
    }
    const openModalWindow = () => {
      isOpen.value = true
    }

    const makeAction = (item: { id: number, name: string }) => {
      if (item.id === 0) {
        isOpen.value = true
      }
    }

    return { menuItems, makeAction, isOpen, closeModalWindow, openModalWindow }
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
