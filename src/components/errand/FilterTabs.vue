<script setup>
import { FILTER } from '@/utils/priorityUtils'

defineProps({
  modelValue: { type: String, default: FILTER.all },
})

const emit = defineEmits(['update:modelValue'])

const filters = [
  { value: FILTER.all, label: 'All' },
  { value: FILTER.today, label: 'Today' },
  { value: FILTER.high, label: 'High Priority' },
  { value: FILTER.completed, label: 'Completed' },
  { value: FILTER.pending, label: 'Pending' },
]
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="filter in filters"
      :key="filter.value"
      type="button"
      :class="[
        'rounded-lg px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500',
        modelValue === filter.value
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
      ]"
      @click="emit('update:modelValue', filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>
