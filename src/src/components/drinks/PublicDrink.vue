<template>
  <div
    ref='card'
    :class="{'in-masonry': !fullWidth, 'full-width': fullWidth}"
    class='px-2 py-2'
  >
    <v-card class='glass-background'>
      <v-app-bar flat>
        <v-toolbar-title>
          {{ drink.name }}
        </v-toolbar-title>
      </v-app-bar>
      <v-carousel
        v-if='drink.photos.length > 0'
        :height='height'
        :show-arrows='drink.photos.length > 1'
        hide-delimiters
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for='photo in drink.photos'
          :key='photo.id'
          :src='getUrl(photo)'
          class='c-pointer'
          @click.native='open(photo)'
        />
      </v-carousel>
      <v-card-text class='pt-0'>
        <p
          v-if="drink.description !== null && drink.description !== ''"
          class='text--black'
        >
          {{ drink.description }}
        </p>
        <div>
          <v-chip
            v-for='(tag, index) in drink.tags'
            :key='index'
            class='ma-2 glass-background'
            label
          >
            {{ tag }}
          </v-chip>
        </div>
        <div>
          <v-list
            v-if='drink.positions.length > 0'
            two-line
          >
            <v-list-item
              v-for='position in drink.positions'
              :key='position.id'
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ position.ingredient }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ position.amount }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip bottom>
                  <template #activator='{ on, attrs }'>
                    <v-icon
                      v-if="position.ingredientDescription !== ''"
                      v-bind='attrs'
                      v-on='on'
                    >
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span>
                    {{ position.ingredientDescription }}
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
import {names} from '../../router/names';
import {bus} from '../../main';
import events from '../../config/events';
import {routes} from '../../router/routes';

export default {
    name: 'PublicDrink',
    props: {
        drink: {
            type: Object,
            required: true
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
    mounted() {
        window.addEventListener('resize', this.resize);
        this.resize();
    },
    methods: {
        resize: function () {
            if (this.$refs.card.offsetWidth) {
                this.height = `${this.$refs.card.offsetWidth / 2}px`;
            } else {
                this.height = '0px';
            }
        },
        open: function (photo) {
            bus.$emit(events.showPhoto, photo);
        },
        getUrl: function (photo) {
            return routes.getPhoto('medium', this.drink.id, photo.id);
        }
    }
};
</script>
<style scoped>
.full-width {
    max-width: 800px;
    margin: 0 auto;
}

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