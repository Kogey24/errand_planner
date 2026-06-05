<script setup>
import { reactive, watch } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useSettingsStore } from '@/stores/settingsStore'
import {
  CATEGORIES,
  CATEGORY_LABELS,
  PRIORITIES,
  PRIORITY_LABELS,
  todayDateKey,
} from '@/utils/priorityUtils'

const props = defineProps({
  initial: { type: Object, default: null },
})

const emit = defineEmits(['submit', 'cancel'])

const settings = useSettingsStore()

const form = reactive({
  title: '',
  location: '',
  priority: settings.defaultPriority,
  dueDate: todayDateKey(),
  estimatedMinutes: 30,
  category: settings.defaultCategory,
  notes: '',
})

const priorityOptions = PRIORITIES.map((value) => ({
  value,
  label: PRIORITY_LABELS[value],
}))

const categoryOptions = CATEGORIES.map((value) => ({
  value,
  label: CATEGORY_LABELS[value],
}))

function resetForm(initial = null) {
  form.title = initial?.title ?? ''
  form.location = initial?.location ?? ''
  form.priority = initial?.priority ?? settings.defaultPriority
  form.dueDate = initial?.dueDate ?? todayDateKey()
  form.estimatedMinutes = initial?.estimatedMinutes ?? 30
  form.category = initial?.category ?? settings.defaultCategory
  form.notes = initial?.notes ?? ''
}

watch(() => props.initial, resetForm, { immediate: true })

watch(
  () => [settings.defaultCategory, settings.defaultPriority],
  () => {
    if (!props.initial) resetForm()
  },
)

function handleSubmit() {
  if (!form.title.trim()) return

  emit('submit', {
    title: form.title,
    location: form.location,
    priority: form.priority,
    dueDate: form.dueDate || null,
    estimatedMinutes: form.estimatedMinutes,
    category: form.category,
    notes: form.notes,
  })

  if (!props.initial) resetForm()
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium" for="errand-title">
        Task
      </label>
      <input
        id="errand-title"
        v-model="form.title"
        type="text"
        placeholder="Buy groceries"
        class="w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      >
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium" for="errand-location">
        Location
      </label>
      <input
        id="errand-location"
        v-model="form.location"
        type="text"
        placeholder="Naivas"
        class="w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      >
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-medium" for="errand-priority">
          Priority
        </label>
        <select
          id="errand-priority"
          v-model="form.priority"
          class="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
        >
          <option
            v-for="priority in priorityOptions"
            :key="priority.value"
            :value="priority.value"
          >
            {{ priority.label }}
          </option>
        </select>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="errand-category">
          Category
        </label>
        <select
          id="errand-category"
          v-model="form.category"
          class="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
        >
          <option
            v-for="category in categoryOptions"
            :key="category.value"
            :value="category.value"
          >
            {{ category.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label class="mb-1 block text-sm font-medium" for="errand-due-date">
          Due date
        </label>
        <input
          id="errand-due-date"
          v-model="form.dueDate"
          type="date"
          class="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
        >
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium" for="errand-estimate">
          Estimated time
        </label>
        <input
          id="errand-estimate"
          v-model.number="form.estimatedMinutes"
          type="number"
          min="0"
          step="5"
          class="w-full rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
        >
      </div>
    </div>

    <div>
      <label class="mb-1 block text-sm font-medium" for="errand-notes">
        Notes
      </label>
      <textarea
        id="errand-notes"
        v-model="form.notes"
        rows="2"
        placeholder="Optional notes..."
        class="w-full resize-none rounded-lg border px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
      />
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <BaseButton type="button" variant="secondary" @click="emit('cancel')">
        Cancel
      </BaseButton>
      <BaseButton type="submit" variant="primary">
        {{ initial ? 'Save Changes' : 'Add Errand' }}
      </BaseButton>
    </div>
  </form>
</template>
