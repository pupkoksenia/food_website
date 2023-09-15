import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import {
  signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut
} from 'firebase/auth'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../main'
import {
  AUTH_SUCCESS,
  INVALID_EMAIL,
  ACCOUNT_NOT_FOUND,
  INCORRECT_PASSWORD,
  INCORRECT_PASSWORD_EMAIL
} from '../constants/index'
import { StateUser } from '@/types'

export const useFirebaseConfigAuthStore = defineStore('firebaseConfigAuthStore', () => {
  const stateUser = reactive<StateUser>({
    email: '',
    uid: '',
    isAuthenticated: false
  })
  const auth = getAuth()

  const isLoading = ref(false)

  const signInFirebase = (payload: { email: string; password: string }) =>
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        stateUser.email = userCredential.user.email
        stateUser.uid = userCredential.user.uid
        stateUser.isAuthenticated = true
        return AUTH_SUCCESS
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            return INVALID_EMAIL
          case 'auth/user-not-found':
            return ACCOUNT_NOT_FOUND
          case 'auth/wrong-password':
            return INCORRECT_PASSWORD
          default:
            return INCORRECT_PASSWORD_EMAIL
        }
      })

  const registerFirebase = (payload: {
        email: string
        password: string
      }) =>
    createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        stateUser.email = userCredential.user.email
        stateUser.uid = userCredential.user.uid
        stateUser.isAuthenticated = true

        const id = userCredential.user.uid

        getDocs(collection(db, 'users')).then(() => {
          setDoc(
            doc(db, 'users', id),
            {
              email: userCredential.user.email,
              uid: id
            },
            { merge: true }
          )
        })
        return AUTH_SUCCESS
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            return INVALID_EMAIL
        }
      })

  const isAuthenticated = (path: string) =>
    new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          stateUser.email = user.email
          stateUser.uid = user.uid
          stateUser.isAuthenticated = true
          resolve(stateUser.isAuthenticated)
        } else reject(stateUser.isAuthenticated)
      })
    })
      .then(() => {
        return { path: path }
      })
      .catch(() => {
        return { path: '/sign-in' }
      })

  const signOutFirebase = () => {
    signOut(auth).then(() => {
      stateUser.email = ''
      stateUser.uid = ''
      stateUser.isAuthenticated = false
    })
  }

  return { stateUser, signInFirebase, registerFirebase, isLoading, isAuthenticated, signOutFirebase }
})
