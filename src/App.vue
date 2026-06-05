<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const settings = useSettingsStore()

onMounted(() => {
  document.documentElement.classList.toggle('dark', settings.theme === 'dark')
})
</script>

<template>
  <DefaultLayout />
</template>
