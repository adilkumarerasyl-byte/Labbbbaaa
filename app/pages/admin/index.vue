<template>
  <div class="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between">
    <Navbar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full space-y-10">
      
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl font-black uppercase tracking-wide text-white flex items-center gap-2">
            <span class="w-2 h-6 bg-red-600 rounded"></span>
            Лента новостей
          </h2>
          <p class="text-slate-400 text-sm mt-1">Синхронизация контента в реальном времени через REST API</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto flex-grow max-w-2xl justify-end">
          <div class="relative w-full sm:max-w-xs">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Поиск новостей..." 
              class="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
            <svg class="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
          </div>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button 
              v-for="cat in ['ВСЕ', 'ТЕХНОЛОГИИ', 'ИГРЫ', 'DEV']" 
              :key="cat"
              @click="selectedCategory = cat"
              class="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-200"
              :class="[
                (selectedCategory === cat || (cat === 'ВСЕ' && selectedCategory === 'BCE')) 
                  ? 'bg-red-600 border-transparent text-white shadow-lg shadow-red-600/20' 
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="newsStore.loading" class="text-center py-24 bg-slate-900/20 border border-slate-900 rounded-2xl">
        <div class="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-slate-500 text-sm uppercase tracking-widest font-bold">Получение свежих релизов с API...</p>
      </div>

      <div v-else-if="newsStore.error" class="text-center py-16 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-500">
        <svg class="w-10 h-10 mx-auto mb-3 text-red-500/60" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <h3 class="font-bold uppercase tracking-wide">Не удалось синхронизировать данные</h3>
        <p class="text-slate-400 text-xs mt-1">{{ newsStore.error }}</p>
      </div>

      <div v-else-if="filteredNews.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="item in filteredNews" 
          :key="item.id" 
          :to="`/news/${item.id}`" 
          class="block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all group"
        >
          <div class="aspect-video w-full overflow-hidden relative bg-slate-950">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <span class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
              {{ item.category }}
            </span>
          </div>
          
          <div class="p-5 space-y-3">
            <div class="flex items-center gap-2 text-[11px] text-slate-500">
              <span>{{ item.date }}</span>
              <span>•</span>
              <span>{{ item.readingTime }} мин</span>
            </div>
            
            <h3 class="text-base font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">
              {{ item.title }}
            </h3>
            
            <p class="text-slate-400 text-xs line-clamp-3 leading-relaxed">
              {{ item.description }}
            </p>
            
            <div class="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-[9px] font-bold flex items-center justify-center uppercase text-slate-300">
                  {{ item.author.substring(0, 2) }}
                </div>
                <span>{{ item.author }}</span>
              </div>
              <span class="text-red-500 font-medium group-hover:translate-x-1 transition-transform">Читать →</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-24 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
        <svg class="w-12 h-12 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <h3 class="text-lg font-bold text-slate-300">Совпадений не найдено</h3>
        <p class="text-slate-500 text-sm mt-1">По вашему запросу "{{ searchQuery }}" публикаций в базе API нет.</p>
      </div>

    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNewsStore } from '~/stores/news'
import type { Article } from '~/stores/news'

const newsStore = useNewsStore()

const searchQuery = ref('')
const selectedCategory = ref('ВСЕ')

onMounted(() => {
  if (newsStore.newsList.length === 0) {
    newsStore.fetchNews()
  }
})

// Фильтрация с явным указанием типов (item: Article) для предотвращения ошибок any тип
const filteredNews = computed(() => {
  return newsStore.newsList.filter((item: Article) => {
    const currentCat = selectedCategory.value === 'ВСЕ' ? 'BCE' : selectedCategory.value
    const matchesCategory = currentCat === 'BCE' || item.category === currentCat
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesCategory && matchesSearch
  })
})
</script>