import type { AxiosResponse } from 'axios';

import messages from '@config/messages';
import { useToast } from 'vue-toastification';

interface ErrorHandler {
  catch(error: AxiosResponse): false;
  handle(error: AxiosResponse): void;
}

export const errorHandler: ErrorHandler = {
  catch(error: AxiosResponse): false {
    errorHandler.handle(error);

    return false;
  },
  handle(error: AxiosResponse): void {
    const toast: ReturnType<typeof useToast> = useToast();

    if (error.status === 422 || error.status === 404) {
      toast.error(messages.invalidData);
    } else {
      toast.error(messages.serverError);
    }
  },
};
