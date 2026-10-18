<script setup lang="ts">
import { useLogin } from '@composables/auth/useLogin';
import lengths from '@config/lengths';
import { authService } from '@services/auth.service';

import loginHorizontal from '@/assets/login-horizontal.jpg';
import loginVertical from '@/assets/login.jpg';
import { names } from '@/router/names';

// setup
const registerPath: string = names.register;
const resetPasswordPath: string = names.resetPassword;
const emailLength: number = lengths.email;
const passwordLength: number = lengths.password;

// composables
const { login, state, valid } = useLogin();

// actions
function fbRedirect(): void {
  authService.fbRedirect();
}
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
      <div class="form-container w-100 px-2">
        <h1>Zaloguj się</h1>
        <v-text-field
          v-model="state.email"
          :counter="emailLength"
          :maxlength="emailLength"
          label="E-mail"
          type="email"
        />
        <v-text-field
          v-model="state.password"
          :counter="passwordLength"
          :maxlength="passwordLength"
          class="mb-2"
          label="Hasło"
          type="password"
        />
        <v-btn
          :disabled="!valid"
          block
          class="glass-background"
          type="button"
          @click="login"
        >
          Zaloguj się
        </v-btn>
        <v-btn
          block
          class="mb-1 glass-background blue-glass mt-2 mb-2"
          type="button"
          @click="fbRedirect"
        >
          <v-icon class="mr-2">mdi-facebook</v-icon>
          Zaloguj przez FB
        </v-btn>
        <p>
          Nie masz konta?
          <router-link :to="{ name: registerPath }">
            <span class="c-pointer text-white">Zarejestruj się</span>
          </router-link>
        </p>
        <p>
          <router-link :to="{ name: resetPasswordPath }">
            <span class="c-pointer text-white">Nie pamiętasz hasła?</span>
          </router-link>
        </p>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
@import 'shared/styles.css';
</style>
