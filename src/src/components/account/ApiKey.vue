<script setup lang="ts">
import type { ApiKey } from '@models/store/api-key';
import type { Ref } from 'vue';

import DeleteButton from '@components/layout/DeleteButton.vue';
import { useApiKey } from '@composables/account/useApiKey';
import { useClipboard } from '@composables/useClipboard';
import messages from '@config/messages';
import { ref, toRef } from 'vue';

// interfaces
interface Props {
  apiKey: ApiKey;
}

// setup
const props: Props = defineProps<Props>();

// state
const active: Ref<boolean> = ref(props.apiKey.active);

// composables
const { copyToClipboard } = useClipboard();
const { remove, switchKey } = useApiKey(toRef(props, 'apiKey'));
</script>

<template>
  <div class="pa-2">
    <p class="mb-1">{{ apiKey.key }}</p>
    <div class="active-small mb-2 justify-center">
      <v-switch v-model="active" class="mt-0" label="Aktywny" @update:model-value="switchKey" />
    </div>
    <div class="d-flex justify-space-between align-center actions">
      <v-btn
        class="text-center glass-background"
        type="button"
        @click="copyToClipboard(apiKey.key, messages.apiKeyCopied)"
      >
        <v-icon class="mr-3 icon">mdi-content-copy</v-icon>
        Kopiuj
      </v-btn>
      <div class="active-big">
        <v-switch v-model="active" class="mt-0" label="Aktywny" @update:model-value="switchKey" />
      </div>
      <DeleteButton @remove="remove" />
    </div>
  </div>
</template>

<style scoped>
p {
  overflow-wrap: break-word;
}

.active-small {
  display: none;
}

@media screen and (width <= 400px) {
  .active-big {
    display: none;
  }

  .active-small {
    display: flex;
  }
}
</style>
