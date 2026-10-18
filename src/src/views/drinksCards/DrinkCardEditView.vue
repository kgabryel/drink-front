<script setup lang="ts">
import DrinkCardEditForm from '@components/drinksCards/DrinkCardEditForm.vue';
import { useDrinksCardEditView } from '@composables/drinksCards/useDrinksCardEditView';
import { onMounted } from 'vue';

// composables
const { drinksCard, find } = useDrinksCardEditView();

// lifecycle
onMounted(find);
</script>

<template>
  <DrinkCardEditForm
    v-if="drinksCard !== undefined"
    :drinks-card="drinksCard"
  />
</template>
