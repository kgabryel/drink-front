<template>
  <div class='w-100 h-100 d-grid justify-center align-content-center'>
    <v-form class='px-4 py-4 mx-4 my-4 glass-background'>
      <img
        :src='require(`@/assets/login.jpg`)'
        class='vertical h-auto'
      >
      <img
        :src='require(`@/assets/login-horizontal.jpg`)'
        class='horizontal w-100 h-auto'
      >
      <div class='ml-sm-4 form-container'>
        <h1>
          Reset hasła
        </h1>
        <v-text-field
          v-model='email'
          :counter='emailLength'
          :counter-value='v => v.length'
          :maxlength='emailLength'
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          label='E-mail'
          type='email'
        />
        <v-btn
          :disabled='!valid'
          block
          class='glass-background'
          type='button'
          @click='submit'
        >
          Resetuj hasło
        </v-btn>
        <v-divider />
        <p>
          <router-link :to='{ name: loginPath}'>
            <span class='c-pointer text--white'>
              Powrót
            </span>
          </router-link>
        </p>
      </div>
    </v-form>
  </div>
</template>
<script>
import {names} from '../../router/names';
import {authService} from '../../services/auth.service';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import lengths from '../../config/lengths';

export default {
    name: 'ResetPasswordForm',
    data: () => ({
        email: '',
        loginPath: names.login,
        emailLength: lengths.email
    }),
    computed: {
        valid: function () {
            return this.email !== '';
        }
    },
    methods: {
        submit: function () {
            authService.resetPassword(this.email)
                .then(() => {
                    bus.$emit(events.successMessage, messages.resetEmailSent);
                    this.email = '';
                    return true;
                })
                .catch(() => {
                    bus.$emit(events.errorMessage, messages.invalidData);
                    return true;
                });
        }
    }
};
</script>
<style scoped>
@import 'shared/styles.css';
</style>