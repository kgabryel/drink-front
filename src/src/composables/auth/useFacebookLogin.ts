import type { TokensResponse } from '@models/api/tokens.response';
import type { Result } from '@models/result';

import messages from '@config/messages';
import { authService } from '@services/auth.service';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { names } from '@/router/names';

export function useFacebookLogin() {
  // setup
  const router: ReturnType<typeof useRouter> = useRouter();
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function redirect() {
    await router.push({ name: names.login });
    toast.error(messages.authorizationError);
  }

  async function login(authToken: string): Promise<void> {
    const tokens: Result<TokensResponse> = await authService.loginViaFb(authToken);

    if (!tokens.result) {
      await redirect();

      return;
    }
    authService.storeTokens(tokens.data);
    await router.push({ name: names.allDrinks });
  }

  return { login, redirect };
}
