<template>
  <div class='w-100'>
    <div class='px-2 buttons'>
      <v-btn
        class='glass-background'
        type='button'
        @click='clear'
      >
        Wyczyść
      </v-btn>
      <v-btn
        class='glass-background mr-2'
        type='button'
        @click='close'
      >
        Zamknij
      </v-btn>
    </div>
    <v-text-field
      v-model='name'
      :maxlength='maxLength'
      class='mb-2 mt-3 pt-1'
      color='indigo darken-4'
      dense
      label='Nazwa'
      required
    />
    <v-btn
      class='glass-background w-100'
      type='button'
      @click='search'
    >
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
        maxLength: lengths.tag
    }),
    mounted() {
        if (this.name !== null) {
            this.search();
        }
    },
    methods: {
        clear: function () {
            this.name = '';
            this.search();
        },
        close: () => bus.$emit(events.closeSearch),
        search: function () {
            bus.$emit(events.tagsSearch, this.name);
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