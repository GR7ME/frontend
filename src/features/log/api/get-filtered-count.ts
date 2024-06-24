import { api } from "@/lib/api-client";

export enum severity_choice {
  WARN = "WARN",
  INFO = "INFO",
  ERROR = "ERROR",
}

export enum period_choice {
  LAST_DAY = "last_day",
  LAST_WEEK = "last_week",
  LAST_HOUR = "last_hour",
  LAST_MONTH = "last_month",
}

interface getFilteredLogsInput {
interval_type: period_choice | "";
  security_info: severity_choice | "";
  logStreamName: string;
  logGroupName: string;
  token: string;
}

export const getFilteredCount = async ({
    interval_type,
    security_info,
    logGroupName,
    logStreamName,
    token,
  }: getFilteredLogsInput) => {
    const params = new URLSearchParams();
  
    if (interval_type) {
      params.append("interval_type", interval_type);
    }
    if (security_info) {
      params.append("securityinfo", security_info);
    }
    if (logGroupName) {
      params.append("logGroupName", logGroupName);
    }
    if (logStreamName) {
      params.append("logStreamName", logStreamName);
    }
  
    try {
      const response = await api.get(
        `cloudwatch/logs/log_count_interval/?${params.toString()}`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        },
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered logs:", error);
      throw error;
    }
  };
  