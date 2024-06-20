import { api } from "@/lib/api-client";

export const getLastWeekLogs = async (token: string) => {
  const result = await api.get("/cloudwatch/last_seven_days/", {
    headers: {
      Authorization: "Token " + token,
    },
  });
  console.log(result)
  return result.data;
};
