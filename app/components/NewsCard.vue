<template>
  <article class="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col h-full">
    
    <div class="relative aspect-video w-full overflow-hidden bg-slate-800">
      <img 
        :src="image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'" 
        :alt="title"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <span 
        v-if="category"
        class="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-sm"
      >
        {{ category }}
      </span>
    </div>

    <div class="p-5 flex flex-col flex-grow">
      
      <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
        <div class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <time>{{ formattedDate }}</time>
        </div>
        <span class="w-1 h-1 rounded-full bg-slate-600"></span>
        <div class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ readingTime || 3 }} мин</span>
        </div>
      </div>

      <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200 leading-snug">
        <NuxtLink :to="`/news/${id}`" class="focus:outline-none">
          <span class="absolute inset-0 z-10" aria-hidden="true"></span>
          {{ title }}
        </NuxtLink>
      </h3>

      <p class="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
        {{ description }}
      </p>

      <div class="pt-4 border-t border-slate-800/60 flex items-center justify-between relative z-20">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-[10px] font-bold text-slate-300 uppercase">
            {{ author?.substring(0, 2) || 'AI' }}
          </div>
          <span class="text-xs font-medium text-slate-300 truncate max-w-[120px]">
            {{ author || 'Редакция' }}
          </span>
        </div>

        <span class="text-xs font-semibold text-red-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
          Читать
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>

    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Описание принимаемых пропсов (входных данных)
interface Props {
  id: number | string
  title: string
  description: string
  image?: string
  category?: string
  date?: string | Date
  readingTime?: number
  author?: string
}

const props = withDefaults(defineProps<Props>(), {
  category: 'Новости',
  author: 'Редакция',
  readingTime: 3
})

// Форматирование даты (если передана строка/дата, переводим в читаемый вид)
const formattedDate = computed(() => {
  if (!props.date) return 'Сегодня'
  const d = new Date(props.date)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
})
</script>