import Axios, { InternalAxiosRequestConfig } from 'axios';
import {toast} from "@/components/ui/use-toast"

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
api.interceptors.response.use(
  (response) => {
    console.log("axios inside: ",response)
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    console.log("Error occured")
    console.log("message : ",message)
    
    toast({
      variant: "destructive",
      title: 'Error Occured!!',
      description: message,
    });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  },
);
