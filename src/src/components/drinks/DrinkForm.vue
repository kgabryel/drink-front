<script setup lang="ts">
import type { DrinkRequest } from '@models/api/drink.request';
import type { Drink } from '@models/store/drink';

import AutocompleteSingle from '@components/layout/AutocompleteSingle.vue';
import { useDrinkForm } from '@composables/drinks/useDrinkForm';
import lengths from '@config/lengths';

import { filterName } from '@/utils/form.utils';

// interfaces
interface Props {
  drink: Drink | null;
  btnText: string;
  submitAction: (data: DrinkRequest) => void;
}

// setup
const props: Props = defineProps<Props>();

const maxDrinkLength: number = lengths.drinkName;
const maxAmountLength: number = lengths.amount;
const maxTagLength: number = lengths.tag;

// composables
const {
  addPosition,
  addTag,
  addTagAvailable,
  availableIngredients,
  availableTags,
  changeFavourite,
  changePublic,
  removePosition,
  removeTag,
  state,
  submit,
  tagSearch,
  valid,
} = useDrinkForm(props.drink);
</script>

<template>
  <div class="content-container px-2">
    <div class="glass-background my-2 pa-2">
      <div class="d-flex align-center pt-2">
        <v-text-field v-model="state.name" :counter="maxDrinkLength" class="mb-2 mt-2" label="Nazwa" required />
        <v-tooltip>
          <template #activator="{ props: activatorProps }">
            <v-btn icon type="button" v-bind="activatorProps" @click="changeFavourite">
              <v-icon v-if="!state.isFavourite" color="black">mdi-star-outline</v-icon>
              <v-icon v-else color="amber-darken-2">mdi-star</v-icon>
            </v-btn>
          </template>
          <span>Ulubione</span>
        </v-tooltip>
        <v-tooltip>
          <template #activator="{ props: activatorProps }">
            <v-btn icon type="button" v-bind="activatorProps" @click="changePublic">
              <v-icon v-if="!state.isPublic" color="black">mdi-share-variant</v-icon>
              <v-icon v-else color="amber-darken-2">mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>Publiczny</span>
        </v-tooltip>
      </div>
      <v-textarea v-model="state.description" class="mb-2" label="Opis" />
      <v-combobox
        v-model="state.tags"
        v-model:search="tagSearch"
        :custom-filter="filterName"
        :hide-no-data="!addTagAvailable"
        :items="availableTags"
        :max-length="maxTagLength"
        class="mb-2"
        label="Tagi"
        multiple
        chips
        closable-chips
        :menu-props="{ closeOnContentClick: true }"
      >
        <template #no-data>
          <span class="px-2 py-2">
            Brak rezultatów dla: "
            <strong class="c-pointer" @click="addTag">{{ tagSearch }}</strong>
            ". Naciśnij
            <kbd>enter</kbd>
            żeby dodać.
          </span>
        </template>
        <template #item="{ item, props: itemProps }">
          <v-list-item v-bind="itemProps" :title="item.toUpperCase()" />
        </template>
        <template #chip="{ item, index }">
          <v-chip size="small" class="glass-background--opaque" closable @click:close="removeTag(index)">
            {{ item.toUpperCase() }}
          </v-chip>
        </template>
      </v-combobox>
      <v-row
        v-for="(position, counter) in state.drinkPositions"
        :key="counter"
        class="mt-0"
        density="compact"
        align="end"
      >
        <v-col>
          <v-text-field
            v-model="position.amount"
            :counter="maxAmountLength"
            :maxlength="maxAmountLength"
            class="mt-2"
            label="Ilość"
            required
          />
        </v-col>
        <v-col>
          <AutocompleteSingle
            v-model="position.ingredient"
            label="Składnik"
            :items="availableIngredients(position.ingredient)"
            class="mt-2"
          />
        </v-col>
        <v-col cols="auto">
          <v-btn class="glass-background red-glass mb-4" icon type="button" @click="removePosition(counter)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-2" density="compact">
        <v-col>
          <v-btn block class="glass-background green-glass" type="button" @click="addPosition">Dodaj składnik</v-btn>
        </v-col>
        <v-col>
          <v-btn :disabled="!valid" block class="glass-background" type="button" @click="submit(submitAction)">
            {{ btnText }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
