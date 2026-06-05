<script setup>
import { ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import { useErrandStore } from '@/stores/errandStore'
import AddErrandForm from '@/components/errand/AddErrandForm.vue'
import ErrandList from '@/components/errand/ErrandList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const store = useErrandStore()
const showModal = ref(false)
const editing = ref(null)

function openEdit(errand) {
  editing.value = errand
  showModal.value = true
}

function handleSubmit(data) {
  if (editing.value) {
    store.updateErrand(editing.value.id, data)
  }
  showModal.value = false
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between gap-3">
      <div>
        <h2 class="text-2xl font-bold">Completed</h2>
        <p class="mt-1 text-sm text-gray-500">
          Errands you have already handled.
        </p>
      </div>
      <BaseButton
        v-if="store.completed.length"
        variant="danger"
        size="sm"
        @click="store.clearCompleted"
      >
        <Trash2 class="h-4 w-4" aria-hidden="true" />
        Clear All
      </BaseButton>
    </div>

    <ErrandList :errands="store.completed" @edit="openEdit" />

    <BaseModal
      :open="showModal"
      title="Edit Completed Errand"
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
