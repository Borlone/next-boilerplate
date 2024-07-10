import axios, { AxiosResponse, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const errorCallback = (status: number, error: string) => {
   return { status, error: error ?? '' };
};

class ApiClient {
   baseURL: string;
   tokenType: string;

   constructor(baseURL?: string, tokenType?: string) {
      this.baseURL = baseURL || BASE_URL || '';
      this.tokenType = tokenType || 'Authorization';
   }

   getInstance() {
      const api: AxiosInstance = axios.create({
         baseURL: this.baseURL,
         timeout: 30000,
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
      });

      api.interceptors.request.use(
         (config: any) => {
            const token = localStorage.getItem('token') ?? '';
            if (config.headers) {
               config.headers[this.tokenType] = this.tokenType !== 'Authorization' ? token : `Bearer ${token}`;

            }
            return config;
         },
         (error: Error) => {
            return Promise.reject(error);
         }
      );

      api.interceptors.response.use(
         (response: AxiosResponse) => {
            return response.data;
         },
         (error: AxiosError) => {
            const resError = error.response;
            const dataError: any = resError?.data;

            switch (resError?.status) {
               case 500:
                  return errorCallback(500, dataError?.message);
               case 403: {
                  // return handle403Status(dataError, config);
                  break;
               }
               case 401:
                  // handle refresh token in here

                  return Promise.reject(error);
               default:
                  return errorCallback(500, dataError?.message);
            }
         }
      );
      return api;
   }
}

export const api = new ApiClient().getInstance();

export default ApiClient;
