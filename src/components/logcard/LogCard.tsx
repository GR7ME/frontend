import { cn } from "@/lib/utils";
import { Severity } from "@/types/Log-type";
import { LogData } from "@/types/logs";
import React from "react";

const logcolor = {
  WARN: "bg-yellow-100  border-yellow-400 text-yellow-800",
  ERROR: "bg-red-100  border-red-400 text-red-800",
  INFO: "bg-green-100  border-green-400 text-green-800",
};
interface LogCardProps {
  severity: Severity;
  jsonData: LogData;
}

const LogCard: React.FC<LogCardProps> = ({ severity, jsonData }) => {
  return (
    <div
      className={cn(logcolor[severity], "rounded p-3 max-w-max border text-xs")}
    >
      {severity}
      <pre className="whitespace-pre-wrap my-2 truncate">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
};

export default LogCard;
