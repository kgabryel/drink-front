import { useToast } from 'vue-toastification';

export function useClipboard() {
  // setup
  const toast: ReturnType<typeof useToast> = useToast();

  // actions
  async function copyToClipboard(text: string, message: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    toast.success(message);
  }

  return { copyToClipboard };
}
