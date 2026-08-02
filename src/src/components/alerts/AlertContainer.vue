<template>
  <div />
</template>
<script>
import {bus} from '../../main';
import events from '../../config/events';
import {TYPE} from 'vue-toastification';
import Vue from 'vue';

export default {
    name: 'AlertContainer',
    mounted() {
        bus.$on(events.successMessage, message => this.showSuccessMessage(message));
        bus.$on(events.errorMessage, message => this.showErrorMessage(message));
    },
    methods: {
        showSuccessMessage: function (message) {
            Vue.$toast(message, {
                timeout: this.timeout,
                type: TYPE.SUCCESS
            });
        },
        showErrorMessage: function (message) {
            Vue.$toast(message, {
                timeout: this.timeout,
                type: TYPE.ERROR
            });
        }
    }
};
</script>
<style scoped>
</style>