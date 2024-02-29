import store from '../store';
import {actionsNames} from '../store/actions';

class DataLoader {
    load(loadDrinks = false, loadIngredients = false, loadTags = false) {
        let unloaded = [];
        if (loadDrinks && !store.getters.loadedDrinks) {
            unloaded.push(store.dispatch(actionsNames.loadDrinks));
        }
        if (loadIngredients && !store.getters.loadedIngredients) {
            unloaded.push(store.dispatch(actionsNames.loadIngredients));
        }
        if (loadTags && !store.getters.loadedTags) {
            unloaded.push(store.dispatch(actionsNames.loadTags));
        }
        return unloaded;
    }
}

export const dataLoader = new DataLoader();