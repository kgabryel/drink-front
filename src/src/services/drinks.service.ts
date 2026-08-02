import type { DrinkRequest } from '@models/api/drink.request';
import type { FullDrinkResponse } from '@models/api/full-drink.response';
import type { ReorderPhotoRequest } from '@models/api/reorder-photo.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { Drink } from '@models/store/drink';
import type { AxiosResponse } from 'axios';

import axios from 'axios';

import { routes } from '@/router/routes';

interface DrinksService {
  addPhoto(drinkId: number, photo: string): Promise<Drink>;
  delete(id: number): Promise<void>;
  deletePhoto(drinkId: number, photoId: number): Promise<Drink>;
  load(): Promise<Drink[]>;
  loadPublicDrink(id: string): Promise<FullDrinkResponse>;
  photosReorder(data: UpdateRequest<ReorderPhotoRequest>): Promise<Drink>;
  updateFavourite(data: UpdateRequest<boolean>): Promise<Drink>;
  add(data: DrinkRequest): Promise<Drink>;
  update(data: UpdateRequest<DrinkRequest>): Promise<Drink>;
}

export const drinksService: DrinksService = {
  add(data: DrinkRequest): Promise<Drink> {
    return axios.post(routes.drinks, data).then((response: AxiosResponse<Drink>) => response.data);
  },
  addPhoto(drinkId: number, photo: string): Promise<Drink> {
    return axios.post(routes.photos(drinkId), { photo }).then((response: AxiosResponse<Drink>) => response.data);
  },
  delete(id: number): Promise<void> {
    return axios.delete(routes.drinkById(id));
  },
  deletePhoto(drinkId: number, photoId: number): Promise<Drink> {
    return axios.delete(routes.photoById(drinkId, photoId)).then((response: AxiosResponse<Drink>) => response.data);
  },
  load(): Promise<Drink[]> {
    return axios.get(routes.drinks).then((response: AxiosResponse<Drink[]>) => response.data);
  },
  loadPublicDrink(id: string): Promise<FullDrinkResponse> {
    return axios.get(routes.publicDrink(id)).then((response: AxiosResponse<FullDrinkResponse>) => response.data);
  },
  photosReorder(data: UpdateRequest<ReorderPhotoRequest>): Promise<Drink> {
    return axios.patch(routes.photos(data.id), data.data).then((response: AxiosResponse<Drink>) => response.data);
  },
  update(data: UpdateRequest<DrinkRequest>): Promise<Drink> {
    return axios.put(routes.drinkById(data.id), data.data).then((response: AxiosResponse<Drink>) => response.data);
  },
  updateFavourite(data: UpdateRequest<boolean>): Promise<Drink> {
    return axios
      .patch(routes.drinkById(data.id), { favourite: data.data })
      .then((response: AxiosResponse<Drink>) => response.data);
  },
};
