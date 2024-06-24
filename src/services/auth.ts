import { api } from "@/lib/api-client";
import axios, { AxiosError } from "axios";
interface ErrorResponse {
  message?: string;
}

export const getUser = async (token: string) => {

  try {
    const result = await api.get("/auth/testtoken", {
      headers: {
        Authorization: "Token " + token,
      },
    });

    if (result.status !== 200) {
      return {
        valid: false,
        data: result.data,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 403) {
          return {
            valid: false,
            data: error.response.data,
          };
        }
      } else if (error.request) {
        console.error("Error: No response received", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }

    return {
      success: false,
      data: { detail: "An error occurred" },
    };
  }
};

export const logOut = async (token: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post(
      '/auth/logout/',
      {},
      {
        headers: {
          Authorization: "Token " + token
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Successfully logged out',
      };
    } else {
      console.error('Unexpected status code:', response.status);
      return {
        success: false,
        message: 'Error logging out',
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        console.error('Request failed with status:', axiosError.response.status);
        return {
          success: false,
          message: axiosError.response?.data?.message || 'Error logging out',
        }; 
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
      } else {
        console.error('Error:', axiosError.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }

    return {
      success: false,
      message: 'An error occurred while logging out',
    };
  }
};