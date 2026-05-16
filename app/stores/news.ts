// app/stores/news.ts
import { defineStore } from 'pinia'

// Глобальный и строгий интерфейс структуры новости для TypeScript
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
    // Инициализируем реактивное состояние как строго типизированный массив Article[]
    newsList: [] as Article[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    // МЕТОД 1: ПОЛУЧЕНИЕ ДАННЫХ ИЗ ВНЕШНЕГО API
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        // Запрашиваем 9 постов у бесплатного REST API
        const response = await $fetch<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=9')
        
        // Массивы для красивого распределения категорий по карточкам
        const categories: string[] = ['ТЕХНОЛОГИИ', 'ИГРЫ', 'DEV']

        // Маппим прилетевшие данные с сервера, превращая их в формат нашего фронтенда
        this.newsList = response.map((post: any, index: number): Article => {
          const fallbackCategory = categories[index % categories.length] || 'ТЕХНОЛОГИИ'

          // РЕШЕНИЕ ПРОБЛЕМЫ С ПОВТОРОМ КАРТИНОК:
          // Каждому посту генерируем уникальный URL на Unsplash на основе его id портала.
          // Теги tech, coding, gaming гарантируют соответствие тематике нашего сайта.
          const dynamicImage = `https://images.unsplash.com/featured/800x450/?tech,coding,gaming&sig=${post.id || index}`

          return {
            id: Number(post.id) || index + 1,
            // Делаем первую букву заголовка заглавной (API возвращает всё с маленькой)
            title: typeof post.title === 'string' 
              ? post.title.charAt(0).toUpperCase() + post.title.slice(1) 
              : 'Без названия',
            // Обрезаем длинный текст body для аккуратного превью в карточке
            description: typeof post.body === 'string' 
              ? post.body.substring(0, 100) + '...' 
              : 'Описание отсутствует...',
            // Искусственно увеличиваем объем текста для страницы детального просмотра [id].vue
            content: typeof post.body === 'string' 
              ? post.body + ' ' + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Дополнительный развернутый текст новости для наполнения страницы контентом.'.repeat(3)
              : 'Полный текст статьи.',
            image: dynamicImage,
            category: fallbackCategory,
            date: '16 мая',
            readingTime: Math.ceil((post.body?.length || 100) / 60) || 3,
            author: `Автор #${post.userId || 1}`
          }
        })
      } catch (err: any) {
        this.error = 'Не удалось загрузить свежие новости с сервера API'
        console.error('API Fetch Error:', err)
      } finally {
        this.loading = false
      }
    },

    // МЕТОД 2: ДОБАВЛЕНИЕ НОВОСТИ ИЗ АДМИНКИ (Имитация POST-запроса)
    async addArticle(articleData: { title: string; description: string; category: string; content: string }) {
      try {
        // Отправляем тестовый POST запрос на фейковый бэкенд
        const response = await $fetch<any>('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: {
            title: articleData.title,
            body: articleData.content,
            userId: 7
          }
        })

        // Добавляем созданную в панели новость на наш фронтенд в самый верх списка (unshift)
        const newArticle: Article = {
          id: (navigator && Number(response.id)) ? Number(response.id) + this.newsList.length + 1 : Date.now(),
          title: articleData.title || 'Новая публикация',
          description: articleData.description || 'Краткое описание отсутствует...',
          content: articleData.content || 'Основное текстовое содержимое отсутствует...',
          category: articleData.category || 'DEV',
          // Для созданных вручную новостей ставим красивую стандартную заглушку с кодом
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
          date: 'Сегодня',
          readingTime: Math.ceil((articleData.content?.length || 0) / 400) || 2,
          author: 'Администратор (Вы)'
        }

        this.newsList.unshift(newArticle)
      } catch (err) {
        console.error('Ошибка при симуляции отправки статьи (POST):', err)
      }
    }
  }
})