export const state = {
    tags: {
        loaded: false,
        data: []
    },
    ingredients: {
        loaded: false,
        data: []
    },
    drinks: {
        loaded: false,
        data: []
    },
    settings: {
        loaded: false,
        onlyAvailable: false,
        ozaKey: null,
        userType: 'standard'
    },
    apiKeys: {
        loaded: false,
        data: []
    },
    supplies: {
        loaded: false,
        success: false,
        data: []
    }
};
export const clearState = {
    ...state
};