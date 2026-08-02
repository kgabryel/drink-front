<script setup lang="ts">
import LoadingSpinner from '@components/layout/LoadingSpinner.vue';
import { useOriginalPhoto } from '@composables/drinks/useOriginalPhoto';

// composables
const { clear, photo, photoData } = useOriginalPhoto();
</script>

<template>
  <div v-if="photo" class="overlay pa-2 d-flex justify-center align-center" @click.stop="clear">
    <v-img :height="'100%'" :max-height="photo.height" :max-width="photo.width" :src="photoData" :width="'100%'" cover>
      <template #placeholder>
        <LoadingSpinner />
      </template>
    </v-img>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgb(0 0 0 / 80%);
  cursor: pointer;
  inset: 0;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  z-index: 1000;
}
</style>
