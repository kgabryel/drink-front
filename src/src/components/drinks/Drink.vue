<template>
  <div
    ref='card'
    :class="{'in-masonry': !fullWidth, 'w-100': fullWidth}"
    class='px-2 py-2'
  >
    <v-card class='glass-background'>
      <v-app-bar flat>
        <v-toolbar-title>
          {{ drink.name }}
        </v-toolbar-title>
      </v-app-bar>
      <v-app-bar flat>
        <v-spacer />
        <v-tooltip bottom>
          <template #activator='{ on, attrs }'>
            <v-btn
              :disabled='!drink.public'
              icon
              type='button'
              v-bind='attrs'
              @click='copyPath'
              v-on='on'
            >
              <v-icon color='black'>
                mdi-share-variant
              </v-icon>
            </v-btn>
          </template>
          <span>
            Udostępnij
          </span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator='{ on, attrs }'>
            <v-btn
              icon
              type='button'
              v-bind='attrs'
              @click='updateFavourite'
              v-on='on'
            >
              <v-icon
                v-if='!drink.favourite'
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
        <v-tooltip
          v-if='previewAvailable'
          bottom
        >
          <template #activator='{ on, attrs }'>
            <router-link :to='{ name : drinkPreview, params: {id: drink.id} }'>
              <v-btn
                color='black'
                icon
                type='button'
                v-bind='attrs'
                v-on='on'
              >
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </router-link>
          </template>
          <span>
            Podgląd
          </span>
        </v-tooltip>
        <DeleteIcon @remove='remove' />
        <v-tooltip bottom>
          <template #activator='{ on, attrs }'>
            <router-link
              :to='{ name : drinkEdit, params: {id: drink.id} }'
              type='button'
            >
              <v-btn
                color='black'
                icon
                v-bind='attrs'
                v-on='on'
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </router-link>
          </template>
          <span>
            Edytuj
          </span>
        </v-tooltip>
      </v-app-bar>
      <div>
        <v-carousel
          v-if='drink.photos.length > 0'
          :height='height'
          :show-arrows='drink.photos.length > 1'
          hide-delimiters
          show-arrows-on-hover
        >
          <CarouselItem
            v-for='photo in drink.photos'
            :key='photo.id'
            :drink-id='drink.id'
            :photo='photo'
          />
        </v-carousel>
      </div>
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
import {bus} from '../../main';
import {names} from '../../router/names';
import events from '../../config/events';
import messages from '../../config/messages';
import {actionsNames} from '../../store/actions';
import CarouselItem from './CarouselItem';
import DeleteIcon from '../layout/DeleteIcon';

export default {
    name: 'Drink',
    components: {DeleteIcon, CarouselItem},
    props: {
        drink: {
            type: Object,
            required: true
        },
        previewAvailable: {
            type: Boolean,
            default: true
        },
        fullWidth: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        drinkPreview: names.drink,
        drinkEdit: names.editDrink,
        height: '0px'
    }),
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
    mounted() {
        window.addEventListener('resize', this.resize);
        this.resize();
    },
    methods: {
        updateFavourite: function () {
            const data = {
                id: this.drink.id,
                favourite: !this.drink.favourite
            };
            this.$store.dispatch(actionsNames.updateDrinkFavourite, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinkUpdated);
                    return true;
                })
                .catch(() => true);
        },
        resize: function () {
            if (this.$refs.card?.offsetWidth) {
                this.height = `${this.$refs.card.offsetWidth * (3 / 4)}px`;
            } else {
                this.height = '0px';
            }
        },
        remove: function () {
            this.$store.dispatch(actionsNames.deleteDrink, this.drink.id)
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinkDeleted);
                    return true;
                })
                .catch(() => true);
        },
        copyPath: function () {
            let container = this.$refs.container;
            this.$copyText(`${process.env.VUE_APP_FRONT_URL}public/${this.drink.publicId}`, container);
            bus.$emit(events.successMessage, messages.copied);
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