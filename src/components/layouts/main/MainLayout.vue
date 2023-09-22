<template>
    <div class="rounded bg-body w-100 px-12 pt-2 pb-1 mt-2">
    <div
      v-if="storeRecipes.recipes.data.length"
      class="overflow-scroll-y scrollbar"
      style="max-height: calc(100vh - 220px)"
    >
      <TransitionGroup
        name="recipe"
        style="background-color: rgba(248, 248, 248, 1)"
        class="container"
      >
      <div class="row justify-content-center">
        <div v-for="recipe in storeRecipes.recipes.data" :key="recipe?.id" class="col-4">
          <RecipeRow :recipe="recipe"/>
        </div>
      </div>
      </TransitionGroup>
    </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useFirebaseConfigRecipesStore } from '../../../stores/firebaseConfigRecipes'
import { useFirebaseConfigUsersStore } from '../../../stores/firebaseConfigUsers'
import RecipeRow from './RecipeRow.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    RecipeRow
  },
  setup () {
    const storeRecipes = useFirebaseConfigRecipesStore()
    const storeUsers = useFirebaseConfigUsersStore()

    onMounted(() => {
      storeRecipes.getAllRecipes().then(() => {
        // console.log(storeRecipes.recipes.data)
      })
      storeUsers.getAllUsers().then(() => {
        // console.log(storeUsers.users)
      })
    })
    return { storeRecipes, storeUsers }
  }
})
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  //. Чтобы создать переменную в Sass нужно использовать символ $.

  </style>
