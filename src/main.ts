import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useFirebaseConfigStore } from '../src/stores/firebaseConfig'
import './sass/app.scss'
import 'bootstrap/dist/js/bootstrap.bundle'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')

const firebaseConfigStore = useFirebaseConfigStore()
const firebaseApp = initializeApp(firebaseConfigStore.firebaseConfig)
export const db = getFirestore(firebaseApp)
