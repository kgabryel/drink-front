<script setup lang="ts">
import { useTagCreate } from '@composables/tags/useTagCreate';
import lengths from '@config/lengths';

// setup
const maxLength: number = lengths.tag;

// composables
const { create, formErrors, state, valid } = useTagCreate();
</script>

<template>
  <div class="content-container px-2">
    <div class="glass-background my-2 pa-2 pt-3">
      <div class="d-flex pt-1">
        <v-text-field
          v-model="state.name"
          :counter="maxLength"
          :error-messages="formErrors"
          :maxlength="maxLength"
          class="mb-2 mt-2 mr-2"
          label="Nazwa"
          required
        />
        <v-switch
          v-model="state.publicTag"
          class="mt-1 ml-2"
          label="Publiczny"
        />
      </div>
      <v-btn
        :disabled="!valid"
        block
        class="glass-background"
        type="button"
        @click="create"
      >
        Dodaj
      </v-btn>
    </div>
  </div>
</template>
