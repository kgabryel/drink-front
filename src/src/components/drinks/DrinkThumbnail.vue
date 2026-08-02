<script setup lang="ts">
import type { Photo } from '@models/store/photo';
import type { Ref } from 'vue';

import photoConfig from '@config/photo-config';
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

// watch
watch(
  () => props.photo.id,
  async () => (photoData.value = await photoService.loadPhoto(PhotoSize.Small, props.drinkId, props.photo.id)),
  { immediate: true },
);
</script>

<template>
  <v-img
    :height="photoConfig.thumbnail.height"
    :max-height="photoConfig.thumbnail.height"
    :max-width="photoConfig.thumbnail.width"
    :src="photoData"
    :width="photoConfig.thumbnail.width"
    cover
  />
</template>
