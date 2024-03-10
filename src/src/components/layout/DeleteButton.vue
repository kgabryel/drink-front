<template>
  <div>
    <v-btn
      class='text-center glass-background red-glass'
      type='button'
      @click='showed = true'
    >
      <v-icon class='mr-3 icon '>
        mdi-delete
      </v-icon>
      Usuń
    </v-btn>
    <DeleteModal
      :showed='showed'
      @cancel='showed = false'
      @remove='remove'
    />
  </div>
</template>
<script>
import events from '../../config/events';
import DeleteModal from './DeleteModal';

export default {
    name: 'DeleteButton',
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