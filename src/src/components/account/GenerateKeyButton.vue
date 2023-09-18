<template>
  <v-btn
    block
    class='text-center glass-background'
    type='button'
    @click='generateKey'>
    <v-icon class='mr-3 icon '>
      mdi-key
    </v-icon>
    Generuj klucz
  </v-btn>
</template>
<script>
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';

export default {
    name: 'GenerateKeyButton',
    methods: {
        generateKey: function () {
            this.$store.dispatch(actionsNames.generateKey)
                .then(() => {
                    bus.$emit(events.successMessage, messages.keyGenerated);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>