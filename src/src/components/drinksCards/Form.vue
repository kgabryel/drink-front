<template>
  <div>
    <div class='content-container px-2'>
      <div class='glass-background my-2 pa-2'>
        <div class='d-flex pt-1'>
          <v-text-field
            v-model='name'
            :counter='maxNameLength'
            :counter-value='v => v.length'
            :maxlength='maxNameLength'
            class='mt-2 mr-2'
            color='indigo darken-4'
            dense
            label='Nazwa'
            required
          />
          <v-switch
            v-model='active'
            class='mt-1'
            color='white'
            hide-details
            label='Aktywna'
          />
        </div>
        <v-combobox
          v-model='availableTags'
          :filter='filter'
          :hide-no-data='!availableTagsSearch'
          :items='availableAvailableTags'
          :menu-props='{closeOnContentClick:true}'
          :search-input.sync='availableTagsSearch'
          item-text='name'
          chips
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          hide-selected
          label='Dostępne tagi'
          multiple
        >
          <template #item='{ item }'>
            {{ item.name.toUpperCase() }}
          </template>
          <template #selection='{ attrs, item, parent }'>
            <v-chip
              label
              small
              v-bind='attrs'
              @click='parent.selectItem(item)'
            >
              {{ item.name.toUpperCase() }}
            </v-chip>
          </template>
        </v-combobox>
        <v-combobox
          v-model='excludedTags'
          :filter='filter'
          :hide-no-data='!excludedTagsSearch'
          :items='availableExcludedTags'
          :menu-props='{closeOnContentClick:true}'
          :search-input.sync='excludedTagsSearch'
          item-text='name'
          chips
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          hide-selected
          label='Wykluczone tagi'
          multiple
        >
          <template #item='{ item }'>
            {{ item.name.toUpperCase() }}
          </template>
          <template #selection='{ attrs, item, parent }'>
            <v-chip
              label
              small
              v-bind='attrs'
              @click='parent.selectItem(item)'
            >
              {{ item.name.toUpperCase() }}
            </v-chip>
          </template>
        </v-combobox>
        <v-combobox
          v-model='availableIngredients'
          :filter='filter'
          :hide-no-data='!availableIngredientsSearch'
          :items='availableAvailableIngredients'
          :menu-props='{closeOnContentClick:true}'
          :search-input.sync='availableIngredientsSearch'
          item-text='name'
          chips
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          hide-selected
          label='Dostępne składniki'
          multiple
        >
          <template #item='{ item }'>
            {{ item.name }}
          </template>
          <template #selection='{ attrs, item, parent }'>
            <v-chip
              label
              small
              v-bind='attrs'
              @click='parent.selectItem(item)'
            >
              {{ item.name }}
            </v-chip>
          </template>
        </v-combobox>
        <v-combobox
          v-model='excludedIngredients'
          :filter='filter'
          :hide-no-data='!excludedIngredientsSearch'
          :items='availableExcludedIngredients'
          :menu-props='{closeOnContentClick:true}'
          :search-input.sync='excludedIngredientsSearch'
          item-text='name'
          chips
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          hide-selected
          label='Wykluczone składniki'
          multiple
        >
          <template #item='{ item }'>
            {{ item.name }}
          </template>
          <template #selection='{ attrs, item, parent }'>
            <v-chip
              label
              small
              v-bind='attrs'
              @click='parent.selectItem(item)'
            >
              {{ item.name }}
            </v-chip>
          </template>
        </v-combobox>
        <v-combobox
          v-model='availableDrinks'
          :filter='filter'
          :hide-no-data='!availableDrinksSearch'
          :items='availableAvailableDrinks'
          :menu-props='{closeOnContentClick:true}'
          :search-input.sync='availableDrinksSearch'
          item-text='name'
          chips
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          hide-selected
          label='Dostępne drinki'
          multiple
        >
          <template #item='{ item }'>
            {{ item.name.toUpperCase() }}
          </template>
          <template #selection='{ attrs, item, parent }'>
            <v-chip
              label
              small
              v-bind='attrs'
              @click='parent.selectItem(item)'
            >
              {{ item.name.toUpperCase() }}
            </v-chip>
          </template>
        </v-combobox>
        <v-combobox
          v-model='excludedDrinks'
          :filter='filter'
          :hide-no-data='!excludedDrinksSearch'
          :items='availableExcludedDrinks'
          :menu-props='{closeOnContentClick:true}'
          :search-input.sync='excludedDrinksSearch'
          item-text='name'
          chips
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          hide-selected
          label='Wykluczone drinki'
          multiple
        >
          <template #item='{ item }'>
            {{ item.name.toUpperCase() }}
          </template>
          <template #selection='{ attrs, item, parent }'>
            <v-chip
              label
              small
              v-bind='attrs'
              @click='parent.selectItem(item)'
            >
              {{ item.name.toUpperCase() }}
            </v-chip>
          </template>
        </v-combobox>
        <div class='d-flex pt-1'>
          <div class='px-2 w-100'>
            <v-btn
              :disabled='!valid'
              block
              class='glass-background'
              type='button'
              @click='submit'
            >
              {{ buttonText }}
            </v-btn>
          </div>
          <v-switch
            v-model='showSelectedDrinks'
            class='mt-1'
            color='white'
            hide-details
            label='Pokaż'
          />
        </div>
      </div>
    </div>
    <DrinksList
      v-if='showSelectedDrinks'
      :drinks='selectedDrinks'
      @remove='remove'
    />
  </div>
</template>
<script>
import lengths from '../../config/lengths';
import events from '../../config/events';
import {stringsService} from '../../services/strings.service';
import {mapGetters} from 'vuex';
import DrinksList from './DrinksList.vue';

export default {
    name: 'Form',
    components: {DrinksList},
    props: {
        buttonText: {
            type: String,
            required: true
        },
        showed: {
            type: Boolean,
            default: false
        },
        defaultName: {
          type: String,
          default: () => ''
        },
        defaultActive: {
          type: Boolean,
          default: false
        },
        defaultAvailableDrinks: {
            type: Array,
            default: () => []
        },
        defaultExcludedDrinks: {
            type: Array,
            default: () => []
        },
        defaultAvailableTags: {
            type: Array,
            default: () => []
        },
        defaultExcludedTags: {
            type: Array,
            default: () => []
        },
        defaultAvailableIngredients: {
            type: Array,
            default: () => []
        },
        defaultExcludedIngredients: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        name: '',
        active: false,
        maxNameLength: lengths.drinksCardName,
        valid: false,
        availableDrinks: [],
        excludedDrinks: [],
        availableTags: [],
        excludedTags: [],
        availableIngredients: [],
        excludedIngredients: [],
        availableTagsSearch: '',
        excludedTagsSearch: '',
        availableIngredientsSearch: '',
        excludedIngredientsSearch: '',
        availableDrinksSearch: '',
        excludedDrinksSearch: '',
        selectedDrinks: [],
        showSelectedDrinks: false
    }),
    computed: {
        ...mapGetters(['drinks', 'ingredients', 'tags']),
        availableAvailableTags: function () {
            return this.tags.filter(tag => !this.excludedTags.map(tag => tag.id).includes(tag.id));
        },
        availableExcludedTags: function () {
            return this.tags.filter(tag => !this.availableTags.map(tag => tag.id).includes(tag.id));
        },
        availableAvailableIngredients: function () {
            return this.ingredients.filter(
                ingredient => !this.excludedIngredients.map(ingredient => ingredient.id).includes(ingredient.id)
            );
        },
        availableExcludedIngredients: function () {
            return this.ingredients.filter(
                ingredient => !this.availableIngredients.map(ingredient => ingredient.id).includes(ingredient.id)
            );
        },
        availableAvailableDrinks: function () {
            return this.drinks.filter(drink => !this.excludedDrinks.map(drink => drink.id).includes(drink.id));
        },
        availableExcludedDrinks: function () {
            return this.drinks.filter(drink => !this.availableDrinks.map(drink => drink.id).includes(drink.id));
        }
    },
    watch: {
        name: function () {
            this.valid = this.name !== '';
        },
        availableTags: function () {
            this.updateSelectedDrinks();
        },
        excludedTags: function () {
            this.updateSelectedDrinks();
        },
        availableIngredients: function () {
            this.updateSelectedDrinks();
        },
        excludedIngredients: function () {
            this.updateSelectedDrinks();
        },
        availableDrinks: function () {
            this.updateSelectedDrinks();
        },
        excludedDrinks: function () {
            this.updateSelectedDrinks();
        }
    },
    mounted() {
        this.updateSelectedDrinks();
        this.showSelectedDrinks = this.showed;
        this.name = this.defaultName;
        this.active = this.defaultActive;
        this.availableDrinks = this.defaultAvailableDrinks.map(id => this.$store.getters.drinkById(id));
        this.excludedDrinks = this.defaultExcludedDrinks.map(id => this.$store.getters.drinkById(id));
        this.availableTags = this.defaultAvailableTags.map(id => this.$store.getters.tagById(id));
        this.excludedTags = this.defaultExcludedTags.map(id => this.$store.getters.tagById(id));
        this.availableIngredients = this.defaultAvailableIngredients.map(id => this.$store.getters.ingredientById(id));
        this.excludedIngredients = this.defaultExcludedIngredients.map(id => this.$store.getters.ingredientById(id));
    },
    methods: {
        submit: function () {
            this.$emit(events.submitted, {
                name: this.name,
                active: this.active,
                availableTags: this.availableTags.map(tag => tag.id),
                excludedTags: this.excludedTags.map(tag => tag.id),
                availableIngredients: this.availableIngredients.map(ingredient => ingredient.id),
                excludedIngredients: this.excludedIngredients.map(ingredient => ingredient.id),
                availableDrinks: this.availableDrinks.map(drink => drink.id),
                excludedDrinks: this.excludedDrinks.map(drink => drink.id)
            });
        },
        filter: (item, queryText) => stringsService.filterStrings(item.name, queryText),
        updateSelectedDrinks: function () {
            this.selectedDrinks = this.drinks.filter(element => this.check(element));
        },
        check: function (element) {
            const drinkIngredients = element.positions.map(position => position.ingredientId);
            if (this.excludedDrinks.length > 0) {
                if (this.excludedDrinks.map(drink => drink.id).includes(element.id)) {
                    return false;
                }
            }
            if (this.excludedTags.length > 0) {
                if (element.tags.some(tag => this.excludedTags.map(tag => tag.id).includes(tag))) {
                    return false;
                }
            }
            if (this.excludedIngredients.length > 0) {
                if (drinkIngredients.some(ingredient => this.excludedIngredients.map(ingredient => ingredient.id).includes(ingredient))) {
                    return false;
                }
            }
            if (this.availableTags.length > 0) {
                if (element.tags.some(tag => this.availableTags.map(tag => tag.id).includes(tag))) {
                    return true;
                }
            }
            if (this.availableIngredients.length > 0) {
                if (drinkIngredients.some(ingredient => this.availableIngredients.map(ingredient => ingredient.id).includes(ingredient))) {
                    return true;
                }
            }
            if (this.availableDrinks.length > 0) {
                if (this.availableDrinks.map(drink => drink.id).includes(element.id)) {
                    return true;
                }
            }
            return false;
        },
        remove: function (id) {
            this.availableDrinks = this.availableDrinks.filter(drink => drink.id !== id);
            this.excludedDrinks.push(this.drinks.find(drink => drink.id === id));
        }
    }
};
</script>
<style scoped>
</style>