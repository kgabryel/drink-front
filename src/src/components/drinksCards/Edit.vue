<template>
  <div>
    <Form
      :button-text='"Aktualizuj"'
      :default-name='drinksCard.name'
      :default-active='drinksCard.active'
      :default-available-drinks='drinksCard.availableDrinks'
      :default-excluded-drinks='drinksCard.excludedDrinks'
      :default-available-tags='drinksCard.availableTags'
      :default-excluded-tags='drinksCard.excludedTags'
      :default-available-ingredients='drinksCard.availableIngredients'
      :default-excluded-ingredients='drinksCard.excludedIngredients'
      :showed='true'
      @submitted='update'
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
    props: {
      drinksCard: {
          type: Object,
          required: true
      }
    },
    methods: {
        update: function (data) {
            const drinksCard = {
                id: this.drinksCard.id,
                data: data
            };
            this.$store.dispatch(actionsNames.updateDrinksCard, drinksCard)
                .then(() => {
                    bus.$emit(events.successMessage, messages.drinksCardUpdated);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
</style>