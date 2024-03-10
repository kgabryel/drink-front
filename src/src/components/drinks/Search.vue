<template>
  <div>
    <div class='px-2 buttons'>
      <v-btn
        class='glass-background'
        type='button'
        @click='clear'
      >
        Wyczyść
      </v-btn>
      <v-btn
        class='glass-background mr-2'
        type='button'
        @click='close'
      >
        Zamknij
      </v-btn>
    </div>
    <div class='d-flex my-2 pt-1'>
      <v-text-field
        v-model='name'
        :maxlength='maxDrinkLength'
        class='mb-2 mt-2 mr-2'
        color='indigo darken-4'
        dense
        hide-details
        label='Nazwa'
        required
      />
    </div>
    <div class='d-flex justify-center'>
      <v-switch
        v-model='onlyFavourite'
        class='mt-1'
        color='white'
        hide-details
        label='Tylko ulubione'
      />
      <v-switch
        v-model='available'
        class='mt-1 ml-3'
        color='white'
        hide-details
        label='Tylko dostępne'
      />
    </div>
    <div>
      <v-autocomplete
        v-model='selectedTags'
        :filter='filter'
        :hide-no-data='!tagsSearch'
        :items='tagsNames'
        :menu-props='{closeOnContentClick:true}'
        :search-input.sync='tagsSearch'
        chips
        class='mb-2'
        color='indigo darken-4'
        hide-details
        hide-selected
        label='Tagi'
        multiple
      >
        <template #no-data>
          <span class='px-2 py-2'>Brak rezultatów dla: "<strong class='add'>{{ tagsSearch }}</strong>".</span>
        </template>
        <template #selection='{ attrs, item, parent }'>
          <v-chip
            label
            small
            v-bind='attrs'
            @click='parent.selectItem(item)'
          >
            {{ item }}
          </v-chip>
        </template>
      </v-autocomplete>
    </div>
    <div>
      <v-autocomplete
        v-model='selectedIngredients'
        :filter='filter'
        :hide-no-data='!ingredientsSearch'
        :items='ingredientsNames'
        :menu-props='{closeOnContentClick:true}'
        :search-input.sync='ingredientsSearch'
        class='mb-2 ingredients-select'
        color='indigo darken-4'
        hide-details='auto'
        hide-selected
        label='Składniki'
        multiple
      >
        <template #no-data>
          <span class='px-2 py-2'>Brak rezultatów dla: "<strong class='add'>{{ ingredientsSearch }}</strong>".</span>
        </template>
        <template #selection='{ attrs, item, parent }'>
          <pre
            class='ingredient'
            v-bind='attrs'
            @click='parent.selectItem(item)'
          >{{ item }}</pre>
          <pre>,</pre>
        </template>
      </v-autocomplete>
    </div>
    <v-btn
      class='glass-background w-100'
      type='button'
      @click='search'
    >
      Szukaj
    </v-btn>
  </div>
</template>
<script>
import {bus} from '../../main';
import {mapGetters} from 'vuex';
import events from '../../config/events';
import lengths from '../../config/lengths';
import {stringsService} from '../../services/strings.service';

export default {
    name: 'Search',
    data: () => ({
        name: '',
        onlyFavourite: false,
        available: false,
        tagsSearch: null,
        ingredientsSearch: null,
        selectedTags: [],
        selectedIngredients: [],
        maxDrinkLength: lengths.drinkName
    }),
    computed: {
        ...mapGetters(['ingredients', 'tags', 'onlyAvailable']),
        ingredientsNames: function () {
            return this.ingredients.map(ingredient => ingredient.name);
        },
        tagsNames: function () {
            return this.tags.map(tag => tag.name);
        }
    },
    watch: {
        selectedTags: function () {
            this.tagsSearch = '';
        },
        selectedIngredients: function () {
            this.ingredientsSearch = '';
        }
    },
    mounted() {
        this.available = this.onlyAvailable;
        if (this.isModified()) {
            this.search();
        }
    },
    methods: {
        search: function () {
            bus.$emit(events.drinksSearch, {
                name: this.name,
                onlyFavourite: this.onlyFavourite,
                onlyAvailable: this.available,
                tags: this.selectedTags,
                ingredients: this.selectedIngredients
            });
        },
        close: () => bus.$emit(events.closeSearch),
        clear: function () {
            this.name = '';
            this.onlyFavourite = false;
            this.available = this.onlyAvailable;
            this.tagsSearch = null;
            this.ingredientsSearch = null;
            this.selectedTags = [];
            this.selectedIngredients = [];
            this.search();
        },
        filter: (item, queryText) => stringsService.filterStrings(item, queryText),
        isModified: function () {
            return this.name !== '' ||
                this.onlyFavourite ||
                this.available !== this.onlyAvailable ||
                this.selectedIngredients.length > 0 ||
                this.selectedTags.length > 0;
        }
    }
};
</script>
<style scoped>
.buttons {
    display: flex;
    justify-content: space-between;
}

.buttons > * {
    width: calc(50% - 10px);
}

.ingredient:hover {
    color: white;
    cursor: pointer;
}

.ingredients-select .v-select__selections > pre:last-of-type {
    display: none;
}
</style>