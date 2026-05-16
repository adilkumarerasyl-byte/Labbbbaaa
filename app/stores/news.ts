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
    // МЕТОД 1: ЗАГРУЗКА И ПЕРЕВОД НОВОСТЕЙ ИЗ API
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=9')
        
        const categories: string[] = ['ТЕХНОЛОГИИ', 'ИГРЫ', 'DEV']
        
        const russianTitles = [
          'Искусственный интеллект научился писать код быстрее джуниоров',
          'Обзор главного игрового релиза этого месяца: стоит ли играть?',
          'Топ-10 плагинов для VS Code, которые увеличат вашу продуктивность',
          'Вышло масштабное обновление Nuxt 3: что изменилось для разработчиков',
          'Новое поколение видеокарт бьет все рекорды производительности в тестах',
          'Как правильно организовать архитектуру базы данных в веб-приложении',
          'Экосистема JavaScript в 2026 году: какие тренды выходят на первый план',
          'Разработчики культовой RPG анонсировали продолжение серии',
          'Почему TypeScript стал стандартом индустрии и как его освоить быстрее'
        ]

        const russianDescriptions = [
          'Новая нейросетевая модель показала удивительные результаты в автоматической генерации фронтенд-компонентов.',
          'Протестировали долгожданную новинку на ультра-настройках графики. Делимся первыми впечатлениями и замерами FPS.',
          'Собрали самые полезные инструменты для редактора кода, которые сэкономят вам часы рутинной работы ежедневно.',
          'Разбираем ключевые изменения в ядре фреймворка, оптимизацию серверного рендеринга и новые функции компилятора.',
          'Инсайдеры опубликовали официальные графики мощности будущих флагманских чипов для гейминга.',
          'Разбираем лучшие практики проектирования таблиц, управления индексами и оптимизации тяжелых SQL-запросов.',
          'Анализ рынка веб-разработки: какие фреймворки уходят в прошлое, а какие набирают сумасшедшую популярность.',
          'Студия представила первый кинематографичный трейлер и раскрыла примерные сроки выхода проекта.',
          'Подробный разбор преимуществ строгой типизации для крупных проектов и предотвращения багов на этапе написания.'
        ]

        this.newsList = response.map((post: any, index: number): Article => {
          const fallbackCategory = categories[index % categories.length] || 'ТЕХНОЛОГИИ'
          
          const title = russianTitles[index] || `Информационный материал #${post.id}`
          const description = russianDescriptions[index] || 'Подробности читайте в полном тексте статьи...'
          
          // ГАРАНТИЯ 100% РАЗНЫХ КАРТИНОК:
          // Сдвигаем ID на +30, чтобы получить красивые картинки без повторов
          const imageId = (Number(post.id) || index) + 30
          const dynamicImage = `https://picsum.photos/id/${imageId}/800/450`

          return {
            id: Number(post.id) || index + 1,
            title: title,
            description: description,
            content: `${description} Сегодня информационные технологии развиваются с невероятной скоростью. Данный материал подготовлен редакцией нашего портала, чтобы детально разобрать ключевые аспекты этого события. Мы опросили ведущих экспертов отрасли и собрали самые актуальные мнения, технические метрики и прогнозы на ближайшее будущее. Оставайтесь с нами, чтобы первыми узнавать о главных новостях из мира разработки и гейминга!`,
            image: dynamicImage,
            category: fallbackCategory,
            date: '16 мая',
            readingTime: Math.ceil((post.body?.length || 100) / 60) || 3,
            author: `Редактор #${post.userId || 1}`
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

        const newArticle: Article = {
          id: response && response.id ? Number(response.id) + this.newsList.length + 1 : Date.now(),
          title: articleData.title || 'Новая публикация',
          description: articleData.description || 'Краткое описание отсутствует...',
          content: articleData.content || 'Основное текстовое содержимое отсутствует...',
          category: articleData.category || 'DEV',
          image: 'https://picsum.photos/id/60/800/450',
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