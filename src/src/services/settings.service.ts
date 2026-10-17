import type { AxiosResponse } from 'axios';

import axios from 'axios';

import type { ChangePasswordRequest } from '@/api/request';
import type { Settings } from '@/api/response';

import { routes } from '@/router/routes';

interface SettingsService {
  changeOzaKey(key: string | null): Promise<Settings>;
  changePassword(data: ChangePasswordRequest): Promise<void>;
  load(): Promise<Settings>;
  switchOnlyAvailable(): Promise<Settings>;
}

export const settingsService: SettingsService = {
  changeOzaKey(key: string | null): Promise<Settings> {
    return axios.patch(routes.changeOzaKey, { key }).then((response: AxiosResponse<Settings>) => response.data);
  },
  changePassword(data: ChangePasswordRequest): Promise<void> {
    return axios.post(routes.changePasswordSettings, data).then((response: AxiosResponse<void>) => response.data);
  },
  load(): Promise<Settings> {
    return axios.get(routes.settings).then((response: AxiosResponse<Settings>) => response.data);
  },
  switchOnlyAvailable(): Promise<Settings> {
    return axios.patch(routes.switchOnlyAvailable).then((response: AxiosResponse<Settings>) => response.data);
  },
};
