export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  app: {
    head: {
      title: 'PulseNews | Современный новостной портал',
      meta: [
        { name: 'description', content: 'Самые свежие и актуальные новости' }
      ]
    }
  },
  compatibilityDate: '2026-05-15'
})