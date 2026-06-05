<script setup>
import { CheckCircle2, Home, ListTodo } from 'lucide-vue-next'

const links = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/errands', label: 'Errands', icon: ListTodo },
  { to: '/completed', label: 'Completed', icon: CheckCircle2 },
]
</script>

<template>
  <nav class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
    <ul class="mx-auto flex max-w-3xl px-4">
      <li v-for="link in links" :key="link.to">
        <RouterLink
          :to="link.to"
          class="flex items-center gap-1.5 border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 transition hover:text-blue-600 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
          exact-active-class="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
        >
          <component :is="link.icon" class="h-4 w-4" aria-hidden="true" />
          <span class="hidden sm:inline">{{ link.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
