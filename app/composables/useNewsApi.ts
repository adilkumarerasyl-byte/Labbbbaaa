export const useNewsApi = () => {
  // В Nuxt 3 эти функции не нужно импортировать, они доступны везде
  const baseUrl = 'https://newsapi.org/v2'
  const apiKey = 'YOUR_API_KEY'

  const fetchTopHeadlines = async (category: string = 'general', query: string = '') => {
    // Временно используем fetch или useFetch
    const url = `${baseUrl}/top-headlines?country=us&category=${category}&q=${query}&apiKey=${apiKey}`
    
    // Используем стандартный fetch для простоты или $fetch (Nuxt)
    try {
      const response: any = await $fetch(url)
      
      return response.articles.map((a: any, index: number) => ({
        id: String(index + 1),
        title: a.title,
        description: a.description || '',
        content: a.content || '',
        urlToImage: a.urlToImage || 'https://via.placeholder.com/400',
        publishedAt: a.publishedAt,
        category: category
      }))
    } catch (e) {
      console.error("API Error, returning mock data")
      return [
        {
          id: '1',
          title: 'Тестовая новость',
          description: 'Описание новости',
          content: 'Контент',
          urlToImage: 'https://via.placeholder.com/400',
          publishedAt: new Date().toISOString(),
          category: 'general'
        }
      ]
    }
  }

  return { fetchTopHeadlines }
}