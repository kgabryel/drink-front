<script setup lang="ts">
import type { Tag } from '@/api/response';

// interfaces
interface Props {
  anyTag: boolean;
  shuffleAvailable: boolean;
  tags: Tag[];
  selectedTags: number[];
}

interface Events {
  (e: 'back' | 'clear' | 'shuffle'): void;
  (e: 'switch-tag', id: number): void;
  (e: 'update:anyTag', value: boolean): void;
}

// setup
defineProps<Props>();
const emit: Events = defineEmits<Events>();

// actions
function back(): void {
  emit('back');
}

function clear(): void {
  emit('clear');
}

function shuffle(): void {
  emit('shuffle');
}

function switchTag(id: number): void {
  emit('switch-tag', id);
}

function updateAnyTag(value: boolean | null): void {
  emit('update:anyTag', value ?? false);
}
</script>

<template>
  <v-switch
    :model-value="anyTag"
    class="ml-1 mr-4"
    label="Dowolny tag"
    @update:model-value="updateAnyTag"
  />
  <v-btn
    v-for="tag in tags"
    :key="tag.id"
    :class="{ 'blue-glass': selectedTags.includes(tag.id) }"
    class="mx-1 my-1 glass-background"
    elevation="2"
    type="button"
    @click="switchTag(tag.id)"
  >
    {{ tag.name }}
  </v-btn>
  <slot name="stats" />
  <div class="d-flex justify-space-between mt-2 mb-2">
    <v-btn
      class="glass-background"
      type="button"
      @click="back"
    >
      Powrót
    </v-btn>
    <v-btn
      :disabled="!shuffleAvailable"
      class="glass-background blue-glass"
      type="button"
      @click="shuffle"
    >
      Losuj
    </v-btn>
    <v-btn
      class="glass-background"
      type="button"
      @click="clear"
    >
      Wyczyść tagi
    </v-btn>
  </div>
</template>
