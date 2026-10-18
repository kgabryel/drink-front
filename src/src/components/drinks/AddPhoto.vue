<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import type { Ref } from 'vue';

import { useAddPhoto } from '@composables/drinks/useAddPhoto';
import modalConfig from '@config/modal-config';
import { useTemplateRef } from 'vue';
import { Cropper } from 'vue-advanced-cropper';

import type { Drink } from '@/api/response';

// interfaces
interface Props {
  drink: Drink;
}

// setup
const props: Props = defineProps<Props>();

// state
const file: Ref<HTMLInputElement | null> = useTemplateRef<HTMLInputElement>('file');

// composables
const { change, cropAvailable, hideModal, image, loading, onFileChange, open, showed, upload } = useAddPhoto(
  props.drink.id,
  file,
);
</script>

<template>
  <div class="content-container px-2">
    <v-btn
      block
      class="text-center glass-background"
      type="button"
      @click="open"
    >
      <v-icon class="mr-3 icon">mdi-upload</v-icon>
      Dodaj zdjęcie
    </v-btn>
    <v-dialog
      v-model="showed"
      :max-width="image.src ? modalConfig.addPhoto.maxWidth : modalConfig.addPhoto.maxWidthNoImage"
    >
      <v-card
        :disabled="loading"
        :loading="loading"
        class="glass-background"
      >
        <v-toolbar>
          <v-toolbar-title>Dodawanie</v-toolbar-title>
          <v-btn
            icon="mdi-close"
            type="button"
            @click="hideModal"
          />
        </v-toolbar>
        <div class="pa-3 overflow-hidden">
          <v-row density="compact">
            <v-col>
              <v-btn
                block
                class="upload-button glass-background"
                type="button"
              >
                <input
                  ref="file"
                  accept="image/*"
                  type="file"
                  @change="onFileChange"
                />
                <v-icon
                  class="mr-2"
                  size="22"
                >
                  mdi-upload
                </v-icon>
                Wybierz zdjęcie
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                :disabled="!cropAvailable"
                block
                class="glass-background"
                type="button"
                @click="upload"
              >
                <v-icon
                  class="mr-2"
                  size="22"
                >
                  mdi-content-save
                </v-icon>
                Dodaj
              </v-btn>
            </v-col>
          </v-row>
          <Cropper
            v-if="image.src"
            ref="cropper"
            :src="image.src"
            :stencil-props="{ aspectRatio: 4 / 3 }"
            class="cropper mt-3"
            @change="change"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.upload-button input[type='file'] {
  background: white;
  cursor: inherit;
  display: block;
  font-size: 0;
  height: 44px;
  opacity: 0;
  outline: none;
  position: absolute;
  right: -20px;
  text-align: right;
  top: -12px;
  width: calc(100% + 40px);
}

.cropper {
  max-height: 60vh;
}
</style>
