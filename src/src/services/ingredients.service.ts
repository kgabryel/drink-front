import type { UpdateRequest } from '@models/update.request';

import axios, { type AxiosResponse } from 'axios';

import type { CreateIngredientRequest, ModifyIngredientRequest } from '@/api/request';
import type { Ingredient } from '@/api/response';
import type { OzaSupply } from '@/api/response';

import { routes } from '@/router/routes';

interface IngredientsService {
  add(data: CreateIngredientRequest): Promise<Ingredient>;
  delete(id: number): Promise<AxiosResponse>;
  load(): Promise<Ingredient[]>;
  loadSupplies(): Promise<OzaSupply[]>;
  update(data: UpdateRequest<ModifyIngredientRequest>): Promise<Ingredient>;
  updateAvailable(data: UpdateRequest<boolean>): Promise<Ingredient>;
  updateOzaId(data: UpdateRequest<number | null>): Promise<Ingredient>;
}

export const ingredientsService: IngredientsService = {
  add(data: CreateIngredientRequest): Promise<Ingredient> {
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
  update(data: UpdateRequest<ModifyIngredientRequest>): Promise<Ingredient> {
    return axios
      .patch(routes.ingredientById(data.id), data.data)
      .then((response: AxiosResponse<Ingredient>) => response.data);
  },
  updateAvailable(data: UpdateRequest<boolean>): Promise<Ingredient> {
    return axios
      .patch(routes.ingredientById(data.id), {
        available: data.data,
      })
      .then((response: AxiosResponse<Ingredient>) => response.data);
  },
  updateOzaId(data: UpdateRequest<number | null>): Promise<Ingredient> {
    return axios
      .patch(routes.ingredientById(data.id), { ozaId: data.data })
      .then((response: AxiosResponse<Ingredient>) => response.data);
  },
};
