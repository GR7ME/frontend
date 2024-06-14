import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  return config;
}

export const api = Axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(authRequestInterceptor);
// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     const message = error.response?.data?.message || error.message;
//     useNotifications.getState().addNotification({
//       type: 'error',
//       title: 'Error',
//       message,
//     });

//     if (error.response?.status === 401) {
//       const searchParams = new URLSearchParams();
//       const redirectTo = searchParams.get('redirectTo');
//       window.location.href = `/auth/login?redirectTo=${redirectTo}`;
//     }

//     return Promise.reject(error);
//   },
// );
