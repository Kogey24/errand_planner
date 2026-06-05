<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useErrands } from '@/composables/useErrands'
import AddErrandForm from '@/components/errand/AddErrandForm.vue'
import ErrandList from '@/components/errand/ErrandList.vue'
import StatsPanel from '@/components/errand/StatsPanel.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const { store, stats } = useErrands()
const showModal = ref(false)
const editing = ref(null)

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
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
      <div>
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <p class="mt-1 text-sm text-gray-500">
          What needs attention today.
        </p>
      </div>
      <BaseButton @click="openAdd">
        <Plus class="h-4 w-4" aria-hidden="true" />
        Add Errand
      </BaseButton>
    </div>

    <StatsPanel :stats="stats" />

    <section class="space-y-3">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-lg font-semibold">Today</h3>
        <span class="text-sm text-gray-400">{{ store.todayErrands.length }} errands</span>
      </div>
      <ErrandList :errands="store.todayErrands" @edit="openEdit" />
    </section>

    <section v-if="store.todayErrands.length === 0 && store.pending.length" class="space-y-3">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-lg font-semibold">Next Up</h3>
        <span class="text-sm text-gray-400">Auto-sorted</span>
      </div>
      <ErrandList :errands="store.pending.slice(0, 3)" @edit="openEdit" />
    </section>

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
