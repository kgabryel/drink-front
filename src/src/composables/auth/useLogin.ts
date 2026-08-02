import type { LoginRequest } from '@models/api/login.request';
import type { ComputedRef } from 'vue';

import messages from '@config/messages';
import { authService } from '@services/auth.service';
import { computed, reactive } from 'vue';
import { useToast } from 'vue-toastification';

import router from '@/router';
import { names } from '@/router/names';

interface State {
  email: string;
  password: string;
}

export function useLogin() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const state: State = reactive<State>({
    email: '',
    password: '',
  });

  // computed
  const valid: ComputedRef<boolean> = computed(() => state.email !== '' && state.password !== '');

  // actions
  async function login(): Promise<void> {
    if (!valid.value) {
      return;
    }

    const data: LoginRequest = {
      password: state.password,
      username: state.email,
    };
    const success: boolean = await authService.login(data);

    if (!success) {
      toast.error(messages.invalidData);

      return;
    }
    await router.push({ name: names.allDrinks });
  }

  return { login, state, valid };
}
