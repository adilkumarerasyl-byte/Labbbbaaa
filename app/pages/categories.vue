<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    
    <div>
      <h1 class="text-3xl font-black uppercase tracking-wider text-white">
        Категории публикаций
      </h1>
      <p class="text-slate-400 text-sm mt-1">Выберите интересующее вас направление для фильтрации статей</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div 
        v-for="cat in categories" 
        :key="cat.slug"
        class="bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group"
        :class="[
          activeQuery === cat.slug 
            ? 'border-red-600 shadow-xl shadow-red-600/5 ring-1 ring-red-600' 
            : 'border-slate-800 hover:border-slate-700 hover:-translate-y-1'
        ]"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-red-500 transition-colors">
              {{ cat.count }} статей
            </span>
            <div class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-white transition-colors">
              <component :is="cat.icon" class="w-5 h-5" />
            </div>
          </div>

          <div class="space-y-1.5">
            <h3 class="text-lg font-bold text-white">{{ cat.title }}</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              {{ cat.description }}
            </p>
          </div>
        </div>

        <div class="pt-6">
          <NuxtLink 
            :to="`/?cat=${cat.title}`"
            class="w-full bg-slate-950 hover:bg-red-600 border border-slate-800 hover:border-transparent text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl block text-center transition-all"
          >
            Открыть ленту
          </NuxtLink>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Считываем query-параметр ?type=... из адресной строки для подсветки карточки
const activeQuery = computed(() => route.query.type)

// Встроенные SVG иконки для категорий
const IconTech = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9.813 15.904L9 21m0 0l-.813-5.096M9 21h3.375c1.449 0 2.625-1.176 2.625-2.625V18M19.5 12c0-2.12-1.11-3.98-2.764-5.022L18 3M18 3h-3.375a2.625 2.625 0 00-2.625 2.625V6M3 12c0 2.12 1.11 3.98 2.764 5.022L5 21m0 0h3.375c1.449 0 2.625-1.176 2.625-2.625V18M3 12c0-2.12 1.11-3.98 2.764-5.022L5 3m0 0h3.375A2.625 2.625 0 0111 5.625V6m8.5 6c0 2.12-1.11 3.98-2.764 5.022L18 21' })])
const IconGames = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621-.504-1.125-1.125-1.125h-.75A1.125 1.125 0 006 7.875v5.25c0 .621-.504 1.125-1.125 1.125h-.75A1.125 1.125 0 003 15.375V18.75' })])
const IconDev = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' })])

// Массив объектов категорий
const categories = [
  {
    title: 'Технологии',
    slug: 'tech',
    count: 142,
    description: 'Обзоры научных открытий, ИИ-систем, нейросетей, гаджетов и новинок из мира потребительской электроники.',
    icon: IconTech
  },
  {
    title: 'Игры',
    slug: 'games',
    count: 89,
    description: 'Индустрия гейминга, тесты производительности видеокарт, разборы патчей, консоли нового поколения и киберспорт.',
    icon: IconGames
  },
  {
    title: 'Dev',
    slug: 'dev',
    count: 215,
    description: 'Практические гайды для frontend и backend разработчиков, разборы синтаксиса, обзоры фреймворков и архитектурных подходов.',
    icon: IconDev
  }
]
</script>