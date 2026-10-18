<script setup lang="ts">
import type { Ref } from 'vue';

import DeleteModal from '@components/layout/DeleteModal.vue';
import { useDrinksCard } from '@composables/drinksCards/useDrinksCard';
import { ref, toRef } from 'vue';

import type { DrinksCard } from '@/api/response';

import { names } from '@/router/names';

import QrCodeModal from './QrCodeModal.vue';

// interfaces
interface Props {
  drinksCard: DrinksCard;
}

// setup
const props: Props = defineProps<Props>();

const drinksCardEdit: string = names.editDrinksCard;

defineOptions({ inheritAttrs: false });

// state
const showedDelete: Ref<boolean> = ref(false);
const showedQrCode: Ref<boolean> = ref(false);

// composables
const { changeActivity, remove, url } = useDrinksCard(toRef(props, 'drinksCard'));

// actions
function showDeleteModal(): void {
  showedDelete.value = true;
}

function showQrModal(): void {
  showedQrCode.value = true;
}
</script>

<template>
  <v-list-item v-bind="$attrs">
    <template #prepend>
      <v-switch
        :model-value="drinksCard.active"
        class="mr-4 ml-1"
        @update:model-value="changeActivity"
      />
    </template>
    <template #title>
      {{ drinksCard.name }}
    </template>
    <template #append>
      <v-btn
        icon="mdi-qrcode"
        type="button"
        @click="showQrModal"
      />
      <v-menu location="bottom">
        <template #activator="{ props: activatorProps }">
          <v-btn
            icon="mdi-menu"
            type="button"
            v-bind="activatorProps"
          />
        </template>
        <v-list class="px-2 py-2">
          <v-list-item
            :to="{ name: drinksCardEdit, params: { id: drinksCard.id } }"
            class="black-text"
          >
            <template #title>Edytuj</template>
          </v-list-item>
          <v-list-item @click="showDeleteModal">
            <template #title>Usuń</template>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
  <DeleteModal
    v-model="showedDelete"
    @remove="remove"
  />
  <QrCodeModal
    v-model="showedQrCode"
    :url="url"
  />
</template>

<style scoped>
:deep(.v-list-item__overlay) {
  display: none;
}
</style>
