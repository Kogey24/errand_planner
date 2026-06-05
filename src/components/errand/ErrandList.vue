<script setup>
import ErrandCard from './ErrandCard.vue'
import { useErrandStore } from '@/stores/errandStore'

defineProps({ errands: { type: Array, required: true } })

const emit = defineEmits(['edit'])
const store = useErrandStore()
</script>

<template>
  <div class="min-w-0">
    <p v-if="errands.length === 0" class="rounded-lg border border-dashed border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-800">
      No errands here yet.
    </p>
    <div v-else class="space-y-3 sm:space-y-4">
      <ErrandCard
        v-for="errand in errands"
        :key="errand.id"
        :errand="errand"
        @complete="store.completeErrand"
        @delete="store.deleteErrand"
        @edit="emit('edit', $event)"
      />
    </div>
  </div>
</template>
