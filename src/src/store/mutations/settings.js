export const settings = {
    loadSettings(state, data) {
        state.settings = {
            loaded: data.loaded,
            ozaKey: data.settings.ozaKey,
            onlyAvailable: data.settings.onlyAvailable,
            userType: data.settings.userType
        };
    },
    changeOzaKey(state, data) {
        state.settings = {
            ...state.settings,
            ozaKey: data.ozaKey
        };
    },
    switchOnlyAvailable(state, data) {
        state.settings = {
            ...state.settings,
            onlyAvailable: data.onlyAvailable
        };
    }
};