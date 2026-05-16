// app/middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // Если пользователь не авторизован ИЛИ его роль не 'admin'
  if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
    // Всплывающее уведомление в консоли для дебага
    console.warn('Доступ запрещен: у вас нет прав администратора!')
    
    // Перенаправляем на главную страницу
    return navigateTo('/')
  }
})