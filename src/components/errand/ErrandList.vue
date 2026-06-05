<script setup>
import ErrandCard from './ErrandCard.vue'
import { useErrandStore } from '@/stores/errandStore'

defineProps({ errands: { type: Array, required: true } })

const emit = defineEmits(['edit'])
const store = useErrandStore()
</script>

<template>
  <div>
    <p v-if="errands.length === 0" class="py-10 text-center text-sm text-gray-400">
      No errands here yet.
    </p>
    <div v-else class="space-y-3">
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
