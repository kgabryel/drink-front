<script setup lang="ts">
import { useGenerateKeyButton } from '@composables/account/useGenerateKeyButton';

// composables
const { generateKey } = useGenerateKeyButton();
</script>

<template>
  <v-btn
    block
    class="text-center glass-background"
    type="button"
    @click="generateKey"
  >
    <v-icon class="mr-3 icon">mdi-key</v-icon>
    Generuj klucz
  </v-btn>
</template>
