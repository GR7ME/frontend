import { cn } from "@/lib/utils";
import { Severity } from "@/types/Log-type";
import React from "react";
const logcolor = {
  warn: "bg-yellow-100  border-yellow-400 text-yellow-800",
  error: "bg-red-100  border-red-400 text-red-800",
  info: "bg-green-100  border-green-400 text-green-800",
};
interface WarningMessageProps {
  severity: Severity;
  jsonData: any; // Adjust the type according to your JSON data structure
}

const WarningMessage: React.FC<WarningMessageProps> = ({ severity, jsonData }) => {
  return (
    <div className={cn(logcolor[severity], "rounded p-3 max-w-max border text-xs")}>
      {severity.toUpperCase()}
      <pre className="whitespace-pre-wrap my-2 truncate">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
};

export default WarningMessage;
