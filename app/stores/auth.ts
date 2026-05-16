// app/stores/auth.ts
import { defineStore } from 'pinia'

// Описываем форму структуры данных пользователя
interface UserSession {
  name: string
  role: string
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    // Дефолтный админ, который создается при первом старте приложения
    let savedUsers = [{ username: 'admin', password: 'admin123', name: 'Администратор', role: 'admin' }]
    
    // Безопасная проверка localStorage на стороне клиента
    if (import.meta.client) {
      const localUsers = localStorage.getItem('registered_users')
      if (localUsers) {
        savedUsers = JSON.parse(localUsers)
      } else {
        localStorage.setItem('registered_users', JSON.stringify(savedUsers))
      }
    }

    return {
      users: savedUsers,
      // Восстанавливаем сессию активного юзера из localStorage с явным приведением типов
      user: (import.meta.client && localStorage.getItem('admin_token'))
        ? (JSON.parse(localStorage.getItem('current_user_data') || '{"name": "Администратор", "role": "admin"}') as UserSession)
        : null as UserSession | null,
      loading: false
    }
  },

  getters: {
    // Явно указываем, что геттер возвращает boolean тип, чтобы у Navbar не было ошибок
    isAuthenticated: (state): boolean => !!state.user
  },

  actions: {
    // Логика авторизации
    async login(username: string, password: string) {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 600))

      const foundUser = this.users.find(u => u.username === username && u.password === password)

      if (foundUser) {
        this.user = { name: foundUser.name, role: foundUser.role }
        if (import.meta.client) {
          localStorage.setItem('admin_token', 'true')
          localStorage.setItem('current_user_data', JSON.stringify(this.user))
        }
        this.loading = false
        return { success: true }
      } else {
        this.loading = false
        return { success: false, error: 'Неверный логин или пароль!' }
      }
    },

    // Логика регистрации новых пользователей
    async register(username: string, password: string, name: string) {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 800))

      const isExist = this.users.some(u => u.username === username)
      if (isExist) {
        this.loading = false
        return { success: false, error: 'Этот логин уже занят!' }
      }

      // Все новые учетные записи по умолчанию получают роль 'user'
      const newUser = { username, password, name, role: 'user' }
      this.users.push(newUser)

      if (import.meta.client) {
        localStorage.setItem('registered_users', JSON.stringify(this.users))
      }

      this.loading = false
      return { success: true }
    },

    // Выход из профиля
    logout() {
      this.user = null
      if (import.meta.client) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('current_user_data')
      }
    }
  }
})