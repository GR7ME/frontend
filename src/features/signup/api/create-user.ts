import { api } from "@/lib/api-client";

interface SignUpType {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export const createUser = async (data: SignUpType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {confirmPassword, ...withoutConfirmPassword} = data;
  try {
    const result = await api.post("/auth/signup", withoutConfirmPassword);
    return result;
  } catch (error) {
    console.error("SignUp Error!!", error);
    throw error;
  }
};
