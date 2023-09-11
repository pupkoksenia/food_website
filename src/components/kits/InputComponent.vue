<template>
    <div class="w-100 form-group d-flex col flex-column pb-3">
      <label v-if="label" style="margin-bottom: 3px">
        <strong>{{ label }}</strong>
      </label>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :style="height"
        style="padding: 12px;"
        :min="min"
        :max="max"
        class="border w-full pb-1 form-control bg-white"
        lang="en-US"
        @input="handleClick"
      />
      <Transition name="fade">
        <p v-show="errorMessage" class="text-danger small m-0">
          {{ errorMessage }}
        </p>
      </Transition>
    </div>
  </template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'InputComponent',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: '',
      required: true
    },
    height: {
      type: String,
      default: '50px'
    },
    min: {
      type: String,
      default: '0'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: String,
      default: '1000000'
    }
  },
  emits: ['update:modelValue'],
  setup (props: any, ctx) {
    const heightEl = computed(() => {
      return 'height: ' + props.height
    })
    const handleClick = (event: Event) => {
      const { target } = event
      if (target) {
        ctx.emit('update:modelValue', (target as HTMLButtonElement).value)
      }
    }
    return { heightEl, handleClick }
  }
})
</script>

<style scoped lang="scss">
@mixin border-radius($property) {
  border-radius: $property;
}
input {
  border: 2px solid #eeeeee !important;
  @include border-radius(10px);
  box-sizing: border-box;
  box-shadow: none !important;
}
input:focus-visible {
  border: 2px solid #cb3171 !important;
}
</style>
