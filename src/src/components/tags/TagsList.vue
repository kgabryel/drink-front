<script setup lang="ts">
import { useTagsFilter } from '@composables/tags/useTagsFilter';

import TagContainer from './TagContainer.vue';

// composables
const { filteredTags } = useTagsFilter();
</script>

<template>
  <div class="content-container px-2">
    <v-list v-if="filteredTags.length > 0" class="glass-background">
      <TagContainer v-for="tag in filteredTags" :key="tag.id" :tag="tag" class="pt-2" />
    </v-list>
  </div>
</template>
