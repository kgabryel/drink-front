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
  <v-tooltip>
    <template #activator="{ props: activatorProps }">
      <v-btn color="black" icon type="button" v-bind="activatorProps" @click="showModal">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <span>Usuń</span>
  </v-tooltip>
  <DeleteModal v-model="showed" @remove="remove" />
</template>
