<script setup lang="ts">
// interfaces
interface Events {
  (e: 'select-all'): void;
  (e: 'next'): void;
  (e: 'deselect-all'): void;
}

interface Props {
  selectedCount: number;
  visibleCount: number;
}

// setup
defineProps<Props>();
const emit: Events = defineEmits<Events>();

// actions
function onSelectAll(): void {
  emit('select-all');
}

function onNext(): void {
  emit('next');
}

function onDeselectAll(): void {
  emit('deselect-all');
}
</script>

<template>
  <div class="d-flex justify-space-between mt-2 mb-2 action-container">
    <v-btn
      class="glass-background mt-2"
      type="button"
      :class="{ 'd-none': visibleCount === 0 }"
      :disabled="selectedCount === visibleCount"
      @click="onSelectAll"
    >
      Zaznacz wszystkie
    </v-btn>
    <v-btn class="glass-background blue-glass mt-2" type="button" @click="onNext">Dalej</v-btn>
    <v-btn
      class="glass-background mt-2"
      type="button"
      :class="{ 'd-none': visibleCount === 0 }"
      :disabled="selectedCount === 0"
      @click="onDeselectAll"
    >
      Odznacz wszystkie
    </v-btn>
  </div>
</template>

<style scoped>
@media screen and (width <= 550px) {
  .action-container {
    flex-direction: column;
  }
}
</style>
