<script setup>
defineProps({
  "demoUrl": {
    type: String,
    required: true,
  }
})
</script>

<template>
  <a class="badge badge-demo" v-if="demoUrl" target="_blank" :href="demoUrl">
    <i class="fa fa-trophy" aria-hidden="true"></i>
    Best Paper Runner Up Award
  </a>
</template>