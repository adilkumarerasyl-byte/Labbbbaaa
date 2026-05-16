<!-- components/ui/Toast.vue -->
<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
    <TransitionGroup name="list">
      <div 
        v-for="toast in store.toasts" 
        :key="toast.id"
        :class="toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'"
        class="text-white px-4 py-3 rounded-lg shadow-lg font-medium flex items-center gap-2 min-w-[250px]"
      >
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNewsStore } from '~/stores/news'
const store = useNewsStore()
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(30px); }
.list-leave-to { opacity: 0; transform: translateX(30px); }
</style>