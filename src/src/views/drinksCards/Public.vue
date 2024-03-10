<template>
  <div>
    <v-app-bar class='glass-background header d-flex justify-center'>
      <v-btn
        class='glass-background btn'
        icon
        type='button'
        @click='showed = true'
      >
        <v-icon color='black'>
          fa-qrcode
        </v-icon>
      </v-btn>
    </v-app-bar>
    <div class='content'>
      <Loader v-if='!loaded' />
      <div v-if='loaded'>
        <masonry-wall
          :column-width='330'
          :items='drinks'
          :padding='16'
        >
          <template #default='{item}'>
            <PublicDrink
              :drink='item'
              :full-width='false'
            />
          </template>
        </masonry-wall>
      </div>
    </div>
    <QrCodeModal
      :showed='showed'
      :url='url'
      @cancel='showed = false'
    />
  </div>
</template>
<script>
import axios from 'axios';
import {routes} from '../../router/routes';
import {names} from '../../router/names';
import Loader from '../../components/drinks/Loader.vue';
import PublicDrink from '../../components/drinks/PublicDrink.vue';
import MasonryWall from '@yeger/vue2-masonry-wall';
import QrCodeModal from '../../components/drinksCards/QrCodeModal.vue';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';

export default {
    name: 'Public',
    components: {QrCodeModal, PublicDrink, Loader, MasonryWall},
    data: () => ({
        loaded: false,
        drinks: [],
        showed: false,
        url: ''
    }),
    mounted() {
        let id = this.$route.params.id ?? '';
        this.url = location.href;
        axios
            .get(routes.drinksCardById(id))
            .then(response => {
                this.drinks = response.data;
                this.loaded = true;
            })
            .catch((exception) => {
                if(exception.status === 423) {
                    bus.$emit(events.errorMessage, messages.drinksCardUnavailable);
                    this.$router.push({name: names.allDrinks});
                } else if(exception.status === 404){
                    this.$router.push({name: names.notFound});
                } else {
                    bus.$emit(events.errorMessage, messages.serverError);
                    this.$router.push({name: names.allDrinks});
                }
            });
    }
};
</script>
<style scoped>
.masonry-wall {
    padding: 0 15px;
}

.header {
    position: fixed;
    z-index: 10;
}

.btn {
    height: 36px !important;
    width: 36px !important;
}

.content {
    margin-top: 80px;
}
</style>