<script setup>
import { computed, ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useErrandStore } from '@/stores/errandStore'
import AddErrandForm from '@/components/errand/AddErrandForm.vue'
import ErrandList from '@/components/errand/ErrandList.vue'
import FilterTabs from '@/components/errand/FilterTabs.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { FILTER } from '@/utils/priorityUtils'

const store = useErrandStore()
const filter = ref(FILTER.pending)
const showModal = ref(false)
const editing = ref(null)

const filteredErrands = computed(() => store.filteredErrands(filter.value))

function openAdd() {
  editing.value = null
  showModal.value = true
}

function openEdit(errand) {
  editing.value = errand
  showModal.value = true
}

function handleSubmit(data) {
  if (editing.value) {
    store.updateErrand(editing.value.id, data)
  } else {
    store.addErrand(data)
  }
  showModal.value = false
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between gap-3">
      <div>
        <h2 class="text-2xl font-bold">Errands</h2>
        <p class="mt-1 text-sm text-gray-500">
          Active errands are automatically sorted by urgency.
        </p>
      </div>
      <BaseButton @click="openAdd">
        <Plus class="h-4 w-4" aria-hidden="true" />
        Add
      </BaseButton>
    </div>

    <FilterTabs v-model="filter" />

    <div class="flex items-center justify-between gap-3 text-sm text-gray-400">
      <span>{{ filteredErrands.length }} errands</span>
      <span>Overdue, today, priority, then no deadline</span>
    </div>

    <ErrandList :errands="filteredErrands" @edit="openEdit" />

    <BaseModal
      :open="showModal"
      :title="editing ? 'Edit Errand' : 'New Errand'"
      @close="showModal = false"
    >
      <AddErrandForm
        :initial="editing"
        @submit="handleSubmit"
        @cancel="showModal = false"
      />
    </BaseModal>
  </div>
</template>
