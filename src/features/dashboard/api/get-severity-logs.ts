import { api } from "@/lib/api-client";

export const getSeverityLogs = async (token: string) => {
    const result = await api.get("cloudwatch/log-counts/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    return result.data;
  };

