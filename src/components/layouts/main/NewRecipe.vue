  <template>
      <div class="card w-100 h-100  border-light">
        <form
            class="border rounded"
            name="form"
            @submit.prevent="onSubmit"
          >
          <InputComponent
            id="name"
            v-model="newRecipe.name"
            :label="'Name'"
            type="text"
            name="text"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter name'"
            />
        <div class="row" v-for="ingridient in newRecipe.ingredients" :key="ingridient.name">
          <InputComponent
            id="ingridient name"
            class="col"
            v-model="ingridient.name"
            :label="'Ingridient name'"
            type="text"
            name="ingridient name"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter ingridient name'"
            />
          <div class="col">
            <InputComponent
            id="ingridient"
            class="col"
            v-model="ingridient.amount"
            :label="'Ingridient amount'"
            type="text"
            name="ingridient amount"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter ingridient amount'"
            />
          </div>
        </div>
        <InputComponent
            id="description"
            v-model="newRecipe.description"
            :label="'Description'"
            type="text"
            name="description"
            :height="'40px'"
            required
            autofocus
            :placeholder="'Enter description'"
            />
       </form>
       <SelectComponent
            id="view"
            :options="storeCategories.categories"
            :model-value="newRecipe.categories"
            @update-input="setCategories"
          />
      </div>
  </template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import InputComponent from '@/components/kits/InputComponent.vue'
import { Recipe } from '../../../types/index'
import SelectComponent from '@/components/kits/SelectComponent.vue'
import { useFirebaseConfigCategoriesStore } from '@/stores/firebaseConfigCategories'

export default defineComponent({
  name: 'NewRecipe',
  components: {
    InputComponent,
    SelectComponent
  },
  setup () {
    const storeCategories = useFirebaseConfigCategoriesStore()
    const newRecipe : Recipe = reactive({
      id: '',
      name: '',
      ingredients: [
        {
          name: '',
          amount: '0'
        }
      ],
      description: '',
      categories: [],
      comments: []
    })

    const setRecipeId = () => {
      let result = ''
      const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
      const maxPosition = words.length - 1
      for (let i = 0; i < 5; ++i) {
        const position = Math.floor(Math.random() * maxPosition)
        result = result + words.substring(position, position + 1)
      }
      return result
    }
    const onSubmit = () => {
      console.log('gggg')
    }

    const setCategories = (value: any) => {
      newRecipe.categories = value
    }

    onMounted(() => {
      storeCategories.getAllCategories()
    })

    return { newRecipe, setRecipeId, onSubmit, setCategories, storeCategories }
  }
})
</script>

  <style scoped>
    .menu-layout {
      max-width: 19.8rem;
    }
  @media screen and (max-width: 1855px) {
    .menu-layout {
      max-width: 10rem;
    }
  }
  </style>
