<template>
    <!--div v-if="id === 'view'" class="form-group">
      <select
        :id="id"
        :value="modelValue"
        class="form-select border w-full"
        @input="updateInput"
      >
        <option v-for="option in options" :key="option.label">
          {{ option.label }}
        </option>
      </select>
    </div-->

    <div class="form-group">
      <MultiselectComponent
        :model-value="$props.modelValue"
        :options="[
          'All categories',
          ...options
        ]"
        first-select-all
        placeholder="Tour guides"
        total-text="guides"
        @update="updateInput"
      />
    </div>

  </template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import MultiselectComponent from './MultiselectComponent.vue'
import { Category } from '@/types'

export default defineComponent({
  name: 'MenuLayout',
  components: {
    MultiselectComponent
  },
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  emits: ['updateInput'],
  setup (props, ctx) {
    const updateInput = (eventOrValue: any) => {
      const { target } = eventOrValue
      const value =
      eventOrValue instanceof Event ? (target as HTMLButtonElement).value : eventOrValue
      ctx.emit('updateInput', value)
    }

    return { updateInput }
  }
})
</script>

  <style>
  select {
    border: 2px solid #eeeeee !important;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: none !important;
    background-color: white;
    width: 130px;
    height: 40px;
    background-image: url('/src/assets/images/arrowDown.svg');
    background-position: calc(100% - 20px) center;
    background-repeat: no-repeat;
    font-size: x-small;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  select:focus-visible,
  select:focus {
    border: 2px solid #dd6497 !important;
    outline: none !important;
  }
  </style>
