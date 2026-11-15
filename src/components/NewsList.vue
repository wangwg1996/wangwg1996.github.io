<script setup>
import { ref, computed } from 'vue'
import { convertMarkdownContentToHtml } from '../utils';

import newsJson from '../content/news.json'

const showAll = ref(false)
const topN = 5

const newsArr = computed(() => {
  return convertMarkdownContentToHtml(newsJson)
})

const displayedNews = computed(() => {
  return showAll.value ? newsArr.value : newsArr.value.slice(0, topN)
})

const hasMore = computed(() => {
  return newsArr.value.length > topN
})

const idPrefix = "news"

</script>

<template>
  <h2 style="font-size: 20pt"> News</h2>
  <div class="row items-align-top" v-for="(news, index) in displayedNews" :key="index">
    <label class="col date-col" :for="`${idPrefix}-${index}`">{{ news.date }}</label>
    <div class="col flex-start tight-list" :id="`${idPrefix}-${index}`" v-html="news.content"></div>
  </div>
  
  <div v-if="hasMore" style="text-align: center; margin-top: 1rem; margin-bottom: 1.5rem;">
    <a @click="showAll = !showAll" class="toggle-link">
      {{ showAll ? '▲ Show Less' : `▼ Show More (${newsArr.length - topN} earlier news)` }}
    </a>
  </div>
</template>

<style scoped>
.date-col {
  min-width: 110px;
  font-weight: bold;
}

.toggle-link {
  color: var(--text-secondary);
  font-size: 11pt;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px dashed #999;
  padding-bottom: 2px;
  transition: all 0.2s ease;
}

.toggle-link:hover {
  color: inherit;
  border-bottom-color: #000;
}
</style>

<!-- 📰 -->
