import { api } from "@/lib/api-client";
import axios from "axios";

interface loginType {
  username: string;
  password: string;
}

export const loginUserByUserNameandEmail = async (data: loginType) => {
    const result = await api.post("/auth/login", data);
    return result
};

export const getUser = async () => {
  const token = localStorage.getItem("token");

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
