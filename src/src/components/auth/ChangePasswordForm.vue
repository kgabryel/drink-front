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
          Zmień hasło
        </h1>
        <v-text-field
          v-model='password'
          :counter='passwordLength'
          :counter-value='v => v.length'
          :maxlength='passwordLength'
          color='indigo darken-4'
          hide-details='auto'
          label='Nowe hasło'
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
          Zmień hasło
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
import lengths from '../../config/lengths';
import errors from '../../config/errors';
import {authService} from '../../services/auth.service';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';

export default {
    name: 'ChangePasswordForm',
    data: () => ({
        password: '',
        passwordRepeat: '',
        passwordValid: false,
        passwordRepeatValid: true,
        loginPath: names.login,
        passwordLength: lengths.password,
        passwordErrors: [],
        token: ''
    }),
    computed: {
        valid: function () {
            return this.passwordValid && this.passwordRepeatValid;
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
    mounted() {
        this.token = this.$route.params.token;
        authService.checkToken(this.token);
    },
    methods: {
        submit: function () {
            authService.changePassword(this.token, this.password, this.passwordRepeat)
                .then(() => {
                    bus.$emit(events.successMessage, messages.passwordChanged);
                    this.$router.push({name: names.login});
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