<template>
  <header class="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span class="bg-red-600 text-white font-black text-xs px-2 py-1 rounded tracking-wider uppercase group-hover:bg-red-700 transition-colors">
          LIVE
        </span>
        <span class="text-lg font-black tracking-wider text-white uppercase">
          PULSE <span class="text-slate-600">//</span> NEWS
        </span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
        <NuxtLink to="/" class="text-slate-400 hover:text-white transition-colors" active-class="text-red-500">
          Главная
        </NuxtLink>
        <NuxtLink to="/categories" class="text-slate-400 hover:text-white transition-colors" active-class="text-red-500">
          Категории
        </NuxtLink>
        <NuxtLink to="/about" class="text-slate-400 hover:text-white transition-colors" active-class="text-red-500">
          О нас
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        
        <template v-if="isAuthenticated">
          
          <NuxtLink 
            v-if="authStore.user?.role === 'admin'"
            to="/admin/news" 
            class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-red-600/10"
          >
            Админ-панель
          </NuxtLink>
          
          <span v-else class="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950 border border-slate-800/80 px-4 py-2.5 rounded-lg">
            Привет, {{ authStore.user?.name }}
          </span>
          
          <button 
            @click="handleLogout"
            title="Выйти из аккаунта"
            class="p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-red-500 hover:border-slate-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </template>

        <template v-else>
          <NuxtLink 
            to="/login" 
            class="bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all flex items-center gap-2"
          >
            <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Войти
          </NuxtLink>
        </template>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// Протипизированное извлечение состояния геттеров без потери реактивности
const { isAuthenticated } = storeToRefs(authStore)

const handleLogout = () => {
  authStore.logout()
  navigateTo('/')
}
</script>