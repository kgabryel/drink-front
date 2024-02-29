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
          Zaloguj się
        </h1>
        <v-text-field
          v-model='email'
          :counter='emailLength'
          :counter-value='v => v.length'
          :maxlength='emailLength'
          color='indigo darken-4'
          hide-details='auto'
          label='E-mail'
          type='email'
        />
        <v-text-field
          v-model='password'
          :counter='passwordLength'
          :counter-value='v => v.length'
          :maxlength='passwordLength'
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          label='Hasło'
          type='password'
        />
        <v-btn
          :disabled='!valid'
          block
          class='glass-background'
          type='button'
          @click='submit'
        >
          Zaloguj się
        </v-btn>
        <v-divider />
        <v-btn
          block
          class='mb-1 glass-background blue-glass'
          type='button'
          @click='fbRedirect'
        >
          <v-icon left>
            mdi-facebook
          </v-icon>
          Zaloguj przez FB
        </v-btn>
        <p class='mb-0'>
          Nie masz konta?
          <router-link :to='{ name: registerPath }'>
            <span class='c-pointer text--white'>
              Zarejestruj się
            </span>
          </router-link>
        </p>
        <p>
          <router-link :to='{ name: resetPasswordPath }'>
            <span class='c-pointer text--white'>
              Nie pamiętasz hasła?
            </span>
          </router-link>
        </p>
      </div>
    </v-form>
  </div>
</template>
<script>
import {authService} from '../../services/auth.service';
import {names} from '../../router/names';
import lengths from '../../config/lengths';

export default {
    name: 'LoginForm',
    data: () => ({
        email: '',
        password: '',
        registerPath: names.register,
        resetPasswordPath: names.resetPassword,
        emailLength: lengths.email,
        passwordLength: lengths.password
    }),
    computed: {
        valid: function () {
            return this.email !== '' && this.password !== '';
        }
    },
    methods: {
        submit: function () {
            authService.login(this.email, this.password);
        },
        fbRedirect: () => authService.fbRedirect()
    }
};
</script>
<style scoped>
@import 'shared/styles.css';
</style>