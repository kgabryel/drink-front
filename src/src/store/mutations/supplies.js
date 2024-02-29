import {clearState} from '../state';

export const supplies = {
    loadSupplies(state, data) {
        state.supplies = {
            loaded: data.loaded,
            success: data.success,
            data: data.data
        };
    },
    clearSupplies(state) {
        state.supplies = clearState.supplies;
    }
};