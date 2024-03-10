import {tags} from './tags';
import {ingredients} from './ingredients';
import {drinks} from './drinks';
import {settings} from './settings';
import {apiKeys} from './apiKeys';
import {supplies} from './supplies';
import {drinksCards} from './drinksCards';

export const mutations = {
    ...tags,
    ...ingredients,
    ...drinks,
    ...settings,
    ...apiKeys,
    ...supplies,
    ...drinksCards
};