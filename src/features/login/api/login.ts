import { api } from "@/lib/api-client";

interface loginType {
  username: string;
  password: string;
}

export const loginUserByUserNameandEmail = async (data: loginType) => {
  try {
    const result = await api.post("/auth/login", data);
    return result;
  } catch (error) {
    console.error("Login Error!!", error);
    throw error;
  }
};
