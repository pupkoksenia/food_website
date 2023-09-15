import { ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../main'
import { StateUser } from '@/types'
import { useFirebaseConfigAuthStore } from './firebaseConfigAuth'

export const useFirebaseConfigUsersStore = defineStore('firebaseConfigUsersStore', () => {
  const users = ref<StateUser[]>([])

  const storeAuth = useFirebaseConfigAuthStore()

  const getAllUsers = () =>
    getDocs(collection(db, 'users')).then((usersDb) => {
      users.value = []
      usersDb.forEach((userDb) => {
        const templateUser = {
          uid: userDb.data().uid,
          email: userDb.data().email,
          isAuthenticated: userDb.data().uid === storeAuth.stateUser.uid
        }
        users.value.push(templateUser)
      })
    })

  return { users, getAllUsers }
})
