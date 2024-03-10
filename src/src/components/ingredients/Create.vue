<template>
  <div class='content-container px-2'>
    <div class='glass-background my-2 pa-2'>
      <div class='d-flex pt-1'>
        <v-text-field
          v-model='name'
          :counter='maxLength'
          :counter-value='v => v.length'
          :error-messages='errors'
          :maxlength='maxLength'
          class='mb-2 mt-2 mr-2'
          color='indigo darken-4'
          dense
          label='Nazwa'
          required
        />
        <v-switch
          v-model='available'
          class='mt-1'
          color='white'
          hide-details
          label='Dostępne'
        />
      </div>
      <div>
        <v-textarea
          v-model='description'
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          label='Opis'
          rows='2'
        />
      </div>
      <div v-if='supplies.length > 0'>
        <v-autocomplete
          v-model='ozaId'
          :filter='filter'
          :items='supplies'
          class='mb-2'
          color='indigo darken-4'
          item-text='name'
          item-value='id'
          label='Zapas'
        />
      </div>
      <div class='px-2'>
        <v-btn
          :disabled='!valid'
          block
          class='glass-background'
          type='button'
          @click='create'
        >
          Dodaj
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import {actionsNames} from '../../store/actions';
import lengths from '../../config/lengths';
import errors from '../../config/errors';
import {stringsService} from '../../services/strings.service';
import {mapGetters} from 'vuex';

export default {
    name: 'Create',
    data: () => ({
        name: '',
        description: '',
        available: false,
        valid: false,
        errors: [],
        maxLength: lengths.ingredientName,
        ozaId: null
    }),
    computed: {
        ...mapGetters(['supplies'])
    },
    watch: {
        name: function () {
            this.valid = true;
            this.errors = [];
            if (this.name === '') {
                this.valid = false;
                return;
            }
            if (this.$store.getters.ingredientByName(this.name) !== undefined) {
                this.valid = false;
                this.errors = [errors.ingredientExists];
            }
        }
    },
    methods: {
        create: function () {
            const data = {
                name: this.name,
                description: this.description,
                available: this.available,
                ozaId: this.ozaId
            };
            this.$store.dispatch(actionsNames.addIngredient, data)
                .then(() => {
                    this.name = '';
                    this.description = '';
                    this.available = false;
                    bus.$emit(events.successMessage, messages.ingredientAdded);
                    return true;
                })
                .catch(() => true);
        },
        filter: (item, queryText) => stringsService.filterStrings(item.name, queryText)
    }
};
</script>
<style scoped>
</style>