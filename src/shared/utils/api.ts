import axios, { AxiosResponse, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let failedQueue: any[] = [];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const errorCallback = (status: number, error: string) => {
   return { status, error: error ?? '' };
};

const processQueue = (error: AxiosError | null, token = null) => {
   failedQueue.forEach((item) => {
      if (error) {
         item.reject(error);
      } else {
         item.resolve(token);
      }
   });

   failedQueue = [];
};

const handleRefreshToken = (config: InternalAxiosRequestConfig<any>, api: AxiosInstance) => {
   return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
   })
      .then(() => {
         if (config) return api(config);
      })
      .catch((err) => {
         return Promise.reject(err);
      });
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
            const config = error.config;
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
                  // if (config.url === `${REFRESH_URL}/api/auth/refresh_token`) {
                  //    handleGetToken();
                  //    return errorCallback(401, dataError?.message);
                  // }

                  // // Handle if token is refreshing
                  // if (isRefreshing) {
                  //    return handleRefreshToken(config, api);
                  // }
                  // isRefreshing = true;

                  // const res: APIResponse<{
                  //    access_token: string;
                  // }> = await api.get(`${REFRESH_URL}/api/auth/refresh_token`);

                  // if (res?.data?.access_token) {
                  //    const { access_token } = res.data;
                  //    localStorage.setItem('token', access_token);
                  //    processQueue(null, access_token);
                  //    if (config)
                  //       return api(config).finally(() => {
                  //          isRefreshing = false;
                  //       });
                  // }

                  return Promise.reject(error);
               default:
                  return errorCallback(500, dataError?.message);
            }
         }
      );
      return api;
   }
}

export default ApiClient;
