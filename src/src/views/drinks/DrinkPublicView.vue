<script setup lang="ts">
import PublicDrink from '@components/drinks/PublicDrink.vue';
import LoadingSpinner from '@components/layout/LoadingSpinner.vue';
import { useDrinkPublicView } from '@composables/drinks/useDrinkPublicView';
import { onMounted } from 'vue';

// composables
const { drink, load } = useDrinkPublicView();

// lifecycle
onMounted(load);
</script>

<template>
  <LoadingSpinner v-if="drink === undefined" />
  <div
    v-else
    class="h-100 d-grid align-center align-content-center"
  >
    <PublicDrink :drink="drink" />
  </div>
</template>
