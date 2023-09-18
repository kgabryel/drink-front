<template>
  <v-img
    :height='150'
    :max-height='150'
    :max-width='200'
    :src='photoData'
    :width='200'
    contain />
</template>
<script>
import axios from 'axios';
import {routes} from '../../router/routes';

export default {
    name: 'Thumbnail',
    props: {
        photo: {
            type: Object,
            required: true
        },
        drinkId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        photoData: ''
    }),
    mounted() {
        axios
            .get(routes.getPhoto('small', this.drinkId, this.photo.id), {responseType: 'arraybuffer'})
            .then(response => this.photoData = `data:${this.photo.type};base64,` + Buffer.from(response.data, 'binary')
                .toString('base64')
            );
    }
};
</script>
<style scoped>
</style>