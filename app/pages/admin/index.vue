<template>
  <div class="min-h-screen bg-gray-50 dark:bg-brand-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <nav class="bg-white dark:bg-brand-card border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-sm font-medium text-gray-500 hover:text-brand-accent flex items-center gap-1">
            ← На сайт
          </NuxtLink>
          <span class="text-gray-300 dark:text-gray-700">|</span>
          <h1 class="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">
            PULSE // PANEL
          </h1>
        </div>
        <button 
          @click="openCreateModal" 
          class="px-4 py-2 bg-gradient-to-r from-brand-accent to-brand-purple text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition transform hover:-translate-y-0.5"
        >
          + Добавить новость
        </button>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-10">
      <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl font-bold">Управление публикациями</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Всего новостей в системе: {{ store.articles.length }}</p>
        </div>
      </div>

      <div v-if="store.loading" class="space-y-4">
        <div v-for="i in 4" :key="i" class="h-20 w-full animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>

      <div v-else-if="store.articles.length > 0" class="bg-white dark:bg-brand-card rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 text-xs font-bold uppercase text-gray-500 tracking-wider">
                <th class="p-4">Превью</th>
                <th class="p-4">Заголовок</th>
                <th class="p-4">Категория</th>
                <th class="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
              <tr 
                v-for="article in store.articles" 
                :key="article.id" 
                class="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors"
              >
                <td class="p-4 w-24">
                  <img 
                    :src="article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80'" 
                    class="w-16 h-12 object-cover rounded-md bg-gray-100 dark:bg-gray-800" 
                    alt=""
                  />
                </td>
                <td class="p-4 max-w-md">
                  <p class="font-semibold text-sm line-clamp-1">{{ article.title }}</p>
                  <p class="text-xs text-gray-400 line-clamp-1 mt-0.5">{{ article.description }}</p>
                </td>
                <td class="p-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple uppercase tracking-wider">
                    {{ article.category || 'general' }}
                  </span>
                </td>
                <td class="p-4 text-right">
                  <div class="flex items-center justify-end gap-3">
                    <button 
                      @click="openEditModal(article)" 
                      class="text-sm font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      Изменить
                    </button>
                    <button 
                      @click="deleteArticle(article.id)" 
                      class="text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
                    >
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="text-center py-16 bg-white dark:bg-brand-card rounded-xl border border-gray-200 dark:border-gray-800">
        <p class="text-gray-500 dark:text-gray-400">Список новостей пока пуст.</p>
      </div>
    </main>

    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="bg-white dark:bg-brand-card rounded-xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 class="text-lg font-bold">
            {{ isEditMode ? 'Редактировать публикацию' : 'Создать новую публикацию' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 text-xl">&times;</button>
        </div>

        <form @submit.prevent="submitForm" class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Заголовок *</label>
            <input 
              v-model="form.title" 
              type="text" 
              required
              class="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-brand-accent transition"
              placeholder="Введите заголовок новости"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Категория *</label>
              <select 
                v-model="form.category"
                class="w-full px-3 py-2 bg-white dark:bg-brand-card border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-brand-accent transition"
              >
                <option value="general">Общие</option>
                <option value="technology">Технологии</option>
                <option value="business">Бизнес</option>
                <option value="science">Наука</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Ссылка на изображение</label>
              <input 
                v-model="form.urlToImage" 
                type="url" 
                class="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-brand-accent transition"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Краткое описание *</label>
            <textarea 
              v-model="form.description" 
              rows="3"
              required
              class="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-brand-accent transition resize-none"
              placeholder="О чем эта статья?"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Полный контент статьи</label>
            <textarea 
              v-model="form.content" 
              rows="5"
              class="w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:border-brand-accent transition resize-none"
              placeholder="Текст новости..."
            ></textarea>
          </div>

          <div class="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
            <button 
              type="button" 
              @click="closeModal" 
              class="px-4 py-2 border border-gray-300 dark:border-gray-800 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Отмена
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-gradient-to-r from-brand-accent to-brand-purple text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              {{ isEditMode ? 'Сохранить изменения' : 'Опубликовать' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <UiToast />
  </div>
</template>

<script setup lang="typescript">
import { ref, reactive, onMounted } from 'vue'
import { useNewsStore } from '~/stores/news'
import type { Article } from '~/stores/news' // Импортируем интерфейс (убедитесь, что он экспортируется из вашего стора)

const store = useNewsStore()

// Модальное состояние
const isModalOpen = ref<boolean>(false)
const isEditMode = ref<boolean>(false)
const currentArticleId = ref<string | null>(null)

// Начальное состояние формы
const initialFormState = {
  title: '',
  description: '',
  content: '',
  category: 'general',
  urlToImage: ''
}

const form = reactive({ ...initialFormState })

onMounted(async () => {
  // Загружаем актуальный список новостей, если он пуст
  if (!store.articles.length) {
    await store.loadNews()
  }
})

// Открытие для создания
const openCreateModal = () => {
  isEditMode.value = false
  currentArticleId.value = null
  Object.assign(form, initialFormState)
  isModalOpen.value = true
}

// Открытие для редактирования
const openEditModal = (article: Article) => {
  isEditMode.value = true
  currentArticleId.value = article.id || null
  
  form.title = article.title
  form.description = article.description || ''
  form.content = article.content || ''
  form.category = article.category || 'general'
  form.urlToImage = article.urlToImage || ''
  
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Отправка формы (Создание / Обновление)
const submitForm = async () => {
  if (isEditMode.value && currentArticleId.value) {
    // Вызываем ваш экшен обновления
    if (typeof store.updateArticle === 'function') {
      await store.updateArticle(currentArticleId.value, { ...form })
    }
  } else {
    // Вызываем ваш экшен создания
    if (typeof store.createArticle === 'function') {
      await store.createArticle({ ...form })
    }
  }
  closeModal()
}

// Удаление публикации
const deleteArticle = async (id?: string) => {
  if (!id) return
  if (confirm('Вы уверены, что хотите удалить эту новость?')) {
    if (typeof store.deleteArticle === 'function') {
      await store.deleteArticle(id)
    }
  }
}
</script>