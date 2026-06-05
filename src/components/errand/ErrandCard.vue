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
      'rounded-lg border bg-white p-4 shadow-sm transition dark:bg-gray-800',
      overdue ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700',
      errand.status === STATUS.done && 'opacity-70',
    ]"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h3
            :class="[
              'truncate text-base font-semibold',
              errand.status === STATUS.done && 'text-gray-400 line-through',
            ]"
          >
            {{ errand.title }}
          </h3>
          <BaseBadge :color="priorityColor">
            {{ priorityLabel }} priority
          </BaseBadge>
        </div>

        <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-300">
          <span v-if="errand.location" class="inline-flex items-center gap-1">
            <MapPin class="h-4 w-4" aria-hidden="true" />
            {{ errand.location }}
          </span>
          <span
            :class="[
              'inline-flex items-center gap-1',
              overdue && 'font-semibold text-red-500',
            ]"
          >
            <Calendar class="h-4 w-4" aria-hidden="true" />
            {{ dateLabel }}
          </span>
          <span class="inline-flex items-center gap-1">
            <Clock3 class="h-4 w-4" aria-hidden="true" />
            {{ estimate }}
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

      <div class="flex flex-shrink-0 items-center gap-1">
        <BaseButton
          v-if="errand.status !== STATUS.done"
          size="sm"
          variant="secondary"
          @click="emit('complete', errand.id)"
        >
          <Check class="h-4 w-4" aria-hidden="true" />
          Mark Done
        </BaseButton>
        <button
          type="button"
          class="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700"
          aria-label="Edit errand"
          @click="emit('edit', errand)"
        >
          <Pencil class="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 dark:hover:bg-gray-700"
          aria-label="Delete errand"
          @click="emit('delete', errand.id)"
        >
          <Trash2 class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </article>
</template>
