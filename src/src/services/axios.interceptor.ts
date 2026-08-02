import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { Router } from 'vue-router';

import axios from 'axios';

import { authService } from './auth.service';

class AxiosInterceptor {
  private isRefreshing: boolean = false;
  private pendingRequests: ((token: string) => void)[] = [];

  constructor(private readonly router: Router) {}

  setup(): void {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor(): void {
    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (authService.checkAccessToken()) {
        config.headers.Authorization = authService.getAuthString();
      }

      return config;
    });
  }

  private resolvePendingRequests(token: string): void {
    this.pendingRequests.forEach((cb: (token: string) => void) => cb(token));
    this.pendingRequests = [];
  }

  private setupResponseInterceptor(): void {
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (!error.response || error.response.status !== 401) {
          return Promise.reject(error.response);
        }

        const originalRequest: InternalAxiosRequestConfig = error.config!;

        if (this.isRefreshing) {
          return new Promise((resolve: (value: unknown) => void) => {
            this.pendingRequests.push((token: string) => {
              originalRequest.headers.Authorization = token;
              resolve(axios(originalRequest));
            });
          });
        }

        this.isRefreshing = true;

        return authService
          .refreshToken()
          .then(() => {
            const newToken: string = authService.getAuthString();
            this.resolvePendingRequests(newToken);
            originalRequest.headers.Authorization = newToken;

            return axios(originalRequest);
          })
          .catch(() => {
            this.pendingRequests = [];
            authService.clearTokens();

            return this.router.push({ name: 'login' });
          })
          .finally(() => (this.isRefreshing = false));
      },
    );
  }
}

export function setupInterceptors(router: Router): void {
  new AxiosInterceptor(router).setup();
}
