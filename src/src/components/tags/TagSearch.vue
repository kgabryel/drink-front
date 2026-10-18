<script setup lang="ts">
import { useTagSearch } from '@composables/tags/useTagSearch';
import lengths from '@config/lengths';
import { onMounted } from 'vue';

// setup
const maxLength: number = lengths.tag;

// composables
const { clear, close, draft, search, searchIfModified } = useTagSearch();

// lifecycle
onMounted(searchIfModified);
</script>

<template>
  <div>
    <div class="d-flex ga-2">
      <v-btn
        class="glass-background flex-1-1"
        type="button"
        @click="clear"
      >
        Wyczyść
      </v-btn>
      <v-btn
        class="glass-background flex-1-1"
        type="button"
        @click="close"
      >
        Zamknij
      </v-btn>
    </div>
    <v-text-field
      v-model="draft.name"
      :maxlength="maxLength"
      class="mb-2 mt-3 pt-1"
      label="Nazwa"
      required
    />
    <v-btn
      class="glass-background w-100"
      type="button"
      @click="search"
    >
      Szukaj
    </v-btn>
  </div>
</template>
