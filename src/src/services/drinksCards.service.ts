import type { DrinksCardRequest } from '@models/api/drinks-card.request';
import type { FullDrinkResponse } from '@models/api/full-drink.response';
import type { UpdateRequest } from '@models/api/update.request';
import type { DrinksCard } from '@models/store/drinks-card';
import type { AxiosResponse } from 'axios';

import axios from 'axios';

import { routes } from '@/router/routes';

interface DrinksCardsService {
  delete(id: number): Promise<AxiosResponse>;
  find(id: string): Promise<FullDrinkResponse[]>;
  load(): Promise<DrinksCard[]>;
  modifyActivity(id: number, active: boolean): Promise<DrinksCard>;
  add(data: DrinksCardRequest): Promise<DrinksCard>;
  update(data: UpdateRequest<DrinksCardRequest>): Promise<DrinksCard>;
}

export const drinksCardsService: DrinksCardsService = {
  add(data: DrinksCardRequest): Promise<DrinksCard> {
    return axios.post(routes.drinksCards, data).then((response: AxiosResponse<DrinksCard>) => response.data);
  },
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(routes.drinksCardById(id));
  },
  find(id: string): Promise<FullDrinkResponse[]> {
    return axios.get(routes.publicCard(id)).then((response: AxiosResponse<FullDrinkResponse[]>) => response.data);
  },
  load(): Promise<DrinksCard[]> {
    return axios.get(routes.drinksCards).then((response: AxiosResponse<DrinksCard[]>) => response.data);
  },
  modifyActivity(id: number, active: boolean): Promise<DrinksCard> {
    return axios
      .patch(routes.modifyActivityDrinksCard(id, active ? 'activate' : 'deactivate'))
      .then((response: AxiosResponse<DrinksCard>) => response.data);
  },
  update(data: UpdateRequest<DrinksCardRequest>): Promise<DrinksCard> {
    return axios
      .put(routes.drinksCardById(data.id), data.data)
      .then((response: AxiosResponse<DrinksCard>) => response.data);
  },
};
