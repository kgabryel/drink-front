<script setup lang="ts">
import { useAccountSettings } from '@composables/account/useAccountSettings';
import lengths from '@config/lengths';

// setup
const maxKeyLength: number = lengths.key;

// composables
const { onlyAvailable, ozaKey, switchOnlyAvailable, updateOzaKey } = useAccountSettings();
</script>

<template>
  <div class="content-container px-2 glass-background text-center">
    <h2>Ustawienia</h2>
    <v-switch
      :model-value="onlyAvailable"
      class="ml-1 mr-4"
      label="Domyślnie tylko dostępne"
      @update:model-value="switchOnlyAvailable"
    />
    <div class="d-flex">
      <v-text-field
        v-model="ozaKey"
        :counter="maxKeyLength"
        class="mt-2"
        label="Klucz OZA"
      />
      <v-btn
        icon="mdi-content-save"
        type="button"
        @click="updateOzaKey"
      />
    </div>
  </div>
</template>
