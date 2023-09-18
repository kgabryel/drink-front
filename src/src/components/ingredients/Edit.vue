<template>
  <v-list-item>
    <span class='d-flex w-100'>
      <v-list-item-action @click='stopEdit'>
        <v-btn
          icon
          type='button'>
          <v-icon color='black'>
            fa-times
          </v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content class='pb-0'>
        <div>
          <v-text-field
            v-model='name'
            :counter='maxLength'
            :counter-value='v => v.length'
            :error-messages='errors'
            :maxlength='maxLength'
            color='indigo darken-4'
            dense
            label='Nazwa'
            required />
        </div>
        <v-textarea
          v-model='description'
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          label='Opis'
          rows='2' />
      </v-list-item-content>
      <v-list-item-action @click='update'>
        <v-btn
          :disabled='!valid'
          icon
          type='button'>
          <v-icon color='black'>
            fa-floppy-o
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </span>
  </v-list-item>
</template>
<script>
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import {actionsNames} from '../../store/actions';
import lengths from '../../config/lengths';
import errors from '../../config/errors';

export default {
    name: 'Edit',
    props: {
        ingredient: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        name: '',
        description: '',
        valid: true,
        errors: [],
        maxLength: lengths.ingredientName
    }),
    watch: {
        name: function () {
            this.valid = true;
            this.errors = [];
            if (this.name === '') {
                this.valid = false;
                return;
            }
            let ingredient = this.$store.getters.ingredientByName(this.name);
            if (ingredient !== undefined && ingredient.id !== this.ingredient.id) {
                this.valid = false;
                this.errors = [errors.ingredientExists];
            }
        }
    },
    mounted() {
        this.name = this.ingredient.name;
        this.description = this.ingredient.description;
    },
    methods: {
        stopEdit: function () {
            this.$emit(events.stopEdit);
        },
        update: function () {
            if (!this.valid) {
                return;
            }
            const data = {
                id: this.ingredient.id,
                name: this.name,
                description: this.description
            };
            this.$store.dispatch(actionsNames.updateIngredient, data)
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
</style>