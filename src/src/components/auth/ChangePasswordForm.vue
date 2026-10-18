<script setup lang="ts">
import { useChangePassword } from '@composables/auth/useChangePassword';
import lengths from '@config/lengths';

import loginHorizontal from '@/assets/login-horizontal.jpg';
import loginVertical from '@/assets/login.jpg';
import { names } from '@/router/names';

// setup
const loginPath: string = names.login;
const passwordLength: number = lengths.password;

// composables
const { change, passwordErrors, state, valid } = useChangePassword();
</script>

<template>
  <div class="w-100 h-100 d-grid justify-center align-content-center px-4">
    <v-form class="px-4 py-4 my-4 glass-background">
      <img
        :src="loginVertical"
        class="vertical h-auto"
      />
      <img
        :src="loginHorizontal"
        class="horizontal w-100 h-auto"
      />
      <div class="ml-sm-4 form-container">
        <h1>Zmień hasło</h1>
        <v-text-field
          v-model="state.password"
          :counter="passwordLength"
          :maxlength="passwordLength"
          label="Nowe hasło"
          type="password"
        />
        <v-text-field
          v-model="state.passwordRepeat"
          :counter="passwordLength"
          :error-messages="passwordErrors"
          :maxlength="passwordLength"
          class="mb-2"
          label="Powtórz hasło"
          type="password"
        />
        <v-btn
          :disabled="!valid"
          block
          class="glass-background"
          type="button"
          @click="change"
        >
          Zmień hasło
        </v-btn>
        <p>
          <router-link :to="{ name: loginPath }">
            <span class="c-pointer text-white">Powrót</span>
          </router-link>
        </p>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
@import 'shared/styles.css';
</style>
