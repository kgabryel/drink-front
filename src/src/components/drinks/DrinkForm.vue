<template>
  <div class='content-container px-2'>
    <div class='glass-background my-2 pa-2'>
      <div class='d-flex align-center pt-2'>
        <v-text-field
          v-model='name'
          :counter='maxDrinkLength'
          :counter-value='v => v.length'
          class='mb-2 mt-2'
          color='indigo darken-4'
          dense
          label='Nazwa'
          required
        />
        <v-tooltip bottom>
          <template #activator='{ on, attrs }'>
            <v-btn
              icon
              type='button'
              v-bind='attrs'
              @click='changeFavourite'
              v-on='on'
            >
              <v-icon
                v-if='!favourite'
                color='black'
              >
                fa-star-o
              </v-icon>
              <v-icon
                v-else
                color='amber darken-2'
              >
                fa-star
              </v-icon>
            </v-btn>
          </template>
          <span>
            Ulubione
          </span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator='{ on, attrs }'>
            <v-btn
              icon
              type='button'
              v-bind='attrs'
              @click='changePublic'
              v-on='on'
            >
              <v-icon
                v-if='!publicDrink'
                color='black'
              >
                mdi-share-variant
              </v-icon>
              <v-icon
                v-else
                color='amber darken-2'
              >
                mdi-share-variant
              </v-icon>
            </v-btn>
          </template>
          <span>
            Publiczny
          </span>
        </v-tooltip>
      </div>
      <v-textarea
        v-model='description'
        class='mb-2'
        color='indigo darken-4'
        hide-details='auto'
        label='Opis'
      />
      <v-combobox
        v-model='drinkTags'
        :filter='filter'
        :hide-no-data='!search'
        :items='availableTags'
        :max-length='maxTagLength'
        :menu-props='{closeOnContentClick:true}'
        :search-input.sync='search'
        chips
        class='mb-2'
        color='indigo darken-4'
        hide-details='auto'
        hide-selected
        label='Tagi'
        multiple
      >
        <template #no-data>
          <span
            v-if='!tagUsed'
            class='px-2 py-2'
          >
            Brak rezultatów dla: "
            <strong
              class='c-pointer'
              @click='addTag'
            >{{ search }}</strong>
            ". Naciśnij <kbd>enter</kbd> żeby dodać.
          </span>
        </template>
        <template #item='{ item }'>
          {{ item.toUpperCase() }}
        </template>
        <template #selection='{ attrs, item, parent }'>
          <v-chip
            label
            small
            v-bind='attrs'
            @click='parent.selectItem(item)'
          >
            {{ item.toUpperCase() }}
          </v-chip>
        </template>
      </v-combobox>
      <div
        v-for='(position, counter) in drinkPositions'
        :key='counter'
        class='mt-0 d-flex align-center'
      >
        <v-text-field
          v-model.lazy='position.amount'
          :counter='maxAmountLength'
          :counter-value='v => v.length'
          :maxlength='maxAmountLength'
          class='mb-2 mr-2'
          color='indigo darken-4'
          label='Ilość'
          required
        />
        <v-autocomplete
          v-model.lazy='position.ingredient'
          :filter='filter'
          :items='ingredientsNames(position.ingredient)'
          class='mb-2 mx-2'
          color='indigo darken-4'
          label='Składnik'
        />
        <v-btn
          class='glass-background red-glass'
          icon
          type='button'
          @click='removePosition(counter)'
        >
          <v-icon>
            fa-times
          </v-icon>
        </v-btn>
      </div>
      <v-row class='mt-0'>
        <v-col>
          <v-btn
            block
            class='glass-background'
            type='button'
            @click='addPosition'
          >
            Dodaj składnik
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            :disabled='!valid'
            block
            class='glass-background'
            type='button'
            @click='submit'
          >
            {{ btnText }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import lengths from '../../config/lengths';
import {stringsService} from '../../services/strings.service';

export default {
    name: 'DrinkForm',
    data: () => ({
        name: '',
        description: '',
        url: '',
        drinkPositions: [],
        drinkTags: [],
        search: null,
        favourite: false,
        nameValid: false,
        positionsValid: true,
        btnText: '',
        maxDrinkLength: lengths.drinkName,
        maxAmountLength: lengths.amount,
        maxTagLength: lengths.tag,
        publicDrink: false,
        allTags: []
    }),
    computed: {
        ...mapGetters(['ingredients', 'tags']),
        ingredientsNames: function () {
            return positionIngredient => this.ingredients.slice()
                .sort((a, b) => stringsService.compareString(a.name, b.name))
                .map(ingredient => ingredient.name)
                .filter(ingredient => !this.drinkPositions.map(position => position.ingredient).includes(ingredient) || ingredient === positionIngredient);
        },
        valid: function () {
            return this.nameValid && this.positionsValid;
        },
        availableTags: function () {
            return this.allTags.map(tag => tag.toLowerCase());
        },
        uniqueTags: function () {
            return this.drinkTags.map(tag => tag.toLowerCase()).filter((x, i, a) => a.indexOf(x) === i);
        },
        tagUsed: function () {
            return this.drinkTags.includes(this.search);
        }
    },
    watch: {
        drinkTags: function () {
            this.search = '';
            this.drinkTags.forEach(tag => {
                if (!this.allTags.includes(tag.toLowerCase())) {
                    this.allTags.push(tag.toLowerCase());
                }
            });
        },
        name: function () {
            this.nameValid = this.name !== '';
        },
        drinkPositions: {
            handler() {
                this.positionsValid = true;
                this.drinkPositions.forEach(position => {
                    if (position.amount !== '' && position.ingredient === '') {
                        this.positionsValid = false;
                    }
                });
            },
            deep: true
        }
    },
    mounted() {
        this.allTags = this.tags.map(tag => tag.name.toLowerCase());
    },
    methods: {
        addPosition: function () {
            this.drinkPositions.push({
                amount: '',
                ingredient: ''
            });
        },
        removePosition: function (index) {
            this.drinkPositions.splice(index, 1);
        },
        addTag: function () {
            this.drinkTags.push(this.search.toLowerCase());
            this.search = '';
        },
        changeFavourite: function () {
            this.favourite = !this.favourite;
        },
        changePublic: function () {
            this.publicDrink = !this.publicDrink;
        },
        getData: function () {
            return {
                name: this.name,
                description: this.description,
                tags: this.uniqueTags.map(tag => tag.toUpperCase()),
                positions: this.drinkPositions.filter(position => position.ingredient !== '').map(position => {
                    return {
                        amount: position.amount,
                        ingredient: this.$store.getters.ingredientByName(position.ingredient).id
                    };
                }),
                favourite: this.favourite,
                public: this.publicDrink
            };
        },
        filter: (item, queryText) => stringsService.filterStrings(item, queryText),
        submit: function () {

        }
    }
};
</script>
<style scoped>
.red-glass {
    position: relative;
    top: 3px;
}
</style>