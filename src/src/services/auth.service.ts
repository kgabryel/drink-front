import type { Result } from '@models/result';
import type { AxiosResponse } from 'axios';
import type { JwtPayload } from 'jwt-decode';

import messages from '@config/messages';
import { errorHandler } from '@services/errorHandler';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useToast } from 'vue-toastification';

import type { RegisterRequest, ResetPasswordRequest } from '@/api/request';
import type { LoginRequest } from '@/api/request';
import type { FbRedirectResponse, TokensResponse } from '@/api/response';

import router from '@/router';
import { names } from '@/router/names';
import { routes } from '@/router/routes';
import {
  useApiKeysStore,
  useDrinksCardsStore,
  useDrinksStore,
  useIngredientsStore,
  useOzaSuppliesStore,
  useSearchStore,
  useSettingsStore,
  useTagsStore,
} from '@/store';

const ACCESS_TOKEN: string = 'access-token';
const REFRESH_TOKEN: string = 'refresh-token';

interface AuthService {
  changePassword(token: string, data: ResetPasswordRequest): Promise<boolean>;
  checkAccessToken(): boolean;
  checkToken(token: string): Promise<boolean>;
  clearTokens(): void;
  fbRedirect(): void;
  getAuthString(): string;
  isLogged(): Promise<boolean>;
  login(data: LoginRequest): Promise<boolean>;
  loginViaFb(authToken: string): Promise<Result<TokensResponse>>;
  refreshToken(): Promise<void>;
  register(data: RegisterRequest): Promise<boolean>;
  resetPassword(email: string): Promise<boolean>;
  storeTokens(tokens: TokensResponse): void;
}

export const authService: AuthService = {
  changePassword(token: string, data: ResetPasswordRequest): Promise<boolean> {
    return axios.post(routes.changePassword(token), data).then(() => true);
  },
  checkAccessToken(): boolean {
    try {
      const accessToken: JwtPayload = jwtDecode(localStorage.getItem(ACCESS_TOKEN) as string);
      const currentDate: Date = new Date();
      const date: Date = new Date((accessToken.exp ?? 1) * 1000);

      return date.getTime() >= currentDate.getTime();
    } catch {
      return false;
    }
  },
  checkToken(token: string): Promise<boolean> {
    const toast: ReturnType<typeof useToast> = useToast();

    return axios
      .get(routes.checkToken(token))
      .then(() => true)
      .catch(async () => {
        toast.error(messages.tokenExpired);

        await router.push({ name: names.login });

        return false;
      });
  },
  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    useTagsStore().reset();
    useDrinksStore().reset();
    useIngredientsStore().reset();
    useApiKeysStore().reset();
    useSettingsStore().reset();
    useOzaSuppliesStore().reset();
    useDrinksCardsStore().reset();
    useSearchStore().reset();
  },
  async fbRedirect(): Promise<void> {
    await axios
      .get(routes.fbRedirect)
      .then((data: AxiosResponse<FbRedirectResponse>) => (window.location.href = data.data.url));
  },
  getAuthString(): string {
    return `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
  },
  async isLogged(): Promise<boolean> {
    if (localStorage.getItem(ACCESS_TOKEN) === null && localStorage.getItem(REFRESH_TOKEN) === null) {
      this.clearTokens();

      return false;
    }
    if (this.checkAccessToken()) {
      return true;
    }

    return this.refreshToken()
      .then(() => true)
      .catch(() => {
        this.clearTokens();

        return false;
      });
  },
  login(data: LoginRequest): Promise<boolean> {
    const toast: ReturnType<typeof useToast> = useToast();

    return axios
      .post(routes.login, data)
      .then(async (response: AxiosResponse<TokensResponse>) => {
        authService.storeTokens(response.data);

        return true;
      })
      .catch(() => {
        toast.error(messages.invalidData);

        return false;
      });
  },
  loginViaFb(authToken: string): Promise<Result<TokensResponse>> {
    const toast: ReturnType<typeof useToast> = useToast();

    return axios
      .post(routes.fbLogin, { authToken: authToken })
      .then((data: AxiosResponse<TokensResponse>) => {
        return {
          data: {
            refresh_token: data.data.refresh_token,
            token: data.data.token,
          },
          result: true,
        };
      })
      .catch(() => {
        toast.error(messages.invalidData);

        return {
          data: {
            refresh_token: '',
            token: '',
          },
          result: false,
        };
      });
  },
  refreshToken(): Promise<void> {
    return axios
      .post(routes.refreshToken, { refresh_token: localStorage.getItem(REFRESH_TOKEN) })
      .then((response: AxiosResponse<TokensResponse>) => authService.storeTokens(response.data));
  },
  register(data: RegisterRequest): Promise<boolean> {
    const loginRequest: LoginRequest = {
      password: data.password,
      username: data.email,
    };

    return axios
      .post(routes.register, data)
      .then(() => this.login(loginRequest))
      .catch(() => false);
  },
  resetPassword(email: string): Promise<boolean> {
    return axios
      .post(routes.resetPassword, { email })
      .then(() => true)
      .catch((error: AxiosResponse) => errorHandler.catch(error));
  },
  storeTokens(tokens: TokensResponse): void {
    localStorage.setItem(ACCESS_TOKEN, tokens.token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  },
};
