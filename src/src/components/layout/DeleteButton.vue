<script setup lang="ts">
import { useRemoveConfirm } from '@composables/layout/useRemoveConfirm';

import DeleteModal from './DeleteModal.vue';

// interfaces
interface Events {
  (e: 'remove'): void;
}

// setup
const emit: Events = defineEmits<Events>();

// composables
const { remove, showed, showModal } = useRemoveConfirm(emit);
</script>

<template>
  <v-btn class="text-center glass-background red-glass" type="button" @click="showModal">
    <v-icon class="mr-3 icon">mdi-delete</v-icon>
    Usuń
  </v-btn>
  <DeleteModal v-model="showed" @remove="remove" />
</template>
