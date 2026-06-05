import { computed } from 'vue'
import { useErrandStore } from '@/stores/errandStore'
import { formatEstimate } from '@/utils/priorityUtils'

export function useErrands() {
  const store = useErrandStore()

  const stats = computed(() => ({
    total: store.allErrands.length,
    pending: store.pending.length,
    completed: store.completed.length,
    overdue: store.overdue.length,
    dueToday: store.todayErrands.length,
    highPriority: store.highPriority.length,
    estimatedMinutesNeeded: store.estimatedMinutesNeeded,
    estimatedTimeNeeded: formatEstimate(store.estimatedMinutesNeeded),
    completionRate: store.allErrands.length
      ? Math.round((store.completed.length / store.allErrands.length) * 100)
      : 0,
  }))

  return { store, stats }
}
