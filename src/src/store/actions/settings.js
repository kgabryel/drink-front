import {settingsService} from '../../services/settings.service';

export const settings = {
    loadSettings(context) {
        return settingsService.load().then(data => context.commit('loadSettings', {loaded: true, settings: data}));
    },
    switchOnlyAvailable(context) {
        return settingsService.switchOnlyAvailable().then(data => context.commit('switchOnlyAvailable', {onlyAvailable: data.onlyAvailable}));
    },
    changeOzaKey(context, data) {
        return settingsService.changeOzaKey(data.key).then(data => {
            context.commit('changeOzaKey', {ozaKey: data.ozaKey});
            context.commit('clearIngredients');
            context.commit('clearSupplies');
        });
    },
    changePassword(context, data) {
        return settingsService.changePassword(data).then(() => true);
    }
};