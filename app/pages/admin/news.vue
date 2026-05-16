<script setup lang="ts">
// 1. Настройка Middleware защиты (доступ только для админов)
definePageMeta({
  middleware: 'admin'
})

import { ref } from 'vue'

// Подключаем стор новостей
const newsStore = useNewsStore()

// Модель данных для полей формы создания
const newArticle = ref({
  title: '',
  description: '',
  content: '', 
  category: 'ТЕХНОЛОГИИ'
})

const handleCreate = () => {
  // 2. Передаем заполненные данные в экшен стора
  newsStore.addArticle({
    title: newArticle.value.title,
    description: newArticle.value.description,
    content: newArticle.value.content,
    category: newArticle.value.category
  })

  // Оповещаем об успехе
  alert('Новость успешно опубликована и занесена в базу данных сайта!')
  
  // Полностью очищаем поля формы для новой статьи
  newArticle.value.title = ''
  newArticle.value.description = ''
  newArticle.value.content = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
    <Navbar />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full space-y-8">
      
      <div class="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 class="text-3xl font-black uppercase tracking-wide text-white flex items-center gap-2">
            <span class="w-2 h-7 bg-red-600 rounded"></span>
            Панель управления
          </h1>
          <p class="text-slate-400 text-sm mt-1">Добавление новостных материалов в общую базу данных</p>
        </div>
        
        <span class="bg-red-600/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
          Доступ: Администратор
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <h3 class="text-lg font-bold text-white uppercase tracking-wide">Опубликовать новый материал</h3>
          
          <form @submit.prevent="handleCreate" class="space-y-4">
            
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Заголовок статьи</label>
              <input 
                v-model="newArticle.title"
                type="text" required
                placeholder="Введите цепляющий заголовок новости..." 
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Категория публикации</label>
                <select 
                  v-model="newArticle.category"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="ТЕХНОЛОГИИ">ТЕХНОЛОГИИ</option>
                  <option value="ИГРЫ">ИГРЫ</option>
                  <option value="DEV">DEV</option>
                </select>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Автор</label>
                <input 
                  type="text" disabled value="Администратор"
                  class="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Краткое описание (Для карточки на главной)</label>
              <textarea 
                v-model="newArticle.description"
                rows="2" required
                placeholder="Напишите краткую суть статьи в 2-3 предложениях..." 
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
              ></textarea>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Полный текст статьи</label>
              <textarea 
                v-model="newArticle.content"
                rows="6" required
                placeholder="Напишите здесь развернутое содержание вашей публикации со всеми подробностями..." 
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/10"
            >
              Сохранить и опубликовать
            </button>
          </form>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl h-fit">
          <h4 class="text-sm font-bold text-white uppercase tracking-wider">Статистика базы новостей</h4>
          <div class="space-y-3 text-xs text-slate-400">
            <div class="flex justify-between border-b border-slate-800/60 pb-2">
              <span>Всего новостей на сайте:</span>
              <span class="text-white font-bold">{{ newsStore.newsList.length }} шт.</span>
            </div>
            <div class="flex justify-between">
              <span>Хранилище данных:</span>
              <span class="text-emerald-500 font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> LocalStorage DB
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>

    <Footer />
  </div>
</template>