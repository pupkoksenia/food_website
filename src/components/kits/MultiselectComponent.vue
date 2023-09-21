<!--template>
    <Multiselect
      v-model="multiselectModelValue"
      :options="options"
      :multiple="true"
      :searchable="false"
      :show-labels="false"
      :close-on-select="false"
    >
      <template #selection="{ values, isOpen }">
        <span v-if="values.length" v-show="!isOpen" class="multiselect__single">
          {{ values.length }} {{ totalText }}
        </span>
      </template>

      <template #option="{ option }">
        <div class="option__desc">
          <span class="option__title">{{ option }}</span>
        </div>
      </template>

      <template #caret>
        <div class="multiselect__select"></div>
      </template>
    </Multiselect>
  </template-->

<script lang="ts">
import { defineComponent, computed } from 'vue'
// import Multiselect from '../../../node_modules/vue-multiselect'
// import '../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'

export default defineComponent({
  name: 'MenuLayout',
  components: {
    // Multiselect
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({})
    },
    options: {
      type: Array,
      required: true
    },
    totalText: {
      type: String,
      default: 'selected'
    },
    firstSelectAll: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update'],
  setup (props, ctx) {
    const multiselectModelValue = computed({
      get () {
        return props.modelValue
      },
      set (value: any) {
        if (value.includes(props.options[0]) && props.firstSelectAll) {
          if (value.length === props.options.length) {
            ctx.emit('update', [])
          } else {
            ctx.emit('update', props.options.slice(1))
          }
        } else {
          ctx.emit('update', value)
        }
      }
    })

    return { multiselectModelValue }
  }
})
</script>

  <style lang="scss">
  .multiselect__placeholder,
  .multiselect__single,
  .multiselect__input {
    display: flex;
    align-items: center;
    color: inherit;
    font-size: 16px;
    font-weight: 400;
    height: 30px;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &.multiselect__input {
      height: 27px;
    }
  }

  .multiselect__content-wrapper,
  .multiselect__tags {
    border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);
    border-radius: 10px !important;

    &.multiselect__content-wrapper {
      overflow: hidden auto;
      width: auto;
      min-width: 100%;

      &::-webkit-scrollbar {
        width: 0.3rem;
      }
      &::-webkit-scrollbar-track {
        background: #dedede;
      }
      &::-webkit-scrollbar-thumb {
        background: #cb3171;
      }
    }

    &.multiselect__tags {
      height: 40px;
      padding-left: 10px;
      padding-top: 4px !important;
      background-color: #fafafa;
    }
  }

  .multiselect--active {
    .multiselect__tags {
      border: 2px solid #dd6497;
      transition: border 0.15s ease-in-out;
    }
  }

  .multiselect__option {
    font-weight: 400;
    min-height: 28px;
    padding: 8px;

    &--highlight {
      background: #dd6497;
    }

    &--selected {
      font-weight: 700;
      padding-left: 14px;
    }
  }

  .multiselect__select {
    background-image: url('/src/assets/images/arrowDown.svg');
    background-position: center;
    background-repeat: no-repeat;
    height: 40px;

    &::before {
      display: none;
    }
  }
  </style>
