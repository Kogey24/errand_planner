<script setup>
defineProps({
  stats: { type: Object, required: true },
})
</script>

<template>
  <section class="grid grid-cols-2 gap-3 sm:grid-cols-5">
    <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <p class="text-2xl font-bold text-blue-600">{{ stats.total }}</p>
      <p class="mt-1 text-xs text-gray-500">Total errands</p>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <p class="text-2xl font-bold text-amber-600">{{ stats.dueToday }}</p>
      <p class="mt-1 text-xs text-gray-500">Due today</p>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <p class="text-2xl font-bold text-green-600">{{ stats.completed }}</p>
      <p class="mt-1 text-xs text-gray-500">Completed</p>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <p class="text-2xl font-bold text-red-500">{{ stats.highPriority }}</p>
      <p class="mt-1 text-xs text-gray-500">High priority</p>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <p class="text-base font-bold text-gray-900 dark:text-gray-100">
        {{ stats.estimatedTimeNeeded }}
      </p>
      <p class="mt-1 text-xs text-gray-500">Time needed</p>
    </div>
  </section>
</template>
