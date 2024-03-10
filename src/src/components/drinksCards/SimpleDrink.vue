<template>
  <div
    ref='card'
    class='px-2 py-2 in-masonry'
  >
    <v-card
      class='glass-background'
      @click='selected'
    >
      <v-app-bar flat>
        <v-toolbar-title>
          {{ drink.name }}
        </v-toolbar-title>
      </v-app-bar>
      <v-card-text class='pt-0'>
        <p
          v-if="drink.description !== null && drink.description !== ''"
          class='text--black'
        >
          {{ drink.description }}
        </p>
        <div>
          <v-chip
            v-for='(tag, index) in tags'
            :key='index'
            :href='tag | tagDrinksHref'
            class='ma-2 glass-background'
            label
          >
            {{ tag.name }}
          </v-chip>
        </div>
        <div>
          <v-list
            v-if='positions.length > 0'
            two-line
          >
            <v-list-item
              v-for='position in positions'
              :key='position.id'
            >
              <v-list-item-action>
                <v-icon
                  v-if='position.ingredient.available'
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
              <v-list-item-content>
                <v-list-item-title>
                  {{ position.ingredient.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ position.amount }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip bottom>
                  <template #activator='{ on, attrs }'>
                    <v-icon
                      v-if="position.ingredient.description !== ''"
                      v-bind='attrs'
                      v-on='on'
                    >
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span>
                    {{ position.ingredient.description }}
                  </span>
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import events from '../../config/events';

export default {
    name: 'SimpleDrink',
    props: {
        drink: {
            type: Object,
            required: true
        }
    },
    computed: {
        tags: function () {
            return this.drink.tags.map(tag => this.$store.getters.tagById(tag));
        },
        positions: function () {
            return this.drink.positions.map(position => {
                return {
                    id: position.id,
                    amount: position.amount,
                    ingredient: this.$store.getters.ingredientById(position.ingredientId)
                };
            });
        }
    },
    methods: {
        selected: function () {
            this.$emit(events.remove, this.drink.id);
        }
    }
};
</script>
<style scoped>
.theme--light.v-list {
    background: unset;
}

.in-masonry {
    max-width: 340px;
    margin: 0 auto;
}

.in-masonry > .v-card.glass-background:hover {
    background-color: rgba(63, 208, 239, 0.3) !important;
    transform: scale(1.1);
}

.in-masonry > .v-card.glass-background {
    transition: all .4s ease-in-out;
}
</style>