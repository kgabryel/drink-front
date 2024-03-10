<template>
  <div class='content-container px-2'>
    <div class='glass-background my-2 pa-2 pt-3'>
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
          v-model='publicTag'
          class='mt-1'
          color='white'
          hide-details
          label='Publiczny'
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

export default {
    name: 'Create',
    data: () => ({
        name: '',
        publicTag: false,
        valid: false,
        errors: [],
        maxLength: lengths.tag
    }),
    watch: {
        name: function () {
            this.valid = true;
            this.errors = [];
            if (this.name === '') {
                this.valid = false;
                return;
            }

            if (this.$store.getters.tagByName(this.name) !== undefined) {
                this.valid = false;
                this.errors = [errors.tagExists];
            }
        }
    },
    methods: {
        create: function () {
            this.$store.dispatch(actionsNames.addTag, this.name, this.publicTag)
                .then(() => {
                    this.name = '';
                    this.valid = false;
                    this.publicTag = false;
                    bus.$emit(events.successMessage, messages.tagAdded);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>