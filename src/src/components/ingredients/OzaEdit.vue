<template>
  <v-list-item>
    <span class='d-flex w-100'>
      <v-list-item-action @click='stopEdit'>
        <v-btn
          icon
          type='button'
        >
          <v-icon color='black'>
            fa-times
          </v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action @click='remove'>
        <v-btn
          :disabled='ingredient.ozaId === 0 || ingredient.ozaId === null'
          icon
          type='button'
        >
          <v-icon color='black'>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-content class='pb-0'>
        <v-autocomplete
          v-model='ozaId'
          :filter='filter'
          :items='supplies'
          class='mb-2 mx-2'
          color='indigo darken-4'
          item-text='name'
          item-value='id'
          label='Zapas'
        />
      </v-list-item-content>
      <v-list-item-action @click='update'>
        <v-btn
          :disabled='!valid'
          icon
          type='button'
        >
          <v-icon color='black'>
            fa-floppy-o
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </span>
  </v-list-item>
</template>
<script>
import events from '../../config/events';
import {stringsService} from '../../services/strings.service';
import {mapGetters} from 'vuex';
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import messages from '../../config/messages';

export default {
    name: 'OzaEdit',
    props: {
        ingredient: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        ozaId: 0,
        valid: false
    }),
    computed: {
        ...mapGetters(['supplies'])
    },
    watch: {
        ozaId: function () {
            this.valid = this.ozaId !== 0 && this.ozaId !== null;
        }
    },
    mounted() {
        this.ozaId = this.ingredient.ozaId;
    },
    methods: {
        stopEdit: function () {
            this.$emit(events.stopEdit);
        },
        remove: function () {
            const data = {
                id: this.ingredient.id,
                ozaId: null
            };
            this.$store.dispatch(actionsNames.updateOzaId, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.ingredientUpdated);
                    return true;
                })
                .catch(() => true);
            this.$emit(events.stopEdit);
        },
        update: function () {
            if (!this.valid) {
                return;
            }
            const data = {
                id: this.ingredient.id,
                ozaId: this.ozaId
            };
            this.$store.dispatch(actionsNames.updateOzaId, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.ingredientUpdated);
                    return true;
                })
                .catch(() => true);
            this.$emit(events.stopEdit);
        },
        filter: function (item, queryText) {
            return stringsService.filterStrings(item.name, queryText);
        }
    }
};
</script>
<style scoped>
</style>