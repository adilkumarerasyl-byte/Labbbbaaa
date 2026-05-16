<template>
  <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100">
    
    <div class="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-xl font-black tracking-wide text-white uppercase flex items-center gap-2">
          <span class="w-2 h-5 bg-red-600 rounded"></span>
          Управление новостями
        </h2>
        <p class="text-slate-400 text-sm mt-1">Всего опубликовано материалов: <span class="text-white font-semibold">{{ items.length }}</span></p>
      </div>
      
      <div class="relative max-w-xs w-full">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Поиск по заголовку..." 
          class="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
        />
        <svg class="w-4 h-4 text-slate-600 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
        </svg>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-950 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
            <th class="py-3.5 px-6 w-16 text-center">ID</th>
            <th class="py-3.5 px-4">Новость</th>
            <th class="py-3.5 px-4 w-40">Категория</th>
            <th class="py-3.5 px-4 w-36">Дата</th>
            <th class="py-3.5 px-6 w-32 text-right">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60 text-sm">
          <tr 
            v-for="news in filteredItems" 
            :key="news.id" 
            class="hover:bg-slate-800/30 transition-colors duration-150 group"
          >
            <td class="py-4 px-6 text-center text-slate-500 font-mono text-xs">
              {{ news.id }}
            </td>

            <td class="py-4 px-4 min-w-[300px]">
              <div class="flex items-center gap-4">
                <img 
                  :src="news.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=100&q=80'" 
                  alt="" 
                  class="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0 border border-slate-800"
                />
                <div class="overflow-hidden">
                  <h4 class="font-bold text-white truncate group-hover:text-red-500 transition-colors duration-150" :title="news.title">
                    {{ news.title }}
                  </h4>
                  <p class="text-xs text-slate-400 mt-0.5 truncate">Автор: {{ news.author || 'Редакция' }}</p>
                </div>
              </div>
            </td>

            <td class="py-4 px-4">
              <span 
                class="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold tracking-wide uppercase"
                :class="getCategoryClass(news.category)"
              >
                {{ news.category || 'Общее' }}
              </span>
            </td>

            <td class="py-4 px-4 text-slate-400 font-medium whitespace-nowrap">
              {{ formatDate(news.date) }}
            </td>

            <td class="py-4 px-6 text-right whitespace-nowrap">
              <div class="inline-flex items-center gap-2">
                <button 
                  @click="$emit('edit', news)"
                  class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Редактировать"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>

                <button 
                  @click="$emit('delete', news.id)"
                  class="p-2 rounded-lg bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white transition-colors border border-red-900/30 hover:border-transparent"
                  title="Удалить новость"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredItems.length === 0">
            <td colspan="5" class="py-12 text-center text-slate-500">
              Новости не найдены. Попробуйте изменить поисковый запрос.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Описание типов для пропсов
interface NewsItem {
  id: number | string
  title: string
  category: string
  date: string | Date
  image?: string
  author?: string
}

const props = defineProps<{
  items: NewsItem[]
}>()

// Регистрируем события наружу для обработки родителем (удаление и редактирование)
defineEmits(['edit', 'delete'])

// Переменная живого поиска
const searchQuery = ref('')

// Фильтрация элементов на лету по поисковой строке
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return props.items
  return props.items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Функция раздачи цветов бэджам в зависимости от категории
const getCategoryClass = (category: string) => {
  const cat = category?.toLowerCase()
  if (cat === 'технологии' || cat === 'dev') return 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
  if (cat === 'игры') return 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
  if (cat === 'политика') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  return 'bg-slate-800 text-slate-400 border border-slate-700'
}

// Форматирование даты
const formatDate = (dateValue: string | Date) => {
  if (!dateValue) return 'Неизвестно'
  return new Date(dateValue).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>