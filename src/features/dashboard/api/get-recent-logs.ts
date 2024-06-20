import { api } from "@/lib/api-client";

export const getRecentLogs = async (token: string) => {
    const result = await api.get("/cloudwatch/recent-logs", {
        headers: {
          Authorization: "Token " + token,
        },
    });
    return result.data;
};