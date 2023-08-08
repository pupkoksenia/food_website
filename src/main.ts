import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useFirebaseConfig } from '../src/stores/firebaseConfig'

const firebaseConfigStore = useFirebaseConfig()
const firebaseApp = initializeApp(firebaseConfigStore.firebaseConfig)
export const db = getFirestore(firebaseApp)

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
