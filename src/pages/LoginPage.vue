<template>
    <main class="w-100 h-100 d-flex col-2 justify-content-center align-items-center">
      <img
          class="w-50 h-100 col-1"
          style="filter: alpha(Opacity=75);opacity: 0.75;"
          src="../assets/images/cuisine.png"
          alt="ImageLayout"
        />
        <div class="col-1 w-50 h-100 row d-flex justify-content-center align-items-center">
          <h1 v-if="!registerAction" class="row d-flex justify-content-center align-items-center w-100">Sign in form</h1>
          <h1 v-else class="row d-flex justify-content-center align-items-center w-100">Register form</h1>
          <form
            class="mx-auto bg-white border p-5 rounded w-50"
            style="margin-top: -300px;"
            name="form"
            @submit.prevent="onSubmit"
          >
          <InputComponent
            id="email"
            v-model="form.email"
            :label="'Login'"
            type="email"
            name="email"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter login'"
            />
          <InputComponent
            id="password"
            v-model="form.password"
            :label="'Password'"
            type="password"
            name="password"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter password'"
          />
          <Transition name="err">
            <div
              v-if="errMsg"
              class="rounded"
              style="padding: 5px"
            >
              <div class="d-flex justify-content-start">
                <p class="text-danger small m-0">
                  {{ errMsg }}
                </p>
              </div>
            </div>
          </Transition>
          <div class="btn-toolbar justify-content-between mt-2">
            <ButtonComponent
              class="w-100"
              :label="registerAction ? 'Register' :'Sign in'"
              :type="''"
            ></ButtonComponent>
          </div>
          <div
          class="register"
          role="button"
          :class="'border-top ps-2 pe-2 pt-2 d-flex justify-content-center mt-3'"
          @click="setRegisterAction"
          >
          <strong>{{registerAction ? 'Sign in ': 'Dont have an account? Register!'}}</strong>
          </div>
        </form>
        </div>
    </main>
  </template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import InputComponent from '../components/kits/InputComponent.vue'
import ButtonComponent from '@/components/kits/ButtonComponent.vue'
import { useRouter } from 'vue-router'
import { AUTH_SUCCESS } from '../constants/index'
import { useFirebaseConfigAuthStore } from '../stores/firebaseConfigAuth'

export default defineComponent({
  name: 'LoginPage',
  components: {
    InputComponent,
    ButtonComponent
  },
  setup () {
    const form = reactive({
      email: '',
      password: ''
    })

    const registerAction = ref(false)
    const router = useRouter()
    const authStore = useFirebaseConfigAuthStore()

    const errMsg = ref<string | undefined>('')

    const setRegisterAction = () => {
      registerAction.value = !registerAction.value
    }

    const checkSpaces = (value: string) => {
      return value.trim().length === value.length
    }

    const checkMsg = (value: string | undefined) => {
      if (value === AUTH_SUCCESS) router.push('/')
      else errMsg.value = value
    }

    const onSubmit = () => {
      if (checkSpaces(form.email) && checkSpaces(form.password)) {
        if (registerAction.value) {
          authStore.registerFirebase(form).then((msg) => {
            checkMsg(msg)
          })
        } else {
          authStore.signInFirebase(form).then((msg) => {
            checkMsg(msg)
          })
        }
      }
    }

    return {
      form,
      onSubmit,
      registerAction,
      setRegisterAction,
      errMsg
    }
  }
})
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: translateX($property);
}
.register {
  color: #cb3171
}
.register:hover {
  color: #f03785;
}
.register:active {
  color: #952252;;
}
.err-enter-active {
  transition: all 0.3s ease-out;
}

.err-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.err-enter-from,
.err-leave-to {
  @include transform(20px);
  opacity: 0;
}
</style>
