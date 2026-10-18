<script setup lang="ts">
import TooltipIconButton from '@components/layout/TooltipIconButton.vue';
import { useRemoveConfirm } from '@composables/layout/useRemoveConfirm';

import DeleteModal from './DeleteModal.vue';

// interfaces
type Events = (e: 'remove') => void;

// setup
const emit: Events = defineEmits<Events>();

// composables
const { remove, showed, showModal } = useRemoveConfirm(emit);
</script>

<template>
  <TooltipIconButton
    icon="mdi-delete"
    tooltip="Usuń"
    @click="showModal"
  />
  <DeleteModal
    v-model="showed"
    @remove="remove"
  />
</template>
