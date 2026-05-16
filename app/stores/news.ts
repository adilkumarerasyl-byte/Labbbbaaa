// app/stores/news.ts
import { defineStore } from 'pinia'

// Глобальный интерфейс структуры новости для всего приложения
export interface Article {
  id: number
  title: string
  description: string
  content: string
  image: string
  category: string
  date: string
  readingTime: number
  author: string
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [] as Article[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    // МЕТОД 1: ЗАГРУЗКА НОВОСТЕЙ ИЗ REAL API
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        // Делаем асинхронный запрос к бесплатному серверу API
        const response = await $fetch<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=9')
        
        const categories: string[] = ['ТЕХНОЛОГИИ', 'ИГРЫ', 'DEV']

        // Маппим данные и жестко типизируем возвращаемый объект как Article
        this.newsList = response.map((post: any, index: number): Article => {
          const fallbackCategory = categories[index % categories.length] || 'ТЕХНОЛОГИИ'

          // РЕШЕНИЕ ПРОБЛЕМЫ С ПОВТОРОМ КАРТИНОК:
          // Используем LoremFlickr. Флаг lock= гарантирует уникальное фото для каждого ID,
          // а теги tech,it,gaming подбирают нужную нам тематику.
          const dynamicImage = `https://loremflickr.com/800/450/tech,it,gaming?lock=${post.id || index}`

          return {
            id: Number(post.id) || index + 1,
            title: typeof post.title === 'string' 
              ? post.title.charAt(0).toUpperCase() + post.title.slice(1) 
              : 'Без названия',
            description: typeof post.body === 'string' 
              ? post.body.substring(0, 100) + '...' 
              : 'Описание отсутствует...',
            content: typeof post.body === 'string' 
              ? post.body + ' ' + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Развернутый текст новости для наполнения страницы контентом.'.repeat(3)
              : 'Полный текст статьи отсутствует.',
            image: dynamicImage,
            category: fallbackCategory,
            date: '16 мая',
            readingTime: Math.ceil((post.body?.length || 100) / 60) || 3,
            author: `Автор #${post.userId || 1}`
          }
        })
      } catch (err: any) {
        this.error = 'Не удалось загрузить новости с сервера API'
        console.error('API Fetch Error:', err)
      } finally {
        this.loading = false
      }
    },

    // МЕТОД 2: ДОБАВЛЕНИЕ СВОЕЙ НОВОСТИ ИЗ АДМИНКИ (POST-запрос)
    async addArticle(articleData: { title: string; description: string; category: string; content: string }) {
      try {
        const response = await $fetch<any>('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: {
            title: articleData.title,
            body: articleData.content,
            userId: 7
          }
        })

        // Добавляем созданную новость в начало списка (unshift)
        const newArticle: Article = {
          id: response && response.id ? Number(response.id) + this.newsList.length + 1 : Date.now(),
          title: articleData.title || 'Новая публикация',
          description: articleData.description || 'Краткое описание отсутствует...',
          content: articleData.content || 'Основное текстовое содержимое отсутствует...',
          category: articleData.category || 'DEV',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          date: 'Сегодня',
          readingTime: Math.ceil((articleData.content?.length || 0) / 400) || 2,
          author: 'Администратор (Вы)'
        }

        this.newsList.unshift(newArticle)
      } catch (err) {
        console.error('Ошибка при отправке POST-запроса новости:', err)
      }
    }
  }
})