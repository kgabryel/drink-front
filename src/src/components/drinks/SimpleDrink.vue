<template>
  <div
    :class="{'in-masonry': !fullWidth, 'w-100': fullWidth}"
    class='px-2 py-2'>
    <v-card class='glass-background'>
      <v-app-bar flat>
        <v-toolbar-title>
          {{ drink.name }}
        </v-toolbar-title>
      </v-app-bar>
      <v-card-text class='pt-0'>
        <p class='text--black'>
          {{ drink.description }}
        </p>
        <div>
          <v-list
            v-if='drink.ingredients.length > 0'
            two-line>
            <v-list-item
              v-for='position in drink.ingredients'
              :key='position.id'>
              <v-list-item-content>
                <v-list-item-title>
                  {{ position.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ position.amount }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip bottom>
                  <template #activator='{ on, attrs }'>
                    <v-icon
                      v-if="position.description !== ''"
                      v-bind='attrs'
                      v-on='on'>
                      mdi-help-circle
                    </v-icon>
                  </template>
                  <span>
                    {{ position.description }}
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
export default {
    name: 'SimpleDrink',
    props: {
        drink: {
            type: Object,
            required: true
        },
        fullWidth: {
            type: Boolean,
            default: true
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