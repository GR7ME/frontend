import Axios, { InternalAxiosRequestConfig } from 'axios';
import {toast} from "@/components/ui/use-toast"

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  return config;
}

export const api = Axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    console.log("axios inside: ",response)
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.response?.data?.detail || error.message;
    if(error.isAxiosError && message == "Network Error") {
      toast({
        variant: "destructive",
        title: 'Error Occured!!',
        description: "Backend Server is not running",
      });
    }
    
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
