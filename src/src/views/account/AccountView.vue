<script setup lang="ts">
import type { ApiKeysStore } from '@store/api-keys';
import type { SettingsStore } from '@store/settings';
import type { ComputedRef } from 'vue';

import AccountSettings from '@components/account/AccountSettings.vue';
import ApiKey from '@components/account/ApiKey.vue';
import ChangePasswordForm from '@components/account/ChangePasswordForm.vue';
import GenerateKeyButton from '@components/account/GenerateKeyButton.vue';
import LogoutButton from '@components/account/LogoutButton.vue';
import { computed } from 'vue';

import type { ApiKey as ApiKeyModel } from '@/api/response';

import { useApiKeysStore, useSettingsStore } from '@/store';

// setup
const apiKeyStore: ApiKeysStore = useApiKeysStore();
const settingsStore: SettingsStore = useSettingsStore();

// computed
const apiKeys: ComputedRef<ApiKeyModel[]> = computed(() => apiKeyStore.apiKeys);

const userType: ComputedRef<string> = computed(() => settingsStore.userType);
</script>

<template>
  <div class="content-container px-2">
    <LogoutButton class="mb-2" />
    <AccountSettings />
    <div v-if="apiKeys.length > 0" class="glass-background mt-2">
      <div v-for="apiKey in apiKeys" :key="apiKey.id" class="api-key">
        <ApiKey :api-key="apiKey" />
        <v-divider class="mx-4" />
      </div>
    </div>
    <GenerateKeyButton class="mt-2 mb-2" />
    <ChangePasswordForm v-if="userType === 'standard'" />
  </div>
</template>

<style scoped>
:deep(.api-key:last-child) > div {
  padding-bottom: 0;
}

:deep(.api-key:first-child) > div {
  padding-top: 4px;
}
</style>
