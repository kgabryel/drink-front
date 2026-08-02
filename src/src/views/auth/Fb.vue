<template>
  <div />
</template>
<script>
import {authService} from '../../services/auth.service';
import {names} from '../../router/names';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import router from '../../router';

export default {
    name: 'Fb',
    mounted() {
        let authToken = this.$route.query.code;
        if (authToken !== undefined) {
            this.login(authToken);
        } else {
            this.redirect();
        }
    },
    methods: {
        redirect: () => router.push({name: names.login}).then(() => bus.$emit(events.errorMessage, messages.authorizationError)),
        login: function (authToken) {
            authService.loginViaFb(authToken).then(tokens => {
                if (!tokens.isCorrect) {
                    this.redirect();
                    return;
                }
                authService.storeTokens(tokens.token, tokens.refresh_token);
                router.push({name: names.allDrinks});
            });
        }
    }
};
</script>
<style scoped>
</style>