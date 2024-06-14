export type log = {
    log_id: string;
    message: string;
    timestamp: string;
    severity: "WARN" | "ERROR" | "INFO";
  };