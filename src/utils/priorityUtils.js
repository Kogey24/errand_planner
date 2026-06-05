export const PRIORITY = Object.freeze({
  high: 'high',
  medium: 'medium',
  low: 'low',
})

export const PRIORITIES = Object.freeze([
  PRIORITY.high,
  PRIORITY.medium,
  PRIORITY.low,
])

export const STATUS = Object.freeze({
  pending: 'pending',
  done: 'done',
})

export const STATUSES = Object.freeze([
  STATUS.pending,
  STATUS.done,
])

export const FILTER = Object.freeze({
  all: 'all',
  today: 'today',
  high: 'high',
  completed: 'completed',
  pending: 'pending',
})

export const CATEGORY = Object.freeze({
  shopping: 'shopping',
  finance: 'finance',
  health: 'health',
  transport: 'transport',
  other: 'other',
})

export const CATEGORIES = Object.freeze([
  CATEGORY.shopping,
  CATEGORY.finance,
  CATEGORY.health,
  CATEGORY.transport,
  CATEGORY.other,
])

export const PRIORITY_WEIGHTS = {
  [PRIORITY.high]: 3,
  [PRIORITY.medium]: 2,
  [PRIORITY.low]: 1,
}

export const PRIORITY_LABELS = {
  [PRIORITY.high]: 'High',
  [PRIORITY.medium]: 'Medium',
  [PRIORITY.low]: 'Low',
}

export const PRIORITY_COLORS = {
  [PRIORITY.high]: 'red',
  [PRIORITY.medium]: 'yellow',
  [PRIORITY.low]: 'green',
}

export const STATUS_LABELS = {
  [STATUS.pending]: 'Planned',
  [STATUS.done]: 'Completed',
}

export const CATEGORY_LABELS = {
  [CATEGORY.shopping]: 'Shopping',
  [CATEGORY.finance]: 'Finance',
  [CATEGORY.health]: 'Health',
  [CATEGORY.transport]: 'Transport',
  [CATEGORY.other]: 'Other',
}

export function priorityWeight(errand) {
  return PRIORITY_WEIGHTS[errand.priority] ?? 0
}

export function todayDateKey(date = new Date()) {
  const localDate = new Date(date)
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
  return localDate.toISOString().split('T')[0]
}

export function isDueToday(errand) {
  return errand.dueDate === todayDateKey()
}

export function isOverdue(errand) {
  if (!errand.dueDate || errand.status === STATUS.done) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(`${errand.dueDate}T00:00:00`)
  return dueDate < today
}

export function dueDateLabel(errand) {
  if (!errand.dueDate) return 'No deadline'
  if (isOverdue(errand)) return 'Overdue'
  if (isDueToday(errand)) return 'Due today'
  return `Due ${errand.dueDate}`
}

export function urgencyRank(errand) {
  if (isOverdue(errand)) return 0
  if (isDueToday(errand)) return 1
  if (!errand.dueDate) return 5
  if (errand.priority === PRIORITY.high) return 2
  if (errand.priority === PRIORITY.medium) return 3
  return 4
}

export function sortByUrgency(errands) {
  return [...errands].sort((a, b) => {
    return (
      urgencyRank(a) - urgencyRank(b) ||
      priorityWeight(b) - priorityWeight(a) ||
      (a.dueDate ?? '9999-12-31').localeCompare(b.dueDate ?? '9999-12-31') ||
      a.order - b.order
    )
  })
}

export function formatEstimate(minutes) {
  const totalMinutes = Number(minutes) || 0
  if (totalMinutes <= 0) return '0 mins'

  const hours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  if (!hours) return `${remainingMinutes} mins`
  if (!remainingMinutes) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} mins`
}
