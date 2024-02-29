<template>
  <v-list-item>
    <span class='d-flex w-100'>
      <v-list-item-action>
        <v-switch
          :input-value='tag.public'
          color='white'
          @change='changePublic' />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <span>
            {{ tag.name }}
          </span>
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
              v-if='tag.drinksCount > 0'
              :href='tag | tagDrinksHref'>
              <v-list-item-title>
                Lista drinków ({{ tag.drinksCount }})
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click='startEdit'>
              <v-list-item-title>
                Edytuj
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
import DeleteModal from '../layout/DeleteModal';

export default {
    name: 'Preview',
    components: {DeleteModal},
    props: {
        tag: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        showed: false
    }),
    methods: {
        startEdit: function () {
            this.$emit(events.startEdit);
        },
        remove: function () {
            this.$store.dispatch(actionsNames.deleteTag, this.tag.id)
                .then(() => {
                    bus.$emit(events.successMessage, messages.tagDeleted);
                    return true;
                })
                .catch(() => true);
        },
        changePublic: function () {
            const data = {
                id: this.tag.id,
                public: !this.tag.public
            };
            this.$store.dispatch(actionsNames.updateTagPublic, data)
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
.glass-background {
    background-color: rgba(255, 255, 255, .8) !important;
}
</style>