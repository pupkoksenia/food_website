<template>
      <div class="card-header">
        Comments:
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="comment in comments" :key="comment.text">{{ comment.user }} : {{ comment.text }}</li>
        <form
            class="container row w-100"
            name="form"
            @submit.prevent="onSubmit"
          >
          <InputComponent
            id="comment"
            class="col"
            v-model="comment"
            type="text"
            name="comment"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter comment'"
            />
          <div class="col">
            <ButtonComponent
              class="w-100"
              style="background: white; color: #cb3171; height: 45px"
              :label="'Set comment'"
            ></ButtonComponent>
          </div>
          </form>
      </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Comment } from '../../../types/index'
import InputComponent from '@/components/kits/InputComponent.vue'
import ButtonComponent from '@/components/kits/ButtonComponent.vue'

export default defineComponent({
  name: 'RecipeRow',
  props: {
    comments: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['setComment'],
  components: {
    InputComponent,
    ButtonComponent
  },
  setup (props, ctx) {
    const comment = ref('')
    const onSubmit = () => {
      ctx.emit('setComment', comment.value)
    }
    return { comment, onSubmit }
  }
})
</script>

      <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
      //. Чтобы создать переменную в Sass нужно использовать символ $.
</style>
