import { computed } from 'vue'
import { sortByUrgency } from '@/utils/priorityUtils'

export function usePriority(errands) {
  const sorted = computed(() => sortByUrgency(errands.value))
  return { sorted }
}
