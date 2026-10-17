import type { AxiosResponse } from 'axios';

import axios from 'axios';

import type { ApiKey } from '@/api/response';

import { routes } from '@/router/routes';

interface ApiKeysService {
  delete(id: number): Promise<AxiosResponse>;
  generate(): Promise<ApiKey>;
  load(): Promise<ApiKey[]>;
  switch(id: number): Promise<ApiKey>;
}

export const apiKeysService: ApiKeysService = {
  delete(id: number): Promise<AxiosResponse> {
    return axios.delete(routes.apiKeyById(id));
  },
  generate(): Promise<ApiKey> {
    return axios.post(routes.apiKeys).then((response: AxiosResponse<ApiKey>) => response.data);
  },
  load(): Promise<ApiKey[]> {
    return axios.get(routes.apiKeys).then((response: AxiosResponse<ApiKey[]>) => response.data);
  },
  switch(id: number): Promise<ApiKey> {
    return axios.patch(routes.apiKeyById(id)).then((response: AxiosResponse<ApiKey>) => response.data);
  },
};
