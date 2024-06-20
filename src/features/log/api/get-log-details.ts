import { api } from "@/lib/api-client";

export const getLogDetails = async (token: string) => {
    const response = await api.get("cloudwatch/logs/grouped/", {
      headers: {
        Authorization: "Token " + token,
      },
    });

    return response.data
  };