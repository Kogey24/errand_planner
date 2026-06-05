import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  CATEGORY,
  CATEGORIES,
  FILTER,
  PRIORITIES,
  PRIORITY,
  STATUS,
  STATUSES,
  isDueToday,
  isOverdue,
  sortByUrgency,
} from '@/utils/priorityUtils'

function ordered(items) {
  return [...items].sort((a, b) => a.order - b.order)
}

function normalizeErrandData(data = {}) {
  return {
    title: data.title?.trim() ?? '',
    location: data.location?.trim() ?? '',
    category: CATEGORIES.includes(data.category) ? data.category : CATEGORY.other,
    priority: PRIORITIES.includes(data.priority) ? data.priority : PRIORITY.medium,
    dueDate: data.dueDate || null,
    estimatedMinutes: Math.max(0, Number(data.estimatedMinutes) || 0),
    notes: data.notes?.trim() ?? '',
  }
}

function normalizeStoredErrand(errand, index = 0) {
  const status = STATUSES.includes(errand.status) ? errand.status : STATUS.pending
  return {
    id: errand.id ?? crypto.randomUUID(),
    status,
    order: Number.isInteger(errand.order) ? errand.order : index,
    createdAt: errand.createdAt ?? new Date().toISOString(),
    completedAt: status === STATUS.done ? (errand.completedAt ?? new Date().toISOString()) : null,
    ...normalizeErrandData(errand),
  }
}

export const useErrandStore = defineStore('errands', () => {
  const errands = ref([])

  const allErrands = computed(() =>
    ordered(errands.value.map(normalizeStoredErrand)),
  )

  const pending = computed(() =>
    sortByUrgency(allErrands.value.filter((errand) => errand.status === STATUS.pending)),
  )

  const completed = computed(() =>
    [...allErrands.value]
      .filter((errand) => errand.status === STATUS.done)
      .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? '')),
  )

  const overdue = computed(() =>
    pending.value.filter(isOverdue)
  )

  const todayErrands = computed(() =>
    pending.value.filter(isDueToday)
  )

  const highPriority = computed(() =>
    pending.value.filter((errand) => errand.priority === PRIORITY.high)
  )

  const estimatedMinutesNeeded = computed(() =>
    pending.value.reduce((total, errand) => total + errand.estimatedMinutes, 0)
  )

  const sortedActive = computed(() => pending.value)

  function nextOrder() {
    return errands.value.length
      ? Math.max(...errands.value.map((errand) => errand.order ?? 0)) + 1
      : 0
  }

  function addErrand(errandData) {
    errands.value.push({
      id: crypto.randomUUID(),
      status: STATUS.pending,
      order: nextOrder(),
      createdAt: new Date().toISOString(),
      completedAt: null,
      ...normalizeErrandData(errandData),
    })
  }

  function updateErrand(id, changes) {
    const index = errands.value.findIndex((errand) => errand.id === id)
    if (index !== -1) {
      errands.value[index] = {
        ...normalizeStoredErrand(errands.value[index], index),
        ...normalizeErrandData({
          ...errands.value[index],
          ...changes,
        }),
      }
    }
  }

  function completeErrand(id) {
    const index = errands.value.findIndex((errand) => errand.id === id)
    if (index !== -1) {
      errands.value[index] = {
        ...normalizeStoredErrand(errands.value[index], index),
        status: STATUS.done,
        completedAt: new Date().toISOString(),
      }
    }
  }

  function deleteErrand(id) {
    errands.value = errands.value.filter((errand) => errand.id !== id)
  }

  function filteredErrands(filter) {
    if (filter === FILTER.today) return todayErrands.value
    if (filter === FILTER.high) return highPriority.value
    if (filter === FILTER.completed) return completed.value
    if (filter === FILTER.pending) return pending.value
    return [...pending.value, ...completed.value]
  }

  function clearCompleted() {
    errands.value = errands.value.filter((errand) => errand.status !== STATUS.done)
  }

  return {
    errands,
    allErrands,
    pending,
    completed,
    sortedActive,
    overdue,
    todayErrands,
    highPriority,
    estimatedMinutesNeeded,
    addErrand,
    updateErrand,
    completeErrand,
    deleteErrand,
    filteredErrands,
    clearCompleted,
  }
}, {
  persist: true,
})
