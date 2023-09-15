<template>
<div class="card w-100 h-100">
  <img src="../../../assets/images/food.jpg" class="card-img-top" alt="food">
  <div class="card-body">
    <h5 class="card-title">{{ recipe.name }}</h5>
  </div>
  <div class="card-header">
    Categories:
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="category in recipe.categories" :key="category.id">{{ category.name }}</li>
  </ul>
  <div class="card-body">
    <ButtonComponent :label="'Click for more information'" style="width: 100%; background: white; color: #cb3171" @click="openModalWindow"/>
  </div>
</div>
<ModalWindow :isOpen="isOpen" :class-props="'popupBigSize'" @closeModalWindow="closeModalWindow">
    <template #body>
       <div class="card w-100 h-100  border-light">
        <div class="card-body">
          <h5 class="card-title">{{ recipe.name }}</h5>
        </div>
       <div class="card-header">
         Categories:
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="category in recipe.categories" :key="category.id">{{ category.name }}</li>
        </ul>
        <div class="card-header">
         Ingredients:
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="ingredient in recipe.ingredients" :key="ingredient.name">{{ ingredient.name }} - {{ ingredient.amount }}</li>
        </ul>
        <div class="card-body">
          <p class="card-text">{{ recipe.description }}</p>
        </div>
        <CommentsComponent :comments="recipe.comments" />
      </div>
    </template>
</ModalWindow>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Category } from '../../../types/index'
import ButtonComponent from '../../kits/ButtonComponent.vue'
import ModalWindow from '../../kits/ModalWindow.vue'
import CommentsComponent from './CommentsComponent.vue'

export default defineComponent({
  name: 'RecipeRow',
  props: {
    recipe: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    ButtonComponent,
    ModalWindow,
    CommentsComponent
  },
  setup (props, ctx) {
    const isOpen = ref(false)
    const closeModalWindow = () => {
      isOpen.value = false
    }
    const openModalWindow = () => {
      isOpen.value = true
    }
    return { isOpen, closeModalWindow, openModalWindow }
  }
})
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  //. Чтобы создать переменную в Sass нужно использовать символ $.

  </style>
