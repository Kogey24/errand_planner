<script setup>
defineProps({
  color: { type: String, default: 'gray' },
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
      color === 'red' && 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      color === 'yellow' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      color === 'gray' && 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    ]"
  >
    <slot />
  </span>
</template>
