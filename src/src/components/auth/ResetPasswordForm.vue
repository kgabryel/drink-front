<script setup lang="ts">
import { useResetPassword } from '@composables/auth/useResetPassword';
import lengths from '@config/lengths';

import loginHorizontal from '@/assets/login-horizontal.jpg';
import loginVertical from '@/assets/login.jpg';
import { names } from '@/router/names';

// setup
const loginPath: string = names.login;
const emailLength: number = lengths.email;

// composables
const { email, resetPassword, valid } = useResetPassword();
</script>

<template>
  <div class="w-100 h-100 d-grid justify-center align-content-center px-4">
    <v-form class="px-4 py-4 my-4 glass-background">
      <img :src="loginVertical" class="vertical h-auto" />
      <img :src="loginHorizontal" class="horizontal w-100 h-auto" />
      <div class="form-container w-100 px-2">
        <h1>Reset hasła</h1>
        <v-text-field
          v-model="email"
          :counter="emailLength"
          :maxlength="emailLength"
          class="mb-2"
          label="E-mail"
          type="email"
        />
        <v-btn :disabled="!valid" block class="glass-background mb-2" type="button" @click="resetPassword">
          Resetuj hasło
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
