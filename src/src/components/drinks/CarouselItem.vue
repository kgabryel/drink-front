<script setup lang="ts">
import type { Photo } from '@models/store/photo';
import type { Ref } from 'vue';

import { useOriginalPhoto } from '@composables/drinks/useOriginalPhoto';
import { PhotoSize } from '@config/photo-size';
import { photoService } from '@services/photo.service';
import { ref, watch } from 'vue';

// interfaces
interface Props {
  drinkId: number;
  photo: Photo;
}

// setup
const props: Props = defineProps<Props>();

// state
const photoData: Ref<string> = ref('');

// composables
const { load } = useOriginalPhoto();

// watch
watch(
  () => props.photo.id,
  async () => (photoData.value = await photoService.loadPhoto(PhotoSize.Medium, props.drinkId, props.photo.id)),
  { immediate: true },
);
</script>

<template>
  <v-carousel-item :src="photoData" class="c-pointer" @click="load(photo, drinkId)" />
</template>
