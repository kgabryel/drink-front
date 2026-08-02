<script setup lang="ts">
import type { Ref } from 'vue';

import modalConfig from '@config/modal-config';

// interfaces
interface Events {
  (e: 'remove'): void;
}

// setup
const emit: Events = defineEmits<Events>();

const model: Ref<boolean> = defineModel<boolean>({ required: true });

// actions
function remove(): void {
  emit('remove');
}

function cancel(): void {
  model.value = false;
}
</script>

<template>
  <v-dialog v-model="model" :max-width="modalConfig.delete.maxWidth">
    <v-card class="glass-background">
      <v-toolbar>
        <v-toolbar-title>Czy na pewno?</v-toolbar-title>
        <v-btn icon="mdi-close" type="button" @click="cancel" />
      </v-toolbar>
      <v-card-text class="text-center pb-0 pt-0">
        <v-icon class="rotate" color="error">mdi-close</v-icon>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn class="glass-background red-glass flex-1-1" type="button" @click="remove">Tak</v-btn>
        <v-btn class="glass-background flex-1-1" type="button" @click="cancel">Nie</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.rotate {
  animation-duration: 3s;
  animation-name: spin;
  font-size: 100px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
