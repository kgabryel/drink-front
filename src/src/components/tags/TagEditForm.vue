<script setup lang="ts">
import type { Tag } from '@models/store/tag';

import { useTagEdit } from '@composables/tags/useTagEdit';
import lengths from '@config/lengths';

// interfaces
interface Events {
  (e: 'stopEdit'): void;
}

interface Props {
  tag: Tag;
}

// setup
const props: Props = defineProps<Props>();
const emit: Events = defineEmits<Events>();

const maxLength: number = lengths.tag;

// composables
const { formErrors, name, update, valid } = useTagEdit(props.tag);

// actions
function stopEdit(): void {
  emit('stopEdit');
}
</script>

<template>
  <v-list-item class="w-100">
    <template #prepend>
      <v-btn icon="mdi-close" type="button" @click="stopEdit" />
    </template>
    <template #default>
      <v-text-field
        v-model="name"
        :counter="maxLength"
        :error-messages="formErrors"
        :maxlength="maxLength"
        label="Nazwa"
        required
        class="mt-2"
      />
    </template>
    <template #append>
      <v-btn icon="mdi-content-save" type="button" :disabled="!valid" @click="update(stopEdit)" />
    </template>
  </v-list-item>
</template>
