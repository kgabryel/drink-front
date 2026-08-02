import type { LoginRequest } from '@models/api/login.request';
import type { RegisterRequest } from '@models/api/register.request';
import type { ComputedRef } from 'vue';

import messages from '@config/messages';
import { authService } from '@services/auth.service';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { names } from '@/router/names';
import { passwordMath } from '@/utils/form.utils';

interface State {
  password: string;
  passwordRepeat: string;
  email: string;
}

export function useRegisterForm() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();
  const router: ReturnType<typeof useRouter> = useRouter();

  // state
  const state: State = reactive<State>({
    email: '',
    password: '',
    passwordRepeat: '',
  });

  // computed
  const passwordErrors: ComputedRef<string[]> = computed(() => passwordMath(state.password, state.passwordRepeat));

  const valid: ComputedRef<boolean> = computed(() => {
    if (state.email === '' || state.password === '' || state.passwordRepeat === '') {
      return false;
    }

    return passwordErrors.value.length === 0;
  });

  // actions
  async function submit(): Promise<void> {
    if (!valid.value) {
      return;
    }

    const data: RegisterRequest = {
      email: state.email,
      password: {
        first: state.password,
        second: state.passwordRepeat,
      },
    };

    const success: boolean = await authService.register(data);

    if (!success) {
      toast.error(messages.emailInUse);

      return;
    }
    const loginData: LoginRequest = {
      password: state.password,
      username: state.email,
    };

    const loginSuccess: boolean = await authService.login(loginData);

    if (!loginSuccess) {
      toast.error(messages.invalidData);

      return;
    }
    await router.push({ name: names.allDrinks });
  }

  return { passwordErrors, state, submit, valid };
}
