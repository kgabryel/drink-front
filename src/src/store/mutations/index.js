import {tags} from './tags';
import {ingredients} from './ingredients';
import {drinks} from './drinks';
import {settings} from './settings';
import {apiKeys} from './apiKeys';
import {supplies} from './supplies';

export const mutations = {
    ...tags,
    ...ingredients,
    ...drinks,
    ...settings,
    ...apiKeys,
    ...supplies
};