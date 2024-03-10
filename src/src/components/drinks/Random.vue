<template>
  <div>
    <div v-if='step < 3'>
      <div class='content-container px-2'>
        <v-stepper
          v-model='step'
          class='glass-background'
          vertical
        >
          <v-stepper-step
            :complete='step > 1'
            step='1'
          >
            Składniki
          </v-stepper-step>
          <v-stepper-content step='1'>
            <v-switch
              v-model='onlyAvailable'
              class='ml-3 mt-2'
              color='white'
              label='Ukryj brakujące składniki'
            />
            <v-switch
              v-model='additionalIngredients'
              class='ml-3 mt-0'
              color='white'
              label='Dodatkowe składniki'
            />
            <div
              v-if='orderedIngredients.length > 10'
              class='d-flex justify-space-between mt-2 mb-2'
            >
              <v-btn
                class='glass-background'
                type='button'
                @click='clearIngredients'
              >
                Wyczyść
              </v-btn>
              <v-btn
                class='glass-background blue-glass'
                type='button'
                @click='step = 2'
              >
                Dalej
              </v-btn>
              <v-btn
                class='glass-background small-deselect'
                type='button'
                @click='deselectIngredients'
              >
                Odznacz wszystkie
              </v-btn>
            </div>
            <v-btn
              block
              class='glass-background big-deselect mb-2'
              type='button'
              @click='deselectIngredients'
            >
              Odznacz wszystkie
            </v-btn>
            <v-list-item-group
              v-model='selectedIngredients'
              multiple
            >
              <template v-for='ingredient in orderedIngredients'>
                <v-list-item
                  :key='ingredient.id'
                  :class='{hidden: onlyAvailable && !ingredient.available}'
                >
                  <template #default='{ active }'>
                    <v-list-item-action>
                      <v-switch
                        :input-value='active'
                        color='white'
                      />
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ ingredient.name }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon
                        v-if='ingredient.available'
                        class='available-icon'
                      >
                        mdi-check-circle
                      </v-icon>
                      <v-icon
                        v-else
                        class='unavailable-icon'
                      >
                        mdi-close-circle
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
            <p
              v-if='availableDrinks !== undefined'
              class='mt-1'
            >
              Liczba dostępnych drinków: {{ availableDrinks.length }}
            </p>
            <div class='d-flex justify-space-between mt-2 mb-2'>
              <v-btn
                class='glass-background'
                type='button'
                @click='clearIngredients'
              >
                Wyczyść
              </v-btn>
              <v-btn
                class='glass-background blue-glass'
                type='button'
                @click='step = 2'
              >
                Dalej
              </v-btn>
              <v-btn
                class='glass-background small-deselect'
                type='button'
                @click='deselectIngredients'
              >
                Odznacz wszystkie
              </v-btn>
            </div>
            <v-btn
              block
              class='glass-background big-deselect'
              type='button'
              @click='deselectIngredients'
            >
              Odznacz wszystkie
            </v-btn>
          </v-stepper-content>
          <v-stepper-step
            :complete='step > 2'
            step='2'
          >
            Tagi
          </v-stepper-step>
          <v-stepper-content step='2'>
            <v-switch
              v-model='anyTag'
              class='ml-3'
              color='white'
              label='Dowolny tag'
            />
            <v-btn
              v-for='tag in orderedTags'
              :key='tag.id'
              :class='{ "blue-glass": selectedTags.includes(tag.id)}'
              class='mx-1 my-1 glass-background'
              elevation='2'
              type='button'
              @click='switchTag(tag.id)'
            >
              {{ tag.name }}
            </v-btn>
            <p
              v-if='availableDrinks !== undefined'
              class='mt-1'
            >
              Liczba dostępnych drinków: {{ availableDrinks.length }}
            </p>
            <div class='d-flex justify-space-between mt-2 mb-2'>
              <v-btn
                class='glass-background'
                type='button'
                @click='step = 1'
              >
                Powrót
              </v-btn>
              <v-btn
                :disabled='availableDrinks === undefined || availableDrinks.length === 0'
                class='glass-background blue-glass'
                type='button'
                @click='random'
              >
                Losuj
              </v-btn>
              <v-btn
                class='glass-background'
                type='button'
                @click='clearTags'
              >
                Wyczyść
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper>
      </div>
    </div>
    <div
      v-else
      class='content-container'
    >
      <Drink :drink='selectedDrink' />
      <div class='px-2 d-flex justify-lg-space-between'>
        <v-btn
          class='glass-background'
          type='button'
          @click='step = 2'
        >
          Powrót
        </v-btn>
        <v-btn
          class='glass-background'
          type='button'
          @click='random'
        >
          Losuj następny
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import Drink from './Drink';
import {mapGetters} from 'vuex';
import {stringsService} from '../../services/strings.service';

export default {
    name: 'Random',
    components: {Drink},
    data: () => ({
        step: 1,
        onlyAvailable: false,
        additionalIngredients: true,
        anyTag: false,
        selectedIngredients: [],
        selectedTags: [],
        availableDrinks: [],
        selectedDrink: null
    }),
    computed: {
        ...mapGetters(['drinks', 'ingredients', 'tags']),
        orderedIngredients: function () {
            return this.ingredients.slice().sort((a, b) => stringsService.compareString(a.name, b.name));
        },
        orderedTags: function () {
            return this.tags.slice().sort((a, b) => stringsService.compareString(a.name, b.name));
        }
    },
    watch: {
        onlyAvailable: {
            handler: 'filter'
        },
        additionalIngredients: {
            handler: 'filter'
        },
        selectedIngredients: {
            handler: 'filter'
        },
        anyTag: {
            handler: 'filter'
        },
        selectedTags: {
            handler: 'filter'
        }
    },
    mounted() {
        this.availableDrinks = this.drinks;
        for (let i = 0; i < this.ingredients.length; i++) {
            this.selectedIngredients.push(i);
        }
    },
    methods: {
        switchTag: function (id) {
            if (this.selectedTags.includes(id)) {
                let index = this.selectedTags.indexOf(id);
                if (index !== -1) {
                    this.selectedTags.splice(index, 1);
                }
            } else {
                this.selectedTags.push(id);
            }
        },
        filter: function () {
            this.availableDrinks = this.drinks.filter(drink => {
                let checker = (arr, target) => target.every(v => arr.includes(v));
                if (this.onlyAvailable) {
                    let result = true;
                    drink.positions.forEach(position => {
                        if (!this.$store.getters.ingredientById(position.ingredientId).available) {
                            result = false;
                        }
                    });
                    if (!result) {
                        return false;
                    }
                }
                if (this.selectedTags.length > 0) {
                    if (this.anyTag) {
                        if (!drink.tags.some(tag => this.selectedTags.includes(tag))) {
                            return false;
                        }
                    } else {
                        if (!checker(drink.tags, this.selectedTags)) {
                            return false;
                        }
                    }
                }
                let ingredientsId = this.selectedIngredients.map(ingredient => this.ingredients[ingredient].id);
                let drinkIngredients = drink.positions.map(position => position.ingredientId);
                if (drinkIngredients.length === 0) {
                    return true;
                }
                if (this.additionalIngredients) {
                    if (!ingredientsId.some(ingredient => drinkIngredients.includes(ingredient))) {
                        return false;
                    }
                } else {
                    if (!checker(ingredientsId, drinkIngredients)) {
                        return false;
                    }
                }
                return true;
            });
        },
        random: function () {
            if (this.availableDrinks.length === 0) {
                return;
            }
            const shuffled = this.availableDrinks.sort(() => 0.5 - Math.random());
            this.selectedDrink = shuffled[0];
            this.step = 3;
        },
        clearIngredients: function () {
            this.onlyAvailable = false;
            this.additionalIngredients = true;
            this.selectedIngredients = [];
            for (let i = 0; i < this.ingredients.length; i++) {
                this.selectedIngredients.push(i);
            }
        },
        clearTags: function () {
            this.anyTag = false;
            this.selectedTags = [];
        },
        deselectIngredients: function () {
            this.selectedIngredients = [];
        }
    }
};
</script>
<style scoped>
.big-deselect {
    display: none;
}

@media screen and (max-width: 550px) {
    .big-deselect {
        display: block;
    }

    .small-deselect {
        display: none;
    }
}
</style>