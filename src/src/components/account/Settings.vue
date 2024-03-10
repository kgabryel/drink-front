<template>
  <div class='content-container px-2 mb-2 mt-2 glass-background text-center'>
    <h2>
      Ustawienia
    </h2>
    <v-switch
      :input-value='onlyAvailable'
      class='mt-0'
      color='white'
      label='Domyślnie tylko dostępne'
      @change='switchOnlyAvailable'
    />
    <div class='d-flex'>
      <v-text-field
        v-model='key'
        :counter='maxKeyLength'
        :counter-value='v => v.length'
        class='mb-2 mt-2'
        color='indigo darken-4'
        dense
        label='Klucz OZA'
      />
      <v-btn
        icon
        type='button'
      >
        <v-icon
          color='black'
          @click='updateOzaKey'
        >
          fa-floppy-o
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import lengths from '../../config/lengths';

export default {
    name: 'Settings',
    data: () => ({
        maxKeyLength: lengths.key,
        key: ''
    }),
    computed: {
        ...mapGetters(['onlyAvailable', 'ozaKey'])
    },
    mounted() {
        this.key = this.ozaKey ?? '';
    },
    methods: {
        switchOnlyAvailable: function () {
            this.$store.dispatch(actionsNames.switchOnlyAvailable)
                .then(() => {
                    bus.$emit(events.successMessage, messages.settingsUpdated);
                    return true;
                });
        },
        updateOzaKey: function () {
            this.$store.dispatch(actionsNames.changeOzaKey, {key: this.key})
                .then(() => {
                    bus.$emit(events.successMessage, messages.ozaKeyUpdate);
                    return true;
                });
        }
    }
};
</script>
<style scoped>
</style>