<script setup lang="ts">
import type { SearchStore } from '@store/search';

import TagCreateForm from '@components/tags/TagCreateForm.vue';
import TagsSearch from '@components/tags/TagSearch.vue';
import TagsList from '@components/tags/TagsList.vue';

import { useSearchStore } from '@/store';

// setup
const searchStore: SearchStore = useSearchStore();
</script>

<template>
  <TagCreateForm />
  <TagsList />
  <v-dialog v-model="searchStore.isOpen">
    <TagsSearch class="glass-background--light pa-2" />
  </v-dialog>
</template>
