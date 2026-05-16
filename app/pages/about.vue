<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
    
    <div class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-black uppercase tracking-wider text-white">
        О проекте <span class="text-red-500">PULSE NEWS</span>
      </h1>
      <p class="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
        Мы создаем независимую технологическую медиа-платформу для разработчиков, геймеров и всех, кто хочет оставаться на острие прогресса.
      </p>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      <div class="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
      <h2 class="text-xl font-bold text-white uppercase tracking-wide mb-3">Наша Миссия</h2>
      <p class="text-slate-300 leading-relaxed text-sm md:text-base">
        В эпоху информационного шума и кликбейта крайне важно иметь источник с чистой, отжатой от «воды» аналитикой. Мы пишем о сложных вещах — архитектуре баз данных, компиляторах, трендах фронтенда и игровом железе — простым и понятным языком. Никаких проплаченных обзоров, только честный контент.
      </p>
    </div>

    <div class="space-y-4">
      <h2 class="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <span class="w-1.5 h-4 bg-red-600 rounded-sm"></span>
        Наш Технологический Стек
      </h2>
      <p class="text-slate-400 text-sm">Портал построен на передовых инструментах веб-разработки для обеспечения максимальной скорости и SEO-оптимизации:</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
        <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <div class="text-white font-bold text-sm">Nuxt 3</div>
          <div class="text-slate-500 text-[11px] mt-0.5 uppercase tracking-wider">SSR Фреймворк</div>
        </div>
        <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <div class="text-white font-bold text-sm">Vue 3</div>
          <div class="text-slate-500 text-[11px] mt-0.5 uppercase tracking-wider">Composition API</div>
        </div>
        <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <div class="text-white font-bold text-sm">Tailwind CSS</div>
          <div class="text-slate-500 text-[11px] mt-0.5 uppercase tracking-wider">Стилизация</div>
        </div>
        <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <div class="text-white font-bold text-sm">Pinia</div>
          <div class="text-slate-500 text-[11px] mt-0.5 uppercase tracking-wider">Управление Стейтом</div>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
      <div>
        <h3 class="font-bold text-white">По вопросам сотрудничества и рекламы</h3>
        <p class="text-slate-500 text-xs mt-0.5">Отвечаем в течение 24 часов</p>
      </div>
      <a href="mailto:support@pulsenews.kz" class="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-slate-700 font-medium px-5 py-2.5 rounded-xl transition-all">
        support@pulsenews.kz
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
// Страница статичная, сложная логика не требуется
</script>