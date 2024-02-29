import {bus} from '../main';
import events from '../config/events';
import messages from '../config/messages';

class ErrorHandler {
    handle(error) {
        if (error.status === 400 || error.status === 404) {
            bus.$emit(events.errorMessage, messages.invalidData);
        } else {
            bus.$emit(events.errorMessage, messages.serverError);
        }
        throw error;
    }
}

export const errorHandler = new ErrorHandler();