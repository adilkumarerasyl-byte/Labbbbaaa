<template>
  <div class="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
      
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors mb-8 group"
      >
        ← Назад к ленте новостей
      </NuxtLink>

      <article v-if="article" class="space-y-6">
        <div class="flex flex-wrap items-center gap-4">
          <span class="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            {{ article.category }}
          </span>
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <span>Опубликовано: {{ article.date }}</span>
            <span class="w-1 h-1 rounded-full bg-slate-600"></span>
            <span>Время чтения: {{ article.readingTime }} мин</span>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
          {{ article.title }}
        </h1>

        <div class="aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
          <img 
            :src="article.image" 
            :alt="article.title" 
            class="w-full h-full object-cover"
          />
        </div>

        <p class="text-lg text-slate-300 font-medium border-l-4 border-red-600 pl-4 py-1 leading-relaxed">
          {{ article.description }}
        </p>

        <div class="text-slate-400 leading-8 space-y-4 text-base whitespace-pre-line pt-4">
          {{ article.content }}
        </div>
      </article>

      <div v-else class="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl">
        <h3 class="text-xl font-bold text-slate-300">Материал не найден</h3>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useNewsStore } from '~/stores/news'
import type { Article } from '~/stores/news'

const route = useRoute()
const newsStore = useNewsStore()

const article = computed(() => {
  return newsStore.newsList.find((item: Article) => item.id === Number(route.params.id))
})
</script>