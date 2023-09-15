<template>
  <header class="bg-body">
    <div
      class="d-flex align-items-center justify-content-center justify-content-between border-bottom"
    >
      <section class="w-15 border-right h-100 border-end py-1">
        <strong class="d-flex align-items-end px-3">
         {{ userEmail }}
        </strong>
      </section>

      <section class="border-start h-100 p-1">
        <div
          name="button"
          class="d-flex flex-row flex-nowrap border rounded text-center logout-btn"
          style="margin-right: 10px; padding: 9px; cursor: pointer; background-color: #cb3171;"
          @click="openModalWindow"
        >
          <div
            class="d-flex align-items-center justify-content-center"
          >
            <div style="color: black">Log Out</div>
          </div>
        </div>
      </section>
    </div>
  </header>
  <ModalWindow :isOpen="isOpen" :class-props="'popupLittle'" @closeModalWindow="closeModalWindow">
    <template #body>
      <div class="flex container">
        <div
          class="row-4 d-flex justify-content-center align-items-center pb-2 ps-1 pe-1"
        >
          <strong>Are you sure you want to logout?</strong>
        </div>
        <div
          class="row-4 d-flex justify-content-center align-items-center"
          style="margin-top: 10px"
        >
          <div class="col d-flex justify-content-center align-items-center">
            <ButtonComponent
              :label="'Yes'"
              style="width: 75%"
              @click="confirm"
            />
          </div>
          <div class="col d-flex justify-content-center align-items-center">
            <ButtonComponent
              :label="'No'"
              style="width: 75%; background: white; color: #cb3171"
              @click="closeModalWindow"
            />
          </div>
        </div>
      </div>
    </template>
</ModalWindow>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ModalWindow from '../kits/ModalWindow.vue'
import ButtonComponent from '../kits/ButtonComponent.vue'
import { useFirebaseConfigAuthStore } from '../../stores/firebaseConfigAuth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HeaderLayout',
  components: {
    ModalWindow,
    ButtonComponent
  },
  setup () {
    const store = useFirebaseConfigAuthStore()
    const userEmail = store.stateUser.email
    const router = useRouter()

    const isOpen = ref(false)
    const closeModalWindow = () => {
      isOpen.value = false
    }
    const openModalWindow = () => {
      isOpen.value = true
    }

    const confirm = () => {
      store.signOutFirebase()
      router.push({ path: '/login' })
    }
    return { userEmail, confirm, isOpen, closeModalWindow, openModalWindow }
  }
})
</script>

<style scoped lang="scss"></style>
