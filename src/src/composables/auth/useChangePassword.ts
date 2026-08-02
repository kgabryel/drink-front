import type { ChangePasswordTokenRequest } from '@models/api/change-password-token.request';
import type { ComputedRef } from 'vue';

import messages from '@config/messages';
import { authService } from '@services/auth.service';
import { watch } from 'vue';
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { names } from '@/router/names';
import { passwordMath } from '@/utils/form.utils';

interface State {
  password: string;
  passwordRepeat: string;
}

export function useChangePassword() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();
  const route: ReturnType<typeof useRoute> = useRoute();
  const router: ReturnType<typeof useRouter> = useRouter();

  // state
  const state: State = reactive<State>({
    password: '',
    passwordRepeat: '',
  });

  // computed
  const token: ComputedRef<string> = computed(() => route.params['token'] as string);

  const passwordErrors: ComputedRef<string[]> = computed(() => passwordMath(state.password, state.passwordRepeat));

  const valid: ComputedRef<boolean> = computed(() => {
    if (state.password === '' || state.passwordRepeat === '') {
      return false;
    }

    return passwordErrors.value.length === 0;
  });

  // watch
  watch(token, () => authService.checkToken(token.value), { immediate: true });

  // actions
  async function change(): Promise<void> {
    if (!valid.value) {
      return;
    }

    const data: ChangePasswordTokenRequest = {
      newPassword: {
        first: state.password,
        second: state.passwordRepeat,
      },
      token: token.value,
    };

    const success: boolean = await authService.changePassword(data);

    if (!success) {
      toast.error(messages.invalidData);

      return;
    }
    toast.success(messages.passwordChanged);
    await router.push({ name: names.login });
  }

  return { change, passwordErrors, state, valid };
}
