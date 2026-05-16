<template>
  <nav class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <span class="bg-red-600 text-white font-black px-2.5 py-1 rounded text-lg tracking-wider group-hover:bg-red-700 transition-colors">
              PULSE
            </span>
            <span class="text-white font-bold tracking-widest text-sm uppercase hidden sm:block">
              NEWS
            </span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink 
            to="/" 
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            active-class="bg-slate-950 text-red-500 font-bold border border-slate-800"
          >
            Главная
          </NuxtLink>
          <NuxtLink 
            to="/categories" 
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            active-class="bg-slate-950 text-red-500 font-bold border border-slate-800"
          >
            Категории
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            active-class="bg-slate-950 text-red-500 font-bold border border-slate-800"
          >
            О нас
          </NuxtLink>
          <NuxtLink 
            to="/admin" 
            class="ml-4 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 shadow-md shadow-red-600/10 transition-all"
          >
            Админка
          </NuxtLink>
        </div>

        <div class="flex md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Открыть главное меню</span>
            
            <svg 
              v-if="!isMobileMenuOpen" 
              class="block h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            
            <svg 
              v-else 
              class="block h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="2" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden bg-slate-900 border-t border-slate-800/60 animate-fade-in"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
        <NuxtLink 
          to="/" 
          @click="isMobileMenuOpen = false"
          class="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          active-class="bg-slate-950 text-red-500 font-bold border border-slate-800"
        >
          Главная
        </NuxtLink>
        <NuxtLink 
          to="/categories" 
          @click="isMobileMenuOpen = false"
          class="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          active-class="bg-slate-950 text-red-500 font-bold border border-slate-800"
        >
          Категории
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          @click="isMobileMenuOpen = false"
          class="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          active-class="bg-slate-950 text-red-500 font-bold border border-slate-800"
        >
          О нас
        </NuxtLink>
        
        <div class="pt-2 border-t border-slate-800/60 mt-2">
          <NuxtLink 
            to="/admin" 
            @click="isMobileMenuOpen = false"
            class="block text-center px-4 py-2.5 bg-red-600 text-white text-base font-bold rounded-lg hover:bg-red-700 shadow-md transition-all"
          >
            Панель администратора
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Реактивная переменная, отвечающая за открытие/закрытие мобильного шторки
const isMobileMenuOpen = ref(false)
</script>

<style scoped>
/* Небольшая плавная анимация развертывания меню */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>