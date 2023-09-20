import { reactive, DeepReadonly, readonly, Ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { db } from '../main'
// import { Timestamp } from 'firebase/firestore'
import { Recipes, Recipe } from '@/types'

export const useFirebaseConfigRecipesStore = defineStore('firebaseConfigRecipesStore', () => {
  const recipes = reactive<Recipes>({
    data: []
  })
  const getAllRecipes = () =>
    getDocs(collection(db, 'recipes')).then((recipesDb) => {
      recipes.data = []
      recipesDb.forEach((recipeDb) => {
        const templateRecipe = {
          id: recipeDb.data().id,
          name: recipeDb.data().name,
          ingredients: recipeDb.data().ingredients,
          description: recipeDb.data().description,
          categories: recipeDb.data().categories,
          comments: recipeDb.data().comments
        }
        recipes.data.push(templateRecipe)
      })
    })

  const updateRecipe = (recipe: any) => setDoc(doc(db, 'recipes', recipe.id.toString()), recipe)

  return { recipes, getAllRecipes, updateRecipe }
})
