// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
      },
      db: {
        driver: 'fs',
        base: './data/db'
      }
    }
  }
})