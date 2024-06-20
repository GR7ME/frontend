import { api } from "@/lib/api-client";

export const getTotalLogs = async (token: string) => {
    const result = await api.get("/cloudwatch/total-logs-count/", {
      headers: {
        Authorization: "Token " + token,
      },
    });
    return result.data.total_logs_count;
  };