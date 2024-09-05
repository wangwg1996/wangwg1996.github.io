<script setup>
import Bio from './components/Bio.vue'
import NewsList from './components/NewsList.vue'
import EducationList from './components/EducationList.vue'
import PublicationList from './components/PublicationList.vue'
import AwardList from './components/AwardList.vue'
import Footer from './components/Footer.vue'
import ProjectList from './components/ProjectList.vue'
</script>

<template>
  <header>
    <Bio />
    <hr>
  </header>

  <main>
    <NewsList />
    <hr>
    <EducationList />
    <hr>
    <PublicationList />
    <hr>
    <ProjectList />
    <hr>
    <AwardList />
    <hr>
    <!-- <TalkList /> -->
    <!-- <SoftwareList /> -->
    
  </main>

  <footer>
    <div class="row items-align-top">
      <div class="col" style="text-align: center; margin: auto;">
        <b>Relevant Links: </b>
        <a href="http://tns.thss.tsinghua.edu.cn/sun/" target="_blank">The <b>SUN</b> Group</a>
        | <a href="http://www.greenorbs.org/people/heyuan/" target="_blank">Prof. Yuan He</a>
        | <a href="https://micnest.github.io/" target="_blank">Project MicNest</a>
        <br><br>Updated by Weiguo Wang in 2024.09. 😜
      </div>
  </div>
  </footer>
</template>

<style>

</style>
