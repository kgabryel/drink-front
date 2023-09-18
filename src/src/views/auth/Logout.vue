<template>
  <div />
</template>
<script>
import {authService} from '../../services/auth.service';
import {names} from '../../router/names';

export default {
    name: 'Logout',
    mounted() {
        authService.clearTokens();
        this.$router.push({name: names.login});
    }
};
</script>
<style scoped>
</style>