<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
    <Navbar />

    <main class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        
        <div class="grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/60">
          <button 
            @click="isLoginMode = true; errorMessage = ''; successMessage = ''"
            class="py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            :class="isLoginMode ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'"
          >
            Вход
          </button>
          <button 
            @click="isLoginMode = false; errorMessage = ''; successMessage = ''"
            class="py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            :class="!isLoginMode ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'"
          >
            Регистрация
          </button>
        </div>

        <div class="text-center space-y-1">
          <h2 class="text-2xl font-black uppercase tracking-wide text-white">
            {{ isLoginMode ? 'Авторизация' : 'Создать аккаунт' }}
          </h2>
          <p class="text-slate-400 text-xs">
            {{ isLoginMode ? 'Введите свои данные для входа в панель' : 'Заполните поля для регистрации на портале' }}
          </p>
        </div>

        <div v-if="errorMessage" class="bg-red-950/40 border border-red-800 text-red-400 p-3 rounded-xl text-xs font-medium">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded-xl text-xs font-medium">
          {{ successMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <div v-if="!isLoginMode" class="space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Ваше имя</label>
            <input 
              v-model="formData.name"
              type="text" 
              required
              placeholder="Иван Иванов" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Логин</label>
            <input 
              v-model="formData.username"
              type="text" 
              required
              placeholder="admin" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Пароль</label>
            <input 
              v-model="formData.password"
              type="password" 
              required
              placeholder="••••••••" 
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <button 
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/10 flex items-center justify-center gap-2"
          >
            <span v-if="authStore.loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isLoginMode ? 'Войти в аккаунт' : 'Зарегистрироваться' }}</span>
          </button>
        </form>

      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const authStore = useAuthStore()

const isLoginMode = ref(true) // true = Вход, false = Регистрация
const errorMessage = ref('')
const successMessage = ref('')

const formData = reactive({
  username: '',
  password: '',
  name: ''
})

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (isLoginMode.value) {
    // ЛОГИКА ВХОДА
    const res = await authStore.login(formData.username, formData.password)
    if (res.success) {
      // Если вошел админ — кидаем в админку, если обычный юзер — на главную ленту
      if (authStore.user?.role === 'admin') {
        navigateTo('/admin/news')
      } else {
        navigateTo('/')
      }
    } else {
      errorMessage.value = res.error || 'Ошибка входа'
    }
  } else {
    // ЛОГИКА РЕГИСТРАЦИИ
    if (!formData.name) {
      errorMessage.value = 'Заполните поле имени!'
      return
    }
    
    const res = await authStore.register(formData.username, formData.password, formData.name)
    if (res.success) {
      successMessage.value = 'Регистрация успешна! Теперь вы можете войти.'
      isLoginMode.value = true // Переключаем форму на вкладку "Вход"
      formData.password = ''   // Сбрасываем пароль для безопасности
    } else {
      errorMessage.value = res.error || 'Ошибка регистрации'
    }
  }
}
</script>