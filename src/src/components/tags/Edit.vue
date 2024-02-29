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
      </v-list-item-content>
      <v-list-item-action @click='update'>
        <v-btn
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
        tag: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        name: '',
        valid: true,
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
            let tag = this.$store.getters.tagByName(this.name);
            if (tag !== undefined && tag.id !== this.tag.id) {
                this.valid = false;
                this.errors = [errors.tagExists];
            }
        }
    },
    mounted() {
        this.name = this.tag.name;
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
                id: this.tag.id,
                name: this.name
            };
            this.$store.dispatch(actionsNames.updateTag, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.tagUpdated);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>