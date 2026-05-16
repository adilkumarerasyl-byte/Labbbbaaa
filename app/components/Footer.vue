<template>
  <footer class="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
        
        <div class="lg:col-span-2 space-y-5">
          <NuxtLink to="/" class="text-xl font-black tracking-wider text-white flex items-center gap-2">
            <span class="bg-red-600 px-2 py-0.5 rounded text-sm uppercase text-white">Live</span>
            PULSE<span class="text-red-500">//</span>NEWS
          </NuxtLink>
          <p class="text-slate-400 leading-relaxed max-w-sm">
            Ваш независимый гид по миру технологий, веб-разработки, гейминга и главных мировых событий. Читайте только актуальное, оставайтесь на пульсе.
          </p>
          <div class="flex items-center gap-4 text-slate-500">
            <a href="#" class="hover:text-red-500 transition-colors" title="Telegram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/></svg>
            </a>
            <a href="#" class="hover:text-red-500 transition-colors" title="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48.005-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="#" class="hover:text-red-500 transition-colors" title="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">Разделы</h4>
          <ul class="space-y-2.5">
            <li><NuxtLink to="/" class="hover:text-white transition-colors">Главная лента</NuxtLink></li>
            <li><NuxtLink to="/categories" class="hover:text-white transition-colors">Все категории</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">О проекте</NuxtLink></li>
            <li><NuxtLink to="/admin/dashboard" class="hover:text-white transition-colors text-slate-500">CMS Панель</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">Тренды</h4>
          <ul class="space-y-2.5">
            <li><NuxtLink to="/categories?type=tech" class="hover:text-white transition-colors">Технологии</NuxtLink></li>
            <li><NuxtLink to="/categories?type=dev" class="hover:text-white transition-colors">Разработка</NuxtLink></li>
            <li><NuxtLink to="/categories?type=games" class="hover:text-white transition-colors">Игры и Железо</NuxtLink></li>
            <li><NuxtLink to="/categories?type=culture" class="hover:text-white transition-colors">Культура</NuxtLink></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-white">Рассылка</h4>
          <p class="text-slate-400 text-xs leading-relaxed">
            Получайте подборку лучших лонгридов недели прямо на почту. Никакого спама.
          </p>
          <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row lg:flex-col gap-2">
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="Ваш e-mail..." 
              class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
            />
            <button 
              type="submit" 
              class="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors flex-shrink-0"
            >
              Подписаться
            </button>
          </form>
        </div>

      </div>

      <div class="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {{ new Date().getFullYear() }} PULSE NEWS. Все права защищены.
        </div>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-slate-400 transition-colors">Политика конфиденциальности</a>
          <a href="#" class="hover:text-slate-400 transition-colors">Условия использования</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  if (email.value.trim()) {
    alert(`Email ${email.value} успешно добавлен в список рассылки!`)
    email.value = ''
  }
}
</script>