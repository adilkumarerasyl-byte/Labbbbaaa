<script setup lang="ts">
// 1. ЗАЩИТА И РЕДИРЕКТ: Проверяем роль 'admin', и если всё ок — перекидываем на управление новостями
definePageMeta({
  middleware: ['admin', () => {
    return navigateTo('/admin/news')
  }]
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
    <div class="text-center space-y-3">
      <div class="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-sm font-medium uppercase tracking-widest text-slate-500">Загрузка панели управления...</p>
    </div>
  </div>
</template>