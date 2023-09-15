import { ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../main'
import { Category } from '@/types'

export const useFirebaseConfigCategoriesStore = defineStore('firebaseConfigCategoriesStore', () => {
  const categories = ref<Category[]>([])

  const getAllCategories = () =>
    getDocs(collection(db, 'categories')).then((categoriesDb) => {
      categories.value = []
      categoriesDb.forEach((categoryDb) => {
        const templateCategory = {
          id: categoryDb.data().id,
          name: categoryDb.data().name
        }
        categories.value.push(templateCategory)
      })
    })

  return { categories, getAllCategories }
})
