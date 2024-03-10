<template>
  <v-list-item>
    <span class='d-flex w-100'>
      <v-list-item-action>
        <v-switch
          :input-value='drinksCard.active'
          color='white'
          @change='changeActive'
        />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <p class='mb-0'>
            {{ drinksCard.name }}
          </p>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon
          type='button'
          @click='showedQrCode = true'
        >
          <v-icon color='black'>
            fa-qrcode
          </v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <v-menu offset-y>
          <template #activator='{ on, attrs }'>
            <v-btn
              icon
              type='button'
              v-bind='attrs'
              v-on='on'
            >
              <v-icon color='black'>
                fa-bars
              </v-icon>
            </v-btn>
          </template>
          <v-list class='px-2 py-2 glass-background'>
            <v-list-item>
              <v-list-item-title>
                <router-link
                  :to='{ name : drinksCardEdit, params: {id: drinksCard.id} }'
                  class='black--text'
                >
                  Edytuj
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click='showedDelete = true'>
              <v-list-item-title>
                Usuń
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-action>
    </span>
    <DeleteModal
      :showed='showedDelete'
      @cancel='showedDelete = false'
      @remove='remove'
    />
    <QrCodeModal
      :showed='showedQrCode'
      :url='url'
      @cancel='showedQrCode = false'
    />
  </v-list-item>
</template>
<script>
import DeleteModal from '../layout/DeleteModal.vue';
import QrCodeModal from './QrCodeModal.vue';
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import {names} from '../../router/names';

export default {
    name: 'DrinksCard',
    components: {QrCodeModal, DeleteModal},
    props: {
        drinksCard: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        showedDelete: false,
        showedQrCode: false,
        drinksCardEdit: names.editDrinksCard,
    }),
    computed: {
        url: function () {
            return `${process.env.VUE_APP_FRONT_URL}public/drinks-cards/${this.drinksCard.publicId}`;
        }
    },
    methods: {
        changeActive: function () {
            this.$store.dispatch(actionsNames.modifyDrinksCardActivity, {
                id: this.drinksCard.id,
                active: !this.drinksCard.active
            })
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinksCardUpdated);
                    return true;
                })
                .catch(() => true);
        },
        remove: function () {
            this.$store.dispatch(actionsNames.deleteDrinksCard, this.drinksCard.id)
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinksCardDeleted);
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