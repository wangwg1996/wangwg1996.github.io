<script setup>
defineProps({
  "demoUrl": {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a class="badge badge-code" v-if="demoUrl" target="_blank" :href="demoUrl">
    <i class="fa fa-home" aria-hidden="true"></i>
    Homepage
  </a>
</template>