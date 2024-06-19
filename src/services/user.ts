import { api } from "@/lib/api-client";
import { SettingType } from "@/types/AuthTypes";
import axios from "axios";

export const updateUser = async (data: SettingType) => {
  try {
    const response = await api.patch("/auth/update-user/", data, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const responseData = await response;
      console.log("User updated successfully:", responseData.data.message);
      return {
        success: true,
        data: response,
      };
    } else {
      const errorData = await response;
      console.error("Error:", errorData.data.message);
      if (
        response.status === 400 &&
        errorData.data.message === "Current password is incorrect"
      ) {
        console.error("Current password is incorrect");
        return {
          success: false,
          data: "Current password is incorrect",
        };
      } else {
        console.error("Unexpected error occurred");
        return {
          success: false,
          data: "Unexpected error occurred",
        };
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      console.error("Error during login:", errorMessage);
      return {
        success: false,
        data: errorMessage,
      };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        data: "An unexpected error occurred",
      };
    }
  }
};
