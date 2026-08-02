import type { AddIngredientRequest } from '@models/api/add-ingredient.request';
import type { UpdateIngredientRequest } from '@models/api/update-ingredient.request';
import type { UpdateRequest } from '@models/api/update.request';
import type { Ingredient } from '@models/store/ingredient';
import type { OzaSupply } from '@models/store/oza-supply';

import axios, { type AxiosResponse } from 'axios';

import { routes } from '@/router/routes';

interface IngredientsService {
  add(data: AddIngredientRequest): Promise<Ingredient>;
  delete(id: number): Promise<AxiosResponse>;
  load(): Promise<Ingredient[]>;
  loadSupplies(): Promise<OzaSupply[]>;
  update(data: UpdateRequest<UpdateIngredientRequest>): Promise<Ingredient>;
  updateAvailable(data: UpdateRequest<boolean>): Promise<Ingredient>;
  updateOzaId(data: UpdateRequest<number | null>): Promise<Ingredient>;
}

export const ingredientsService: IngredientsService = {
  add(data: AddIngredientRequest): Promise<Ingredient> {
    return axios.post(routes.ingredients, data).then((response: AxiosResponse<Ingredient>) => response.data);
  },
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(routes.ingredientById(id));
  },
  load(): Promise<Ingredient[]> {
    return axios.get(routes.ingredients).then((response: AxiosResponse<Ingredient[]>) => response.data);
  },
  loadSupplies(): Promise<OzaSupply[]> {
    return axios.get(routes.supplies).then((response: AxiosResponse<OzaSupply[]>) => response.data);
  },
  update(data: UpdateRequest<UpdateIngredientRequest>): Promise<Ingredient> {
    return axios
      .patch(routes.ingredientById(data.id), data.data)
      .then((response: AxiosResponse<Ingredient>) => response.data);
  },
  updateAvailable(data: UpdateRequest<boolean>): Promise<Ingredient> {
    return axios
      .patch(routes.ingredientById(data.id), {
        available: data.data ? '1' : '0',
      })
      .then((response: AxiosResponse<Ingredient>) => response.data);
  },
  updateOzaId(data: UpdateRequest<number | null>): Promise<Ingredient> {
    return axios
      .patch(routes.ingredientById(data.id), { ozaId: data.data })
      .then((response: AxiosResponse<Ingredient>) => response.data);
  },
};
