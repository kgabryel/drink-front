export const base: string = import.meta.env['VITE_FRONT_URL'];
const api: string = import.meta.env['VITE_API_URL'];
const url: (path: string) => string = (path: string): string => `${api}${path}`;

export const routes = {
  apiKeyById: (id: number): string => url(`api-keys/${id}`),
  apiKeys: url('api-keys'),
  changeOzaKey: url('settings/change-oza-key'),
  changePassword: (token: string): string => url(`change-password/${token}`),
  changePasswordSettings: url('settings/change-password'),
  checkToken: (token: string): string => url(`check-token/${token}`),
  drinkById: (id: number): string => url(`drinks/${id}`),
  drinks: url('drinks'),
  drinksCardById: (id: number): string => url(`drinks-cards/${id}`),
  drinksCards: url('drinks-cards'),
  fbLogin: url('facebook/login'),
  fbRedirect: url('facebook/redirect'),
  getPhoto: (type: string, drinkId: number, photoId: number): string =>
    url(`drinks/${drinkId}/photos/${photoId}/${type}`),
  ingredientById: (id: number): string => url(`ingredients/${id}`),
  ingredients: url('ingredients'),
  login: url('login_check'),
  modifyActivityDrinksCard: (id: number, status: string): string => `${routes.drinksCardById(id)}/${status}`,
  photoById: (drinkId: number, photoId: number): string => url(`drinks/${drinkId}/photos/${photoId}`),
  photos: (id: number): string => url(`drinks/${id}/photos`),
  publicCard: (id: string): string => url(`drinks-cards/${id}`),
  publicDrink: (id: string): string => url(`public/drinks/${id}`),
  refreshToken: url('refresh_token'),
  register: url('register'),
  resetPassword: url('reset-password'),
  settings: url('settings'),
  supplies: url('ingredients/oza-supplies'),
  switchOnlyAvailable: url('settings/switch-only-available'),
  tagById: (id: number): string => url(`tags/${id}`),
  tags: url('tags'),
};
