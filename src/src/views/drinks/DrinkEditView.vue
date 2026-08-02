<script setup lang="ts">
import AddPhoto from '@components/drinks/AddPhoto.vue';
import DrinkModifyForm from '@components/drinks/DrinkModifyForm.vue';
import DrinkPhotosList from '@components/drinks/DrinkPhotosList.vue';
import DrinkPreviewButton from '@components/drinks/DrinkPreviewButton.vue';
import { useDrinkByRoute } from '@composables/drinks/useDrinkByRoute';

// composables
const { drink } = useDrinkByRoute();
</script>

<template>
  <div v-if="drink !== undefined">
    <DrinkPreviewButton :drink="drink" />
    <DrinkModifyForm :drink="drink" />
    <AddPhoto :drink="drink" />
    <DrinkPhotosList :drink-id="drink.id" :photos="drink.photos" />
  </div>
</template>
