<template>
  <div>
    <v-tooltip bottom>
      <template #activator='{ on, attrs }'>
        <v-btn
          color='black'
          icon
          type='button'
          v-bind='attrs'
          @click='showed = true'
          v-on='on'>
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <span>
        Usuń
      </span>
    </v-tooltip>
    <DeleteModal
      :showed='showed'
      @cancel='showed = false'
      @remove='remove()' />
  </div>
</template>
<script>
import events from '../../config/events';
import DeleteModal from './DeleteModal';

export default {
    name: 'DeleteIcon',
    components: {DeleteModal},
    data: () => ({
        showed: false
    }),
    methods: {
        remove: function () {
            this.$emit(events.remove);
            this.showed = false;
        }
    }
};
</script>
<style scoped>
</style>