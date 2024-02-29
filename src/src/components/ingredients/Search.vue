<template>
  <div>
    <div class='px-2 buttons'>
      <v-btn
        class='glass-background'
        type='button'
        @click='clear'>
        Wyczyść
      </v-btn>
      <v-btn
        class='glass-background mr-2'
        type='button'
        @click='close'>
        Zamknij
      </v-btn>
    </div>
    <div class='d-flex my-2'>
      <v-text-field
        v-model='name'
        :maxlength='maxLength'
        class='mb-2 mt-2 mr-2'
        color='indigo darken-4'
        dense
        hide-details
        label='Nazwa'
        required />
    </div>
    <div class='overflow-hidden'>
      <v-select
        v-model='available'
        :items='items'
        color='indigo darken-4'
        item-text='text'
        item-value='value'
        label='Dostępne' />
    </div>
    <v-btn
      class='glass-background w-100'
      type='button'
      @click='search'>
      Szukaj
    </v-btn>
  </div>
</template>
<script>
import {bus} from '../../main';
import events from '../../config/events';
import lengths from '../../config/lengths';

export default {
    name: 'Search',
    data: () => ({
        name: '',
        available: null,
        maxLength: lengths.ingredientName,
        items: [{value: null, text: '-'}, {value: true, text: 'Tak'}, {value: false, text: 'Nie'}]
    }),
    mounted() {
        if (this.name !== '' || this.available !== null) {
            this.search();
        }
    },
    methods: {
        search: function () {
            bus.$emit(events.ingredientsSearch, {
                name: this.name,
                available: this.available
            });
        },
        close: () => bus.$emit(events.closeSearch),
        clear: function () {
            this.name = '';
            this.available = null;
            this.search();
        }
    }
};
</script>
<style scoped>
.buttons {
    display: flex;
    justify-content: space-between;
}

.buttons > * {
    width: calc(50% - 10px);
}
</style>