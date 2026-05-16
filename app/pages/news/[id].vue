<template>
  <div class="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
      
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition-colors mb-8 group"
      >
        <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Назад к ленте новостей
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

        <div class="flex items-center gap-3 py-3 border-y border-slate-900">
          <div class="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 uppercase">
            {{ article.author.substring(0, 2) }}
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-200">{{ article.author }}</p>
            <p class="text-[11px] text-slate-500">Редакция портала Pulse News</p>
          </div>
        </div>

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
        <p class="text-slate-500 text-sm mt-1">К сожалению, статьи с ID "{{ route.params.id }}" не существует в базе.</p>
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

// Метод поиска элемента с типизированным аргументом (item: Article)
const article = computed(() => {
  return newsStore.newsList.find((item: Article) => item.id === Number(route.params.id))
})
</script>