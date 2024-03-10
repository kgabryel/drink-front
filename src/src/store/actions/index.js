import {tags} from './tags';
import {ingredients} from './ingredients';
import {drinks} from './drinks';
import {settings} from './settings';
import {apiKeys} from './apiKeys';
import {supplies} from './supplies';
import {drinksCards} from './drinksCards';

export const actions = {
    ...tags,
    ...ingredients,
    ...drinks,
    ...settings,
    ...apiKeys,
    ...supplies,
    ...drinksCards
};

export const actionsNames = {
    loadDrinks: 'loadDrinks',
    addDrink: 'addDrink',
    updateDrink: 'updateDrink',
    updateDrinkFavourite: 'updateDrinkFavourite',
    deleteDrink: 'deleteDrink',
    loadIngredients: 'loadIngredients',
    addIngredient: 'addIngredient',
    deleteIngredient: 'deleteIngredient',
    updateIngredient: 'updateIngredient',
    updateIngredientAvailable: 'updateIngredientAvailable',
    loadTags: 'loadTags',
    addTag: 'addTag',
    updateTag: 'updateTag',
    deleteTag: 'deleteTag',
    updateTagPublic: 'updateTagPublic',
    loadSettings: 'loadSettings',
    switchOnlyAvailable: 'switchOnlyAvailable',
    changeOzaKey: 'changeOzaKey',
    loadApiKeys: 'loadApiKeys',
    generateKey: 'generateKey',
    deleteApiKey: 'deleteApiKey',
    switchApiKey: 'switchApiKey',
    loadSupplies: 'loadSupplies',
    keyNotExists: 'keyNotExists',
    updateOzaId: 'updateOzaId',
    changePassword: 'changePassword',
    addPhoto: 'addPhoto',
    photosReorder: 'photosReorder',
    deletePhoto: 'deletePhoto',
    loadDrinksCards: 'loadDrinksCards',
    addDrinksCard: 'addDrinksCard',
    deleteDrinksCard: 'deleteDrinksCard',
    modifyDrinksCardActivity: 'modifyDrinksCardActivity',
    updateDrinksCard: 'updateDrinksCard'
};