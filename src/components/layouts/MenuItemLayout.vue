<template>
    <div
      class="p-1 mb-1 rounded menu-row bg-body small"
      :title="name"
    >
      <li class="list-menu-item">
        <p class="fw-bolder">{{ name }}</p>
      </li>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItemLayout',
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>

  <style scoped>
  .list-menu-item {
    list-style-type: none;
  }
  .menu-row:hover {
    background-color: #fff1f7 !important;
    border-radius: 10px;
  }

  .menu-row:hover li {
    color: #cb3171;
  }

  @media screen and (max-width: 1855px) {
    .list-menu-item strong {
      display: none;
    }
  }
  </style>
