<template>
  <aside 
    class="fixed top-0 left-0 z-40 h-screen bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col justify-between transition-all duration-300 ease-in-out"
    :class="[isCollapsed ? 'w-20' : 'w-64']"
  >
    <div>
      <div class="h-16 flex items-center px-4 border-b border-slate-800" :class="[isCollapsed ? 'justify-center' : 'justify-between']">
        <NuxtLink to="/" class="flex items-center gap-2 font-black text-white tracking-wider text-lg" v-show="!isCollapsed">
          <span class="bg-red-600 px-1.5 py-0.5 rounded text-xs">P</span>
          PULSE<span class="text-red-500">.</span>CMS
        </NuxtLink>
        <NuxtLink to="/" class="bg-red-600 px-2 py-1 rounded font-black text-white text-sm" v-show="isCollapsed" title="Pulse CMS">
          P
        </NuxtLink>

        <button 
          @click="isCollapsed = !isCollapsed"
          class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors focus:outline-none"
          :class="{'ml-0': isCollapsed}"
        >
          <svg 
            class="w-5 h-5 transition-transform duration-300" 
            :class="{'rotate-180': isCollapsed}"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2.5" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      <nav class="p-4 space-y-1.5">
        <NuxtLink 
          v-for="link in menuLinks" 
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group relative"
        >
          <component :is="link.icon" class="w-5 h-5 flex-shrink-0 group-hover:text-red-500 transition-colors" />
          
          <span class="transition-opacity duration-200" :class="[isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100']">
            {{ link.name }}
          </span>

          <span 
            v-if="isCollapsed"
            class="absolute left-24 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1.5 rounded shadow-xl border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50"
          >
            {{ link.name }}
          </span>
        </NuxtLink>
      </nav>
    </div>

    <div class="p-4 border-t border-slate-800 bg-slate-950/40">
      <div class="flex items-center justify-between" :class="[isCollapsed ? 'justify-center' : '']">
        
        <div class="flex items-center gap-3 overflow-hidden" v-show="!isCollapsed">
          <div class="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-red-400 uppercase flex-shrink-0">
            AЕ
          </div>
          <div class="overflow-hidden">
            <h4 class="text-xs font-bold text-white truncate">Адиль Е.</h4>
            <p class="text-[10px] text-slate-500 truncate">Главный редактор</p>
          </div>
        </div>

        <div 
          v-show="isCollapsed" 
          class="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-red-400 uppercase cursor-pointer"
          title="Профиль: Адиль Е."
        >
          AЕ
        </div>

        <button 
          v-show="!isCollapsed"
          @click="handleLogout"
          class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-red-400 transition-colors"
          title="Выйти из системы"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>

      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

// Состояние сворачивания панели
const isCollapsed = ref(false)

// Функции-рендереры для SVG иконок без установки лишних пакетов (Heroicons inline)
const IconDashboard = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' })])
const IconNews = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' })])
const IconCategories = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z' })])
const IconSettings = () => h('svg', { class: 'w-5 h-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127c.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767c-.307.235-.45.643-.366 1.022.012.053.022.107.03.162.04.27.04.544 0 .814-.008.055-.018.109-.03.162-.085.379.058.787.366 1.022l1.003.767a1.125 1.125 0 01.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456c-.356-.133-.751-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.767c.306-.235.45-.643.366-1.022a4.18 4.18 0 01-.03-.162 4.18 4.18 0 010-.814c.009-.055.019-.109.03-.162.085-.379-.058-.787-.366-1.022l-1.004-.767a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869l.214-1.28z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })])

// Массив ссылок меню
const menuLinks = [
  { name: 'Консоль', to: '/admin/dashboard', icon: IconDashboard },
  { name: 'Статьи', to: '/admin/news', icon: IconNews },
  { name: 'Категории', to: '/admin/categories', icon: IconCategories },
  { name: 'Настройки', to: '/admin/settings', icon: IconSettings }
]

const handleLogout = () => {
  alert('Выход из учетной записи...')
}
</script>

<style scoped>
/* Подсветка активной Nuxt ссылки */
.router-link-active {
  @apply bg-slate-800 text-white border-l-4 border-red-600 rounded-l-none pl-2;
}
.router-link-active svg {
  @apply text-red-500;
}
</style>