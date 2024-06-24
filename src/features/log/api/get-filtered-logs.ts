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
  period: period_choice | "";
  security_info: severity_choice | "";
  logStreamName: string;
  logGroupName: string;
  token: string;
  pageCount: number;
}

export const getFilteredLogs = async ({
    period,
    security_info,
    logGroupName,
    logStreamName,
    pageCount,
    token
  }: getFilteredLogsInput) => {
    const params = new URLSearchParams();
    console.log("getfilteredlogs input", period, security_info, logGroupName, logStreamName);
  
    if (period) {
      params.append("period", period);
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
    if (pageCount) {
      params.append("page", String(pageCount))
    }
  
    try {
      const response = await api.get(
        `/cloudwatch/filter-logs/?${params.toString()}`,
        {
          headers: {
            Authorization: "Token " + token,
          },
        },
      );
      console.log("getfilteredlogs response", response.data);
      return response;
    } catch (error) {
      console.error("Error fetching filtered logs:", error);
      throw error;
    }
  };
  