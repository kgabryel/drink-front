<script setup lang="ts">
import { useChangePassword } from '@composables/account/useChangePassword';
import lengths from '@config/lengths';

// setup
const maxLength: number = lengths.password;

// composables
const { change, newPasswordErrors, newPasswordRepeatErrors, state, valid } = useChangePassword();
</script>

<template>
  <div class="content-container px-2 pb-2 glass-background text-center">
    <h2>Zmiana hasła</h2>
    <v-text-field
      v-model="state.oldPassword"
      :counter="maxLength"
      :maxlength="maxLength"
      label="Aktualnie hasło"
      type="password"
    />
    <v-text-field
      v-model="state.newPassword"
      :counter="maxLength"
      :error-messages="newPasswordErrors"
      :maxlength="maxLength"
      label="Nowe hasło"
      type="password"
    />
    <v-text-field
      v-model="state.newPasswordRepeat"
      :counter="maxLength"
      :error-messages="newPasswordRepeatErrors"
      :maxlength="maxLength"
      class="mb-2"
      label="Powtórz hasło"
      type="password"
    />
    <v-btn
      :disabled="!valid"
      block
      class="text-center glass-background"
      type="button"
      @click="change"
    >
      Zmień hasło
    </v-btn>
  </div>
</template>
