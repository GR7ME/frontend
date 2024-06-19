export type log = {
    log_id: string;
    message: string;
    timestamp: string;
    severity: "WARN" | "ERROR" | "INFO";
  };

export interface LogData {
    id: number;
    logGroupName: string;
    logStreamName: string;
    owner: number;
    timestamp: string;
    message: string;
    ingestionTime: number;
  }

export interface jsonData {
    data: LogData;
  }