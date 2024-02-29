<template>
  <div>
    <div class='content-container px-2 pb-2 mb-2 mt-2 glass-background text-center'>
      <h2>
        Zmiana hasła
      </h2>
      <v-text-field
        v-model='oldPassword'
        :counter='maxLength'
        :counter-value='v => v.length'
        :maxlength='maxLength'
        color='indigo darken-4'
        hide-details='auto'
        label='Aktualnie hasło'
        type='password' />
      <v-text-field
        v-model='newPassword'
        :counter='maxLength'
        :counter-value='v => v.length'
        :error-messages='newPasswordErrors'
        :maxlength='maxLength'
        color='indigo darken-4'
        hide-details='auto'
        label='Nowe hasło'
        type='password' />
      <v-text-field
        v-model='newPasswordRepeat'
        :counter='maxLength'
        :counter-value='v => v.length'
        :error-messages='newPasswordRepeatErrors'
        :maxlength='maxLength'
        class='mb-2'
        color='indigo darken-4'
        hide-details='auto'
        label='Powtórz hasło'
        type='password' />
      <v-btn
        :disabled='!valid'
        block
        class='text-center glass-background'
        type='button'
        @click='change'>
        Zmień hasło
      </v-btn>
    </div>
  </div>
</template>
<script>
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import lengths from '../../config/lengths';
import errors from '../../config/errors';

export default {
    name: 'ChangePassword',
    data: () => ({
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
        oldPasswordValid: false,
        newPasswordValid: true,
        newPasswordRepeatValid: true,
        maxLength: lengths.password,
        newPasswordRepeatErrors: [],
        newPasswordErrors: []
    }),
    computed: {
        valid: function () {
            return this.oldPasswordValid && this.newPasswordValid && this.newPasswordRepeatValid;
        }
    },
    watch: {
        oldPassword: function () {
            this.oldPasswordValid = this.oldPassword !== '';
            this.newPasswordValid = true;
            this.newPasswordErrors = [];
            if (this.newPassword === this.oldPassword) {
                this.newPasswordValid = false;
                this.newPasswordErrors = [errors.samePassword];
            }
        },
        newPassword: function () {
            this.newPasswordValid = true;
            this.newPasswordRepeatValid = true;
            this.newPasswordRepeatErrors = [];
            this.newPasswordErrors = [];
            if (this.newPassword === '') {
                this.newPasswordValid = false;
                return;
            }
            if (this.newPassword === this.oldPassword) {
                this.newPasswordValid = false;
                this.newPasswordErrors = [errors.samePassword];
            }
            if (this.newPassword === this.newPasswordRepeat) {
                return;
            }
            this.newPasswordRepeatValid = false;
            this.newPasswordRepeatErrors = [errors.passwordDifferent];
        },
        newPasswordRepeat: function () {
            this.newPasswordRepeatErrors = [];
            this.newPasswordRepeatValid = true;
            if (this.newPassword === this.newPasswordRepeat) {
                return;
            }
            this.newPasswordRepeatValid = false;
            this.newPasswordRepeatErrors = [errors.passwordDifferent];
        }
    },
    methods: {
        change: function () {
            const data = {
                oldPassword: this.oldPassword,
                newPassword: {
                    first: this.newPassword,
                    second: this.newPasswordRepeat
                }
            };
            this.$store.dispatch(actionsNames.changePassword, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.passwordChanged);
                    this.oldPassword = '';
                    this.newPassword = '';
                    this.newPasswordRepeat = '';
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
</style>