import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CATEGORY, PRIORITY } from '@/utils/priorityUtils'

const THEME = Object.freeze({
  light: 'light',
  dark: 'dark',
})

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === THEME.dark)
}

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref(THEME.light)
  const defaultPriority = ref(PRIORITY.medium)
  const defaultCategory = ref(CATEGORY.other)

  function toggleTheme() {
    theme.value = theme.value === THEME.light ? THEME.dark : THEME.light
    applyTheme(theme.value)
  }

  return { theme, defaultPriority, defaultCategory, toggleTheme }
}, {
  persist: true,
})
