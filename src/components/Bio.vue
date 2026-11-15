<script setup>
import { ref, computed } from 'vue'
import { convertMarkdownToHtml } from '../utils'
import metaJson from '../content/meta.json'

const metaContent = ref(metaJson)
const bio = computed(() => ({
  introduction: convertMarkdownToHtml(metaContent.value.introduction),
  research: convertMarkdownToHtml(metaContent.value.research),
  education: convertMarkdownToHtml(metaContent.value.education),
}))
</script>

<template>
  <div class="profile-intro">
    <h1 class="profile-name">{{ metaContent.name }}</h1>
    <div class="profile-current" v-html="bio.introduction"></div>
    <div class="profile-photo">
      <img src="../assets/personal-photo.jpg" width="1677" height="1473" alt="Weiguo Wang">
    </div>
    <div class="profile-contact">
      <p class="profile-email">
        <b>E-Mail:</b>
        <a :href="`mailto:${metaContent.email}`">{{ metaContent.email }}</a>
        <span>(permanent)</span>
      </p>
      <div class="profile-links">
        <a v-for="(contact, key) in metaContent.contact" :key="key"
          :href="contact.url" target="_blank" rel="noopener noreferrer" class="custom-link">
          <i :class="contact.icon" aria-hidden="true"></i>{{ key }}
        </a>
      </div>
    </div>
  </div>
  <div class="profile-background">
    <div v-html="bio.research"></div>
    <div v-html="bio.education"></div>
  </div>
</template>


<style scoped>
.profile-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  grid-template-areas:
    "name photo"
    "current photo"
    "contact photo";
  gap: 14px 48px;
  align-items: start;
  margin-bottom: 30px;
}

.profile-name {
  grid-area: name;
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
}

.profile-current {
  grid-area: current;
  min-width: 0;
}

.profile-current,
.profile-contact,
.profile-background {
  font-size: 1rem;
  line-height: 1.6;
}

.profile-current :deep(p) {
  margin: 0;
}

.profile-photo {
  grid-area: photo;
}

.profile-photo img {
  display: block;
  width: 190px;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.profile-contact {
  grid-area: contact;
  min-width: 0;
}

.profile-email {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.3em;
  margin: 0;
}

.profile-email a {
  overflow-wrap: anywhere;
}

.profile-links {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 20px;
  margin-top: 6px;
}

.profile-background :deep(p) {
  margin: 0 0 18px;
}

.custom-link {
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}

.custom-link:hover,
.custom-link:focus-visible {
  color: inherit;
  text-decoration: underline;
}

@media (max-width: 700px) {
  .profile-intro {
    grid-template-columns: minmax(0, 1fr) 105px;
    grid-template-areas:
      "name photo"
      "current current"
      "contact contact";
    gap: 18px 14px;
    margin-bottom: 28px;
  }

  .profile-name {
    align-self: center;
    font-size: 24px;
  }

  .profile-photo img {
    width: 105px;
  }

  .profile-links {
    gap: 6px 16px;
  }
}
</style>
