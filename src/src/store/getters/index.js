export const getters = {
    ingredients: state => state.ingredients.data,
    tags: state => state.tags.data,
    drinks: state => state.drinks.data,
    drinkById: state => id => state.drinks.data.find(drink => drink.id === id),
    ingredientById: state => id => state.ingredients.data.find(ingredient => ingredient.id === id),
    ingredientByName: state => name => state.ingredients.data.find(ingredient => ingredient.name.toLowerCase() === name.toLowerCase()),
    tagById: state => id => state.tags.data.find(tag => tag.id === id),
    tagByName: state => name => state.tags.data.find(tag => tag.name.toLowerCase() === name.toLowerCase()),
    loadedTags: state => state.tags.loaded,
    loadedIngredients: state => state.ingredients.loaded,
    loadedDrinks: state => state.drinks.loaded,
    drinksForIngredientId: state => ingredientId => state.drinks.data.filter(drink => {
        let correct = false;
        drink.positions.forEach(position => {
            if (position.ingredientId === ingredientId) {
                correct = true;
            }
        });
        return correct;
    }),
    drinksForTagId: state => tagId => state.drinks.data.filter(drink => drink.tags.includes(tagId)),
    loadedSettings: state => state.settings.loaded,
    ozaKey: state => state.settings.ozaKey,
    onlyAvailable: state => state.settings.onlyAvailable,
    loadedApiKeys: state => state.apiKeys.loaded,
    apiKeys: state => state.apiKeys.data,
    loadedSupplies: state => state.supplies.loaded,
    supplies: state => state.supplies.data,
    loadedSuppliesWithSuccess: state => state.supplies.success,
    supplyById: state => id => state.supplies.data.find(supply => supply.id === id),
    userType: state => state.settings.userType
};