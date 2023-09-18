<template>
  <div class='pa-2'>
    <p class='mb-1'>
      {{ apiKey.key }}
    </p>
    <div class='active-small mb-2 justify-center'>
      <v-switch
        v-model='active'
        class='mt-0'
        color='white'
        hide-details
        label='Aktywny'
        @change='switchKey' />
    </div>
    <div class='d-flex justify-space-between align-center actions'>
      <v-btn
        class='text-center glass-background'
        type='button'
        @click='copy'>
        <v-icon class='mr-3 icon '>
          mdi-content-copy
        </v-icon>
        Kopiuj
      </v-btn>
      <div class='active-big'>
        <v-switch
          v-model='active'
          class='mt-0'
          color='white'
          hide-details
          label='Aktywny'
          @change='switchKey' />
      </div>
      <DeleteButton @remove='remove()' />
    </div>
  </div>
</template>
<script>
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import DeleteButton from '../layout/DeleteButton';

export default {
    name: 'ApiKey',
    components: {DeleteButton},
    props: {
        apiKey: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        active: false
    }),
    mounted() {
        this.active = this.apiKey.active;
    },
    methods: {
        switchKey: function () {
            this.$store.dispatch(actionsNames.switchApiKey, this.apiKey.id)
                .then(() => {
                    bus.$emit(events.successMessage, messages.apiKeyUpdated);
                    return true;
                })
                .catch(() => true);
        },
        copy: function () {
            let container = this.$refs.container;
            this.$copyText(this.apiKey.key, container);
            bus.$emit(events.successMessage, messages.apiKeyCopied);
        },
        remove: function () {
            this.$store.dispatch(actionsNames.deleteApiKey, this.apiKey.id)
                .then(() => {
                    bus.$emit(events.successMessage, messages.apiKeyDeleted);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
p {
    overflow-wrap: break-word;
}

.active-small {
    display: none !important;
}

@media screen and (max-width: 400px) {
    .active-big {
        display: none;
    }

    .active-small {
        display: flex !important;
    }
}
</style>