<template>
  <div class='content-container px-2'>
    <LogoutButton />
    <Settings />
    <div
      v-if='apiKeys.length > 0'
      class='glass-background'
    >
      <div
        v-for='apiKey in apiKeys'
        :key='apiKey.id'
      >
        <ApiKey :api-key='apiKey' />
        <v-divider class='mx-4' />
      </div>
    </div>
    <GenerateKeyButton class='mt-2' />
    <ChangePassword v-if="userType === 'standard'" />
  </div>
</template>
<script>
import LogoutButton from '../../components/account/LogoutButton';
import Settings from '../../components/account/Settings';
import GenerateKeyButton from '../../components/account/GenerateKeyButton';
import ApiKey from '../../components/account/ApiKey';
import {mapGetters} from 'vuex';
import ChangePassword from '../../components/account/ChangePassword';

export default {
    name: 'Account',
    components: {ChangePassword, ApiKey, GenerateKeyButton, Settings, LogoutButton},
    computed: {
        ...mapGetters(['apiKeys', 'userType'])
    }
};
</script>
<style scoped>
</style>