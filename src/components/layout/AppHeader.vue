<script setup>
import { ClipboardList, Moon, Sun } from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settingsStore'

const settings = useSettingsStore()
</script>

<template>
  <header class="bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
    <div class="mx-auto flex max-w-3xl items-center justify-between">
      <div class="flex items-center gap-2">
        <ClipboardList class="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <h1 class="text-lg font-bold tracking-tight">Errand Planner</h1>
      </div>
      <button
        type="button"
        class="rounded-full p-2 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700"
        :aria-label="settings.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="settings.toggleTheme"
      >
        <Sun v-if="settings.theme === 'dark'" class="h-5 w-5" aria-hidden="true" />
        <Moon v-else class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </header>
</template>
