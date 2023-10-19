<script setup>
import { ref, computed } from 'vue'
import Cite from 'citation-js'

import SlidesBadge from './badges/SlidesBadge.vue'
import VideoBadge from './badges/VideoBadge.vue'
import CodeBadge from './badges/CodeBadge.vue'
import DemoBadge from './badges/DemoBadge.vue'
import AwardBadge from './badges/AwardBadge.vue'
import PageBadge from './badges/PageBadge.vue'
import HighlightsBadge from './badges/HighlightsBadge.vue'
import { AclCsl, Gb7714Csl } from '../utils'

import pubConfJson from '../content/pub_conf.json'
import pubJournalJson from '../content/pub_journal.json'


const pubArr_conf = computed(() => {
  let cslConfig = Cite.plugins.config.get('@csl')
  cslConfig.templates.add("acl", AclCsl)
  cslConfig.templates.add("gb7714", Gb7714Csl)

  for (let i = 0; i < pubConfJson.length; i++) {
    let cite = Cite(pubConfJson[i]["bibtex"])
    pubConfJson[i]["entry"] = cite.get({ format: "real", type: "json", style: "csl" })[0]
    pubConfJson[i]["bibString"] = cite.get({ format: "string", type: "string", style: "bibtex" })
    pubConfJson[i]["acl"] = cite.format(
      "bibliography",
      {
        format: 'text',
        template: "acl",
        lang: 'en-US'
      }
    )
    pubConfJson[i]["gb7714"] = cite.format(
      "bibliography",
      {
        format: 'text',
        template: "gb7714",
        lang: 'en-US'
      }
    )

    let authors = []
    for (let author of pubConfJson[i]["entry"]["author"]) {
      let authorString = `${author.given} ${author.family}`.trim()
      let finalAuthorString = authorString
      if (
        pubConfJson[i].authors.boldAuthors
        && pubConfJson[i].authors.boldAuthors.includes(authorString)
      ) {
        finalAuthorString = `<b>${finalAuthorString}</b>`
      }
      if (
        pubConfJson[i].authors.correspondingAuthors
        && pubConfJson[i].authors.correspondingAuthors.includes(authorString)
      ) {
        //finalAuthorString = `${finalAuthorString}<sup>*</sup>`
        if ( pubConfJson[i].authors.boldAuthors && pubConfJson[i].authors.boldAuthors.includes(authorString))
        {
          finalAuthorString = `${finalAuthorString} <b>(Corresponding Author)</b>`
        }
        // else
        // {
        //   finalAuthorString = `${finalAuthorString} (Corresponding Author)`
          
        // }
        
      }
      if (
        pubConfJson[i].authors.equalContributionAuthors
        && pubConfJson[i].authors.equalContributionAuthors.includes(authorString)
      ) {
        finalAuthorString = `<u>${finalAuthorString}</u>`
      }
      authors.push(finalAuthorString)
    }
    pubConfJson[i]["entry"]["authors"] = authors.join(", ")
  }
  return pubConfJson
})



const pubArr_journal = computed(() => {
  let cslConfig = Cite.plugins.config.get('@csl')
  cslConfig.templates.add("acl", AclCsl)
  cslConfig.templates.add("gb7714", Gb7714Csl)

  for (let i = 0; i < pubJournalJson.length; i++) {
    let cite = Cite(pubJournalJson[i]["bibtex"])
    pubJournalJson[i]["entry"] = cite.get({ format: "real", type: "json", style: "csl" })[0]
    pubJournalJson[i]["bibString"] = cite.get({ format: "string", type: "string", style: "bibtex" })
    pubJournalJson[i]["acl"] = cite.format(
      "bibliography",
      {
        format: 'text',
        template: "acl",
        lang: 'en-US'
      }
    )
    pubJournalJson[i]["gb7714"] = cite.format(
      "bibliography",
      {
        format: 'text',
        template: "gb7714",
        lang: 'en-US'
      }
    )

    let authors = []
    for (let author of pubJournalJson[i]["entry"]["author"]) {
      let authorString = `${author.given} ${author.family}`.trim()
      let finalAuthorString = authorString
      if (
        pubJournalJson[i].authors.boldAuthors
        && pubJournalJson[i].authors.boldAuthors.includes(authorString)
      ) {
        finalAuthorString = `<b>${finalAuthorString}</b>`
      }
      if (
        pubJournalJson[i].authors.correspondingAuthors
        && pubJournalJson[i].authors.correspondingAuthors.includes(authorString)
      ) {
        //finalAuthorString = `${finalAuthorString}<sup>*</sup>`
        if ( pubJournalJson[i].authors.boldAuthors && pubJournalJson[i].authors.boldAuthors.includes(authorString))
        {
          finalAuthorString = `${finalAuthorString} <b>(Corresponding Author)</b>`
        }
        // else
        // {
        //   finalAuthorString = `${finalAuthorString} (Corresponding Author)`
          
        // }
        
      }
      if (
        pubJournalJson[i].authors.equalContributionAuthors
        && pubJournalJson[i].authors.equalContributionAuthors.includes(authorString)
      ) {
        finalAuthorString = `<u>${finalAuthorString}</u>`
      }
      authors.push(finalAuthorString)
    }
    pubJournalJson[i]["entry"]["authors"] = authors.join(", ")
  }
  return pubJournalJson
})


let _show_conf = {}
for (let pub of pubArr_conf.value) {
  _show_conf[pub.entry.id] = { abs: false, bib: false }
}
const showFlag_conf = ref(_show_conf)


let _show_journal = {}
for (let pub of pubArr_journal.value) {
  _show_journal[pub.entry.id] = { abs: false, bib: false }
}
const showFlag_journal = ref(_show_journal)


let _copy = {}
for (let pub of pubArr_conf.value) {
  _copy[pub.entry.id] = ""
}
const copyStatus = ref(_copy)

function copyToClipboard(text, pubId, cslTemplateType) {
  navigator.clipboard.writeText(text).then(
    () => {
      copyStatus.value[pubId] = `${cslTemplateType} copied`
      let succHandler = setInterval(() => {
        if (copyStatus.value[pubId]) {
          copyStatus.value[pubId] = ""
          clearInterval(succHandler)
        }
      }, 800)
    },
    () => {
      copyStatus.value[pubId] = `Copy ${cslTemplateType} failed`
      let failHandler = setInterval(() => {
        if (copyStatus.value[pubId]) {
          copyStatus.value[pubId] = ""
          clearInterval(failHandler)
        }
      }, 800)
    }
  )
}

</script>

<template>
  <h2  style="font-size: 20pt"> Publications</h2>
  <p>
    <!-- <b>bold</b>: myself.
    <sup>*</sup>: corresponding author(s). -->
    <!-- <u>underline</u>: equal contributions. -->
  </p>

  <h3  style="font-size: 15pt"> Conference Papers</h3>
  <ul class="pub-list" reversed>
    <li v-for="pub in pubArr_conf" :key="pub.entry.id">
      <a style="font-size: 15pt" :href="pub.entry.URL" target="_blank">{{ pub.entry.title }}</a><br>
      <p class="pub" v-html="pub.entry.authors"></p>
      <p class="pub"><em>{{ pub.entry["container-title"] }}</em>. {{ pub.entry.issued["date-parts"][0][0] }}.</p>
      <p class="pub note" v-if="pub.note">{{ pub.note }}</p>
      <div>
        <div>
          <a class="badge badge-abs" @click="showFlag_conf[pub.entry.id].abs = !showFlag_conf[pub.entry.id].abs">Abstract</a>
          <a class="badge badge-bib" @click="showFlag_conf[pub.entry.id].bib = !showFlag_conf[pub.entry.id].bib">BibTex</a>
          <SlidesBadge :slidesUrl="pub.resources.pdf" />
          <VideoBadge :videoUrl="pub.resources.slides" />
          <CodeBadge :codeUrl="pub.resources.code" />
          <PageBadge :demoUrl="pub.resources.demo" />
          <AwardBadge :demoUrl="pub.resources.award" />
          <HighlightsBadge :demoUrl="pub.resources.highlight" />

        </div>
        
        <p class="text-block" v-if="showFlag_conf[pub.entry.id].abs">{{ pub.abstract }} <img :src=pub.figure  width="740" />      </p>
        
        <div class="text-block" v-if="showFlag_conf[pub.entry.id].bib">  
          <button class="bib" @click.prevent="copyToClipboard(pub.bibtex, pub.entry.id, 'BibTeX')">Copy BibTeX</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.acl, pub.entry.id, 'ACL')">Copy ACL</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.gb7714, pub.entry.id, 'GB/T7714')">Copy
            GB/T7714</button>
          <span>{{ copyStatus[pub.entry.id] }}</span>
          <p>{{ pub.bibtex }}</p>
        </div>
      </div>
    </li>
  </ul>
  
  <br>
  <h3  style="font-size: 15pt"> Journal Papers</h3>
  <ul class="pub-list" reversed>
    <li v-for="pub in pubArr_journal" :key="pub.entry.id">
      <a style="font-size: 15pt" :href="pub.entry.URL" target="_blank">{{ pub.entry.title }}</a><br>
      <p class="pub" v-html="pub.entry.authors"></p>
      <p class="pub"><em>{{ pub.entry["container-title"] }}</em>. {{ pub.entry.issued["date-parts"][0][0] }}.</p>
      <p class="pub note" v-if="pub.note">{{ pub.note }}</p>
      <div>
        <div>
          <a class="badge badge-abs" @click="showFlag_journal[pub.entry.id].abs = !showFlag_journal[pub.entry.id].abs">Abstract</a>
          <a class="badge badge-bib" @click="showFlag_journal[pub.entry.id].bib = !showFlag_journal[pub.entry.id].bib">BibTex</a>
          <SlidesBadge :slidesUrl="pub.resources.pdf" />
          <VideoBadge :videoUrl="pub.resources.slides" />
          <CodeBadge :codeUrl="pub.resources.code" />
          <PageBadge :demoUrl="pub.resources.demo" />
          <AwardBadge :demoUrl="pub.resources.award" />
          <HighlightsBadge :demoUrl="pub.resources.highlight" />

        </div>
        
        <p class="text-block" v-if="showFlag_journal[pub.entry.id].abs">{{ pub.abstract }} <img :src=pub.figure  width="740" />      </p>
        
        <div class="text-block" v-if="showFlag_journal[pub.entry.id].bib">  
          <button class="bib" @click.prevent="copyToClipboard(pub.bibtex, pub.entry.id, 'BibTeX')">Copy BibTeX</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.acl, pub.entry.id, 'ACL')">Copy ACL</button>
          <button class="bib" @click.prevent="copyToClipboard(pub.gb7714, pub.entry.id, 'GB/T7714')">Copy
            GB/T7714</button>
          <span>{{ copyStatus[pub.entry.id] }}</span>
          <p>{{ pub.bibtex }}</p>
        </div>
      </div>
    </li>
  </ul>

</template>


<!-- 📃 -->