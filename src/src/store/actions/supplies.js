import {ingredientsService} from '../../services/ingredients.service';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';

export const supplies = {
    loadSupplies(context) {
        return ingredientsService.loadSupplies().then(data => context.commit('loadSupplies', {
            loaded: true,
            success: true,
            data: data
        })).catch(() => {
            bus.$emit(events.errorMessage, messages.invalidOzaKey);
            context.commit('loadSupplies', {
                loaded: true,
                success: false,
                data: []
            });
        });
    },
    keyNotExists(context) {
        context.commit('loadSupplies', {
            loaded: true,
            success: false,
            data: []
        });
    }
};
