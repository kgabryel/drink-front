<template>
  <v-list-item>
    <span class='d-flex w-100'>
      <v-list-item-action>
        <v-switch
          :input-value='ingredient.available'
          :readonly='ingredient.ozaId !== null && loadedSuppliesWithSuccess'
          color='white'
          @change='changeAvailable' />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <p class='mb-0'>
            {{ ingredient.name }}
          </p>
          <template v-if='ingredient.ozaId !== null && loadedSuppliesWithSuccess'>
            <small class='mb-0'>
              Dostępność zarządzana przez OZA ({{ supply.amount }})
            </small>
            <br>
          </template>
          <small class='mb-0'>
            {{ ingredient.description }}
          </small>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-menu offset-y>
          <template #activator='{ on, attrs }'>
            <v-btn
              icon
              type='button'
              v-bind='attrs'
              v-on='on'>
              <v-icon color='black'>
                fa-bars
              </v-icon>
            </v-btn>
          </template>
          <v-list class='px-2 py-2 glass-background'>
            <v-list-item
              v-if='ingredient.drinksCount > 0'
              :href='ingredient | ingredientDrinksHref'>
              <v-list-item-title>
                Lista drinków ({{ ingredient.drinksCount }})
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click='startEdit(true, false)'>
              <v-list-item-title>
                Edytuj
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled='supplies.length === 0'
              @click='startEdit(true, true)'>
              <v-list-item-title>
                Zapas OZA
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click='showed = true'>
              <v-list-item-title>
                Usuń
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </span>
    <DeleteModal
      :showed='showed'
      @cancel='showed = false'
      @remove='remove()' />
  </v-list-item>
</template>
<script>
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import {actionsNames} from '../../store/actions';
import {mapGetters} from 'vuex';
import DeleteModal from '../layout/DeleteModal';

export default {
    name: 'Preview',
    components: {DeleteModal},
    props: {
        ingredient: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showed: false,
            supply: this.$store.getters.supplyById(this.ingredient.ozaId ?? 0)
        };
    },
    computed: {
        ...mapGetters(['supplies', 'loadedSuppliesWithSuccess'])
    },
    methods: {
        startEdit: function (edit, oza) {
            this.$emit(events.startEdit, {edit, oza});
        },
        remove: function () {
            this.$store.dispatch(actionsNames.deleteIngredient, this.ingredient.id)
                .then(() => {
                    bus.$emit(events.successMessage, messages.ingredientDeleted);
                    return true;
                })
                .catch(() => true);
        },
        changeAvailable: function () {
            const data = {
                id: this.ingredient.id,
                available: !this.ingredient.available
            };
            this.$store.dispatch(actionsNames.updateIngredientAvailable, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.ingredientUpdated);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
.glass-background {
    background-color: rgba(255, 255, 255, .8) !important;
}
</style>