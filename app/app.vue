<template>
  <div class="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between">

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
// В Nuxt 3 компоненты Navbar и Footer из папки components подтягиваются автоматически.
// Никаких дополнительных импортов здесь писать не нужно!
</script>

<style>
/* Глобальные стили для плавных переходов и красивого скроллбара */
html {
  scroll-behavior: smooth;
}

/* Кастомный темный скроллбар в стиле Pulse News */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #020617; /* slate-950 */
}
::-webkit-scrollbar-thumb {
  background: #1e293b; /* slate-800 */
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #dc2626; /* red-600 */
}
</style>