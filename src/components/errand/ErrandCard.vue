<script setup>
import { computed } from 'vue'
import { Calendar, Check, Clock3, MapPin, Pencil, Trash2 } from 'lucide-vue-next'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  CATEGORY_LABELS,
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  STATUS,
  STATUS_LABELS,
  dueDateLabel,
  formatEstimate,
  isOverdue,
} from '@/utils/priorityUtils'

const props = defineProps({ errand: { type: Object, required: true } })
const emit = defineEmits(['complete', 'delete', 'edit'])

const priorityColor = computed(() => PRIORITY_COLORS[props.errand.priority] ?? 'gray')
const priorityLabel = computed(() => PRIORITY_LABELS[props.errand.priority] ?? props.errand.priority)
const categoryLabel = computed(() => CATEGORY_LABELS[props.errand.category] ?? props.errand.category)
const overdue = computed(() => isOverdue(props.errand))
const estimate = computed(() => formatEstimate(props.errand.estimatedMinutes))
const dateLabel = computed(() => dueDateLabel(props.errand))
</script>

<template>
  <article
    :class="[
      'rounded-lg border bg-white p-3 shadow-sm transition sm:p-4 dark:bg-gray-800',
      overdue ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700',
      errand.status === STATUS.done && 'opacity-70',
    ]"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0 flex-1">
        <div class="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <h3
            :class="[
              'min-w-0 break-words text-base font-semibold leading-snug sm:truncate',
              errand.status === STATUS.done && 'text-gray-400 line-through',
            ]"
          >
            {{ errand.title }}
          </h3>
          <BaseBadge :color="priorityColor">
            {{ priorityLabel }} priority
          </BaseBadge>
        </div>

        <div class="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-500 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 dark:text-gray-300">
          <span
            v-if="errand.location"
            class="inline-flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0 dark:bg-gray-700/70 sm:dark:bg-transparent"
          >
            <MapPin class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span class="min-w-0 truncate">{{ errand.location }}</span>
          </span>
          <span
            :class="[
              'inline-flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0 dark:bg-gray-700/70 sm:dark:bg-transparent',
              overdue && 'font-semibold text-red-500',
            ]"
          >
            <Calendar class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span class="min-w-0 truncate">{{ dateLabel }}</span>
          </span>
          <span class="inline-flex min-w-0 items-center gap-2 rounded-lg bg-gray-50 px-2.5 py-2 sm:bg-transparent sm:px-0 sm:py-0 dark:bg-gray-700/70 sm:dark:bg-transparent">
            <Clock3 class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span class="min-w-0 truncate">{{ estimate }}</span>
          </span>
        </div>

        <div class="mt-2 flex flex-wrap items-center gap-2">
          <BaseBadge color="gray">
            {{ categoryLabel }}
          </BaseBadge>
          <BaseBadge :color="errand.status === STATUS.done ? 'green' : 'blue'">
            {{ STATUS_LABELS[errand.status] }}
          </BaseBadge>
        </div>

        <p v-if="errand.notes" class="mt-2 text-sm text-gray-500 dark:text-gray-300">
          {{ errand.notes }}
        </p>
      </div>

      <div class="flex w-full items-center gap-2 border-t border-gray-100 pt-3 sm:w-auto sm:flex-shrink-0 sm:border-t-0 sm:pt-0 dark:border-gray-700">
        <BaseButton
          v-if="errand.status !== STATUS.done"
          class="min-w-0 flex-1 whitespace-nowrap sm:flex-none"
          size="sm"
          variant="secondary"
          @click="emit('complete', errand.id)"
        >
          <Check class="h-4 w-4" aria-hidden="true" />
          Mark Done
        </BaseButton>
        <button
          type="button"
          class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700"
          aria-label="Edit errand"
          @click="emit('edit', errand)"
        >
          <Pencil class="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 dark:hover:bg-gray-700"
          aria-label="Delete errand"
          @click="emit('delete', errand.id)"
        >
          <Trash2 class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </article>
</template>
