"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type log = {
    log_id: string;
    message: string;
    timestamp: string;
    severity: "WARN" | "ERROR" | "INFO";
  };


export const columns: ColumnDef<log>[] = [
  {
    accessorKey: "log_id",
    header: "Log_id",
  },
  {
    accessorKey: "severity",
    header: "Severity",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "message",
    header: "Message",
  }
]
