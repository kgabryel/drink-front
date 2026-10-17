import type { SettingsStore } from '@store/settings';
import type { ComputedRef } from 'vue';

import errors from '@config/errors';
import messages from '@config/messages';
import { computed, reactive } from 'vue';
import { useToast } from 'vue-toastification';

import type { ChangePasswordRequest } from '@/api/request';

import { useSettingsStore } from '@/store';
import { passwordMath } from '@/utils/form.utils';

interface State {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export function useChangePassword() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();
  const settingsStore: SettingsStore = useSettingsStore();

  // state
  const state: State = reactive<State>({
    newPassword: '',
    newPasswordRepeat: '',
    oldPassword: '',
  });

  // computed
  const newPasswordRepeatErrors: ComputedRef<string[]> = computed(() =>
    passwordMath(state.newPassword, state.newPasswordRepeat),
  );

  const newPasswordErrors: ComputedRef<string[]> = computed(() => {
    if (state.oldPassword === '' || state.newPassword === '') {
      return [];
    }
    if (state.oldPassword === state.newPassword) {
      return [errors.samePassword];
    }

    return [];
  });

  const valid: ComputedRef<boolean> = computed(() => {
    if (state.oldPassword === '' || state.newPassword === '' || state.newPasswordRepeat === '') {
      return false;
    }

    return newPasswordErrors.value.length === 0 && newPasswordRepeatErrors.value.length === 0;
  });

  // actions
  function clear(): void {
    state.oldPassword = '';
    state.newPassword = '';
    state.newPasswordRepeat = '';
  }

  async function change(): Promise<void> {
    if (!valid.value) {
      return;
    }

    const data: ChangePasswordRequest = {
      newPassword: state.newPassword,
      newPasswordRepeat: state.newPasswordRepeat,
      oldPassword: state.oldPassword,
    };

    const success: boolean = await settingsStore.changePassword(data);

    if (!success) {
      return;
    }

    toast.success(messages.passwordChanged);
    clear();
  }

  return { change, newPasswordErrors, newPasswordRepeatErrors, state, valid };
}
