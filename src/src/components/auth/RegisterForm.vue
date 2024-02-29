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
          Zarejestruj się
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
          color='indigo darken-4'
          hide-details='auto'
          label='Hasło'
          type='password'
        />
        <v-text-field
          v-model='passwordRepeat'
          :counter='passwordLength'
          :counter-value='v => v.length'
          :error-messages='passwordErrors'
          :maxlength='passwordLength'
          class='mb-2'
          color='indigo darken-4'
          hide-details='auto'
          label='Powtórz hasło'
          type='password'
        />
        <v-btn
          :disabled='!valid'
          block
          class='glass-background'
          type='button'
          @click='submit'
        >
          Załóż konto
        </v-btn>
        <v-divider />
        <p>
          Masz już konto?
          <router-link :to='{ name: loginPath}'>
            <span class='c-pointer text--white'>
              Zaloguj się
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
import errors from '../../config/errors';

export default {
    name: 'RegisterForm',
    data: () => ({
        email: '',
        password: '',
        passwordRepeat: '',
        passwordValid: true,
        passwordRepeatValid: true,
        loginPath: names.login,
        emailLength: lengths.email,
        passwordLength: lengths.password,
        passwordErrors: []
    }),
    computed: {
        valid: function () {
            return this.email !== '' && this.passwordValid && this.passwordRepeatValid;
        }
    },
    watch: {
        password: function () {
            this.passwordValid = true;
            this.passwordRepeatValid = true;
            this.passwordErrors = [];
            if (this.password === '') {
                this.passwordValid = false;
                return;
            }
            if (this.password === this.passwordRepeat) {
                return;
            }
            this.passwordRepeatValid = false;
            this.passwordErrors = [errors.passwordDifferent];
        },
        passwordRepeat: function () {
            this.passwordErrors = [];
            this.passwordRepeatValid = true;
            if (this.password === this.passwordRepeat) {
                return;
            }
            this.passwordRepeatValid = false;
            this.passwordErrors = [errors.passwordDifferent];
        }
    },
    methods: {
        submit: function () {
            authService.register(this.email, this.password, this.passwordRepeat);
        }
    }
};
</script>
<style scoped>
@import 'shared/styles.css';
</style>