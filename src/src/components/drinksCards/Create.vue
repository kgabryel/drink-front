<template>
  <div>
    <Form
      :button-text='"Dodaj"'
      @submitted='create'
    />
  </div>
</template>
<script>
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import {names} from '../../router/names';
import Form from './Form.vue';

export default {
    name: 'Create',
    components: {Form},
    methods: {
        create: function (data) {
            this.$store.dispatch(actionsNames.addDrinksCard, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinksCardAdded);
                    this.$router.push({name: names.allDrinksCards});
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>