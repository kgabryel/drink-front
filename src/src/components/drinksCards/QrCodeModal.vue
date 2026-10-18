<script setup lang="ts">
import type { Ref } from 'vue';

import { useClipboard } from '@composables/useClipboard';
import messages from '@config/messages';
import modalConfig from '@config/modal-config';
import QrcodeVue from 'qrcode.vue';

// interfaces
interface Props {
  url: string;
}

// setup
defineProps<Props>();

const model: Ref<boolean> = defineModel<boolean>({ required: true });

// composables
const { copyToClipboard } = useClipboard();

// actions
function cancel(): void {
  model.value = false;
}
</script>

<template>
  <v-dialog
    v-model="model"
    :max-width="modalConfig.qrCode.maxWidth"
  >
    <v-card class="glass-background">
      <v-toolbar>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          type="button"
          @click="cancel"
        />
      </v-toolbar>
      <v-card-text class="text-center pb-0">
        <QrcodeVue
          :value="url"
          :size="modalConfig.qrCode.size"
          level="L"
          class="pb-5"
        />
        <p
          class="c-pointer"
          @click="copyToClipboard(url, messages.urlCopied)"
        >
          {{ url }}
        </p>
      </v-card-text>
      <v-divider />
    </v-card>
  </v-dialog>
</template>
