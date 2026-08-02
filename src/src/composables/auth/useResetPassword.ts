import type { ComputedRef, Ref } from 'vue';

import messages from '@config/messages';
import { authService } from '@services/auth.service';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

export function useResetPassword() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const email: Ref<string> = ref('');

  // computed
  const valid: ComputedRef<boolean> = computed(() => email.value !== '');

  // actions
  async function resetPassword(): Promise<void> {
    if (!valid.value) {
      return;
    }

    const success: boolean = await authService.resetPassword(email.value);

    if (!success) {
      toast.error(messages.invalidData);

      return;
    }

    toast.success(messages.resetEmailSent);
    email.value = '';
  }

  return { email, resetPassword, valid };
}
