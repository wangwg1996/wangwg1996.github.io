<script setup>
import { computed } from 'vue'

import {convertNestedMarkdownContentToHtml} from '../utils'

import projectJson from '../content/projects.json'


const projectArr = computed(() => {
  return convertNestedMarkdownContentToHtml(projectJson)
})
const idPrefix = "project"

</script>

<template>
  <h2>Selected Projects</h2>

  <!-- <div v-for="(projectList, listIdx) in projectArr" :key="listIdx"></div>
    <ul reversed>
      <li v-for="(project, index) in projectList.list" :key="index">
        <a style="font-size: 15pt" >{{ project.name }}</a><br>

        <div>

        </div>
      </li>
    </ul> -->

  <div v-for="(projectList, listIdx) in projectArr" :key="listIdx">
    <!-- <h3>{{ softwareList.category }}</h3> -->
    <div class="row items-align-top" v-for="(project, index) in projectList.list" :key="index">
      

      <!-- <a style="font-size: 15pt" :href="pub.entry.URL" target="_blank">{{ pub.entry.title }}</a><br> -->

      <ul reversed>
        <li :key="index"> 
          <a style="font-size: 15pt" :href="project.url"  target="_blank"> {{ project.name }}: {{ project.title }} </a> 
          <p></p>

          <p class="center"><img class="center" :src=project.figure  :width=project.figurewidth /> </p>
          <p  v-html="project.content"></p>
        </li>
      </ul>
      

      



      <!-- <div class="col flex-start tight-list" :id="`${idPrefix}-${listIdx}-${index}`" v-html="project.content"></div>
       -->
    </div>

  </div>




</template>