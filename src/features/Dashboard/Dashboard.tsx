import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { weekData } from "@/utils/week_data";
import { Separator } from "@/components/ui/separator";
import LogCard from "@/components/LogContainer/LogContainer";
import { api } from "@/lib/api-client";
import {
  SeverityCountData,
  SeverityTextColor,
} from "@/types/SeverityColorType";

const text_color: SeverityTextColor = {
  warn: "text-yellow-800",
  info: "text-green-800",
  error: "text-red-800",
};

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [severityCountData, setSeverityCountData] = useState<SeverityCountData>(
    {
      warn: 0,
      info: 0,
      error: 0,
    },
  );
  const [totalLogs, setTotalLogs] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getRecentLogs = async () => {
      const result = await api.get("/cloudwatch/recent-logs", {
        headers: {
          Authorization: "Token " + token,
        },
      });
      setData(result.data);
    };
    const getSeverityLogs = async () => {
      const result = await api.get("cloudwatch/log-counts/", {
        headers: {
          Authorization: "Token " + token,
        },
      });
      setSeverityCountData(result.data);
    };
    getRecentLogs();
    getSeverityLogs();

    const getTotalLogs = async () => {
      const result = await api.get("/cloudwatch/total-logs-count/", {
        headers: {
          Authorization: "Token " + token,
        },
      });
      setTotalLogs(result.data.total_logs_count);
    };

    getTotalLogs();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="w-full flex flex-wrap justify-between gap-2">
        <Card className="flex-grow min-w-[150px] p-2">
          <CardContent className="flex flex-col p-4">
            <CardDescription className="flex flex-col items-center">
              <Label className="text-6xl md:text-8xl text-black dark:text-white">
                {totalLogs}
              </Label>
              <Label className="text-xs">Total Logs</Label>
            </CardDescription>
          </CardContent>
        </Card>
        {severityCountData &&
          Object.entries(severityCountData).map((item) => {
            return (
              <Card className="flex-grow min-w-[150px] p-2">
                <CardContent className="flex flex-col p-4">
                  <CardDescription className="flex flex-col items-center">
                    <Label
                      className={cn(
                        "text-6xl md:text-8xl",
                        text_color[
                          item[0].toLowerCase() as keyof SeverityTextColor
                        ], // Explicitly cast to keyof SeverityTextColor
                      )}
                    >
                      {item[1]}
                    </Label>
                    <Label className="text-xs">{item[0]}</Label>
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
      </div>
      <div className="flex flex-col gap-2 border rounded p-2">
        <Label className="text-xl">Analytics</Label>
        <Separator />
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="w-full xl:flex-1 h-64 my-4">
            <ResponsiveContainer>
              <LineChart
                data={weekData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={(data) => {
                    const new_data = new Date(data.timestamp);
                    return new_data.getDate();
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="entries_number"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="border rounded p-4 w-full xl:flex-1">
            <div>
              <Label className="text-xl">Recent Logs</Label>
              <Separator className="my-2" />
              <div className="flex flex-col gap-2">
                {data &&
                  data.map((item, index) => (
                    <LogCard key={index} data={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
