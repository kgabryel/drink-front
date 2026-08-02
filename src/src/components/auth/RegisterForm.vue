<script setup lang="ts">
import { useRegisterForm } from '@composables/auth/useRegisterForm';
import lengths from '@config/lengths';

import loginHorizontal from '@/assets/login-horizontal.jpg';
import loginVertical from '@/assets/login.jpg';
import { names } from '@/router/names';

// setup
const loginPath: string = names.login;
const emailLength: number = lengths.email;
const passwordLength: number = lengths.password;

// composables
const { passwordErrors, state, submit, valid } = useRegisterForm();
</script>

<template>
  <div class="w-100 h-100 d-grid justify-center align-content-center px-4">
    <v-form class="px-4 py-4 my-4 glass-background">
      <img :src="loginVertical" class="vertical h-auto" />
      <img :src="loginHorizontal" class="horizontal w-100 h-auto" />
      <div class="form-container w-100 px-2">
        <h1>Zarejestruj się</h1>
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
          label="Hasło"
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
        <v-btn :disabled="!valid" block class="glass-background mb-2" type="button" @click="submit">Załóż konto</v-btn>
        <p>
          Masz już konto?
          <router-link :to="{ name: loginPath }">
            <span class="c-pointer text-white">Zaloguj się</span>
          </router-link>
        </p>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
@import 'shared/styles.css';
</style>
